# app/database.py
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "stock_trading_sim")

if not MONGO_URI:
    raise RuntimeError("MONGO_URI not set in environment")

_client = MongoClient(MONGO_URI)
db = _client[DB_NAME]

users_col = db["users"]
trades_col = db["trades"]
portfolio_col = db["portfolio"]
