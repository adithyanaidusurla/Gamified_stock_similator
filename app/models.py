#!/usr/bin/env python
# coding: utf-8

# In[1]:


import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.getcwd(), 'app')))


# In[2]:


# !pip install sqlalchemy psycopg2 python-dotenv


# In[3]:


# !pip install nbimporter


# In[4]:


import uuid
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Text, Boolean, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from database import Base


# In[5]:


# user model table
class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(100), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(Text, nullable=False)  # Hashed password
    level = Column(Integer, default=1)  # User level in trading
    created_at = Column(DateTime, server_default=func.now())

    # Relationships
    trades = relationship("TradeTransaction", back_populates="user")
    predictions = relationship("StockPrediction", back_populates="user")
    feedbacks = relationship("AI_Feedback", back_populates="user")
    balance = relationship("SCoinBalance", uselist=False, back_populates="user")


# In[6]:


# TradeTransaction Model
# This table stores buy/sell transactions.
class TradeTransaction(Base):
    __tablename__ = "trade_transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    stock_name = Column(String(100), nullable=False)
    trade_type = Column(String(10), nullable=False)  # "Buy" or "Sell"
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    total_value = Column(Float, nullable=False)  # price * quantity
    trade_time = Column(DateTime, server_default=func.now())

    # Relationship
    user = relationship("User", back_populates="trades")


# In[7]:


# SCoinBalance Model
# This table tracks S Coins balance for users.

class SCoinBalance(Base):
    __tablename__ = "s_coin_balance"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, unique=True)
    balance = Column(Float, default=10000.0)  # Default starting balance of 10,000 S Coins

    # Relationship
    user = relationship("User", back_populates="balance")


# In[8]:


# StockPrediction Model
# This stores stock predictions made by users.

class StockPrediction(Base):
    __tablename__ = "stock_predictions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    stock_name = Column(String(100), nullable=False)
    predicted_price = Column(Float, nullable=False)
    prediction_reason = Column(Text, nullable=False)  # User explanation
    strategy_used = Column(Text, nullable=False)  # Trading strategy applied
    created_at = Column(DateTime, server_default=func.now())

    # Relationship
    user = relationship("User", back_populates="predictions")


# In[9]:


# AI_Feedback Model
# Stores AI-generated feedback on predictions.

class AI_Feedback(Base):
    __tablename__ = "ai_feedback"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    prediction_id = Column(UUID(as_uuid=True), ForeignKey("stock_predictions.id"), nullable=False)
    feedback = Column(Text, nullable=False)
    accuracy_score = Column(Float, nullable=False)  # Score (0-100%)
    level_up = Column(Boolean, default=False)  # Should the user level up?

    # Relationship
    user = relationship("User", back_populates="feedbacks")


# In[10]:


# Create Tables in PostgreSQL
# Run this in models.ipynb to create tables:

from database import engine

Base.metadata.create_all(bind=engine)
print("✅ Database tables created successfully!")


# In[11]:


# !jupyter nbconvert --to script ~/Desktop/stock_trading_sim/app/models.ipynb

try:
    get_ipython().system('jupyter nbconvert --to script models.ipynb')
except:
    pass
    

