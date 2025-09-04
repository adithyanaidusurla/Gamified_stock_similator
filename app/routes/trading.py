#!/usr/bin/env python
# coding: utf-8

# In[2]:


import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.getcwd(), '..')))


# In[3]:


# 📦 Import Required Modules
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime

from database import get_db
import models, schemas

router = APIRouter(prefix="/trading", tags=["Trading"])


# In[4]:


# 📈 Place a New Trade
@router.post("/trade", response_model=schemas.TradeResponse)
def execute_trade(trade: schemas.TradeCreate, db: Session = Depends(get_db)):
    # ✅ Check if User Exists
    user = db.query(models.User).filter(models.User.id == trade.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 🔢 Check S-Coin Balance
    balance = db.query(models.SCoinBalance).filter(models.SCoinBalance.user_id == trade.user_id).first()
    if not balance or balance.balance < trade.amount:
        raise HTTPException(status_code=400, detail="Insufficient S-Coin balance")

    # 💸 Deduct Balance
    balance.balance -= trade.amount
    db.add(balance)

    # 💾 Create Trade Transaction
    new_trade = models.TradeTransaction(
        user_id=trade.user_id,
        stock_symbol=trade.stock_symbol,
        trade_type=trade.trade_type,
        amount=trade.amount,
        price=trade.price,
        timestamp=datetime.utcnow()
    )
    db.add(new_trade)
    db.commit()
    db.refresh(new_trade)

    return new_trade


# In[5]:


# 📜 View Trade History
@router.get("/history/{user_id}", response_model=list[schemas.TradeResponse])
def get_trade_history(user_id: UUID, db: Session = Depends(get_db)):
    trades = db.query(models.TradeTransaction).filter(models.TradeTransaction.user_id == user_id).order_by(models.TradeTransaction.timestamp.desc()).all()
    return trades


# In[6]:


# 💼 View Portfolio Balance (S-Coins)
@router.get("/balance/{user_id}", response_model=schemas.SCoinBalanceResponse)
def get_balance(user_id: UUID, db: Session = Depends(get_db)):
    balance = db.query(models.SCoinBalance).filter(models.SCoinBalance.user_id == user_id).first()
    if not balance:
        raise HTTPException(status_code=404, detail="Balance not found")
    return balance


# In[7]:


# # !jupyter nbconvert --to script ~/Desktop/stock_trading_sim/app/routes/trading.ipynb

try:
    get_ipython().system('jupyter nbconvert --to script trading.ipynb')
except:
    pass

