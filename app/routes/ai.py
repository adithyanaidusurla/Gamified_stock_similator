#!/usr/bin/env python
# coding: utf-8

# In[1]:


import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.getcwd(), '..')))


# In[2]:


# 📦 Import Required Modules
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime


# In[3]:


from database import get_db
import models, schemas


# In[4]:


router = APIRouter(prefix="/ai", tags=["AI & Predictions"])


# In[5]:


# 📌 Submit a Stock Prediction
@router.post("/predict", response_model=schemas.PredictionResponse)
def submit_prediction(prediction: schemas.PredictionCreate, user_id: UUID, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_prediction = models.StockPrediction(
        user_id=user_id,
        stock_name=prediction.stock_name,
        predicted_price=prediction.predicted_price,
        prediction_reason=prediction.prediction_reason,
        strategy_used=prediction.strategy_used
    )
    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)

    return new_prediction


# In[6]:


# 📌 Submit AI Feedback for a Prediction
@router.post("/feedback", response_model=schemas.AIFeedbackResponse)
def submit_ai_feedback(feedback: schemas.AIFeedbackCreate, user_id: UUID, db: Session = Depends(get_db)):
    prediction = db.query(models.StockPrediction).filter(models.StockPrediction.id == feedback.prediction_id).first()
    if not prediction:
        raise HTTPException(status_code=404, detail="Prediction not found")

    new_feedback = models.AI_Feedback(
        user_id=user_id,
        prediction_id=feedback.prediction_id,
        feedback=feedback.feedback,
        accuracy_score=feedback.accuracy_score,
        level_up=feedback.level_up
    )
    db.add(new_feedback)

    # 🔼 Optionally level up the user
    if feedback.level_up:
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if user:
            user.level += 1
            db.add(user)

    db.commit()
    db.refresh(new_feedback)

    return new_feedback


# In[7]:


# 📌 Get All Predictions by User
@router.get("/predictions/{user_id}", response_model=list[schemas.PredictionResponse])
def get_all_predictions(user_id: UUID, db: Session = Depends(get_db)):
    predictions = db.query(models.StockPrediction).filter(models.StockPrediction.user_id == user_id).order_by(models.StockPrediction.created_at.desc()).all()
    return predictions


# In[8]:


# 📌 Get AI Feedback by User
@router.get("/feedback/user/{user_id}", response_model=list[schemas.AIFeedbackResponse])
def get_feedback_by_user(user_id: UUID, db: Session = Depends(get_db)):
    feedbacks = db.query(models.AI_Feedback).filter(models.AI_Feedback.user_id == user_id).all()
    return feedbacks


# In[9]:


# 📌 Get AI Feedback by Prediction
@router.get("/feedback/prediction/{prediction_id}", response_model=list[schemas.AIFeedbackResponse])
def get_feedback_by_prediction(prediction_id: UUID, db: Session = Depends(get_db)):
    feedbacks = db.query(models.AI_Feedback).filter(models.AI_Feedback.prediction_id == prediction_id).all()
    return feedbacks


# In[27]:


# !jupyter nbconvert --to script ~/Desktop/stock_trading_sim/app/routes/ai.ipynb

try:
    get_ipython().system('jupyter nbconvert --to script ai.ipynb')
except:
    pass

