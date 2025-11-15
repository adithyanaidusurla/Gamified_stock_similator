# app/routes/trading.py
from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
import os
import requests

from app.database import trades_col, users_col, portfolio_col
from app.schemas import TradeCreate, FeedbackResponse
from app.utils import doc_to_dict
from bson.objectid import ObjectId

router = APIRouter(prefix="/api/trades", tags=["trades"])

FINNHUB_KEY = os.getenv("FINNHUB_API_KEY")

# Basic rule-based evaluation depending on user's currentLevel
LEVEL_KEYWORDS = {
    1: ["trend", "moving average", "ma", "uptrend", "downtrend"],
    2: ["rsi", "momentum", "overbought", "oversold"],
    3: ["news", "sentiment", "earnings", "announc", "guidance"],
}

def evaluate_reasoning(reasoning: str, level: int):
    text = reasoning.lower()
    kws = LEVEL_KEYWORDS.get(level, [])
    for kw in kws:
        if kw in text:
            return True, f"Good reasoning — contains keyword '{kw}' for level {level}."
    return False, "Reasoning doesn't match the level's focus. Try referencing the strategy."

@router.post("/", response_model=FeedbackResponse)
def submit_trade(trade: TradeCreate):
    # validate user exists
    try:
        user = users_col.find_one({"_id": ObjectId(trade.user_id)})
    except Exception:
        user = None
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    current_level = user.get("currentLevel", 1)

    correct, feedback = evaluate_reasoning(trade.reasoning, current_level)

    # apply level-up if correct
    level_up = False
    if correct:
        new_level = current_level + 1
        users_col.update_one({"_id": user["_id"]}, {"$set": {"currentLevel": new_level}})
        level_up = True

    # Save trade record
    record = trade.dict()
    record["feedback"] = feedback
    record["timestamp"] = datetime.utcnow()
    trades_col.insert_one(record)

    # Optionally update portfolio (simple logic: accumulate positions)
    # For MVP we store a simple portfolio entry per trade (improvement later)
    portfolio_col.insert_one({
        "user_id": trade.user_id,
        "symbol": trade.symbol.upper(),
        "type": trade.type,
        "quantity": trade.quantity,
        "price_at": None,  # can be filled after fetching price
        "timestamp": datetime.utcnow()
    })

    return {"feedback": feedback, "level_up": level_up}

@router.get("/history/{user_id}")
def get_trade_history(user_id: str, limit: int = Query(100)):
    items = list(trades_col.find({"user_id": user_id}).sort("timestamp", -1).limit(limit))
    out = []
    for it in items:
        d = doc_to_dict(it)
        # format timestamp if datetime
        if isinstance(d.get("timestamp"), datetime):
            d["timestamp"] = d["timestamp"].isoformat()
        out.append(d)
    return out

@router.get("/stock/{symbol}")
def get_stock(symbol: str):
    """
    Proxy to Finnhub quote API.
    Returns the JSON from Finnhub: {c, h, l, o, pc, t}
    """
    if not FINNHUB_KEY:
        raise HTTPException(status_code=500, detail="FINNHUB_API_KEY not configured")
    url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_KEY}"
    resp = requests.get(url, timeout=8)
    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail="Failed to fetch data from Finnhub")
    return resp.json()

@router.get("/portfolio/{user_id}")
def get_portfolio(user_id: str):
    # Simple aggregation: sum buy/sell quantities per symbol
    pipeline = [
        {"$match": {"user_id": user_id}},
        {"$group": {
            "_id": "$symbol",
            "buys": {"$sum": {"$cond": [{"$eq": ["$type", "buy"]}, "$quantity", 0]}},
            "sells": {"$sum": {"$cond": [{"$eq": ["$type", "sell"]}, "$quantity", 0]}},
        }},
        {"$project": {
            "symbol": "$_id",
            "quantity": {"$subtract": ["$buys", "$sells"]},
            "_id": 0
        }}
    ]
    agg = list(trades_col.aggregate(pipeline))
    # attach current price from Finnhub (optional, best-effort)
    portfolio = []
    for p in agg:
        symbol = p.get("symbol")
        qty = p.get("quantity", 0)
        price = None
        price_info = None
        # get live price try/except to avoid total failure
        try:
            if FINNHUB_KEY:
                r = requests.get(f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_KEY}", timeout=6)
                if r.status_code == 200:
                    price_info = r.json()
                    price = price_info.get("c")  # current price
        except Exception:
            price = None
        portfolio.append({"symbol": symbol, "quantity": qty, "current_price": price})
    return {"portfolio": portfolio}

@router.post("/reset-dev")
def reset_dev_data(secret: str = None):
    """
    Dev-only: wipe trades, portfolio and reset users' levels.
    Provide caution in production.
    """
    # OPTIONAL: require a simple secret in env to avoid accidental runs
    from os import getenv
    dev_secret = getenv("DEV_RESET_SECRET")
    if dev_secret and dev_secret != secret:
        raise HTTPException(status_code=403, detail="Invalid reset secret")
    trades_col.delete_many({})
    portfolio_col.delete_many({})
    # reset users currentLevel to 1
    users_col.update_many({}, {"$set": {"currentLevel": 1, "xp": 0}})
    return {"message": "Dev data reset"}
