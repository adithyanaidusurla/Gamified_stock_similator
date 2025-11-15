# app/models.py
from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    username: str
    email: str
    password: str  # In production, store hashed passwords
    currentLevel: int = 1
    xp: int = 0

class Trade(BaseModel):
    user_id: str
    symbol: str
    type: str  # buy / sell
    quantity: int
    reasoning: str

class TradeResponse(BaseModel):
    feedback: str
    level_up: bool
