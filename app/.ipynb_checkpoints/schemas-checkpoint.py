#!/usr/bin/env python
# coding: utf-8

# In[1]:


from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from uuid import UUID
from datetime import datetime


# In[7]:


#  User Schemas

class UserCreate(BaseModel):
    username: str = Field(..., max_length=100)
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    level: int
    created_at: datetime

    class Config:
        from_attributes = True


# In[31]:


# S Coin Balance Schema

class SCoinBalanceResponse(BaseModel):
    user_id: UUID
    balance: float

    class Config:
        from_attributes = True


# In[11]:


# Trade Schemas

class TradeCreate(BaseModel):
    stock_name: str
    trade_type: str  # Buy or Sell
    price: float
    quantity: int

class TradeResponse(BaseModel):
    id: UUID
    user_id: UUID
    stock_name: str
    trade_type: str
    price: float
    quantity: int
    total_value: float
    trade_time: datetime

    class Config:
        orm_mode = True


# In[13]:


# Stock Prediction Schemas

class PredictionCreate(BaseModel):
    stock_name: str
    predicted_price: float
    prediction_reason: str
    strategy_used: str

class PredictionResponse(BaseModel):
    id: UUID
    user_id: UUID
    stock_name: str
    predicted_price: float
    prediction_reason: str
    strategy_used: str
    created_at: datetime

    class Config:
        from_attributes = True


# In[19]:


# AI Feedback Schemas

class AIFeedbackCreate(BaseModel):
    prediction_id: UUID
    feedback: str
    accuracy_score: float
    level_up: bool

class AIFeedbackResponse(BaseModel):
    id: UUID
    user_id: UUID
    prediction_id: UUID
    feedback: str
    accuracy_score: float
    level_up: bool

    class Config:
        orm_mode = True


# In[21]:


# (Optional) General Response Messages

class MessageResponse(BaseModel):
    message: str


# In[27]:


get_ipython().system('jupyter nbconvert --to script ~/Desktop/stock_trading_sim/app/schemas.ipynb')

