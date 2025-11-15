# app/schemas.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    username: str
    email: EmailStr
    currentLevel: int
    xp: int

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TradeCreate(BaseModel):
    user_id: str
    symbol: str
    type: str  # "buy" or "sell"
    quantity: int
    reasoning: str

class TradeOut(BaseModel):
    id: str
    user_id: str
    symbol: str
    type: str
    quantity: int
    reasoning: str
    feedback: str
    timestamp: datetime

class FeedbackResponse(BaseModel):
    feedback: str
    level_up: bool
