#!/usr/bin/env python
# coding: utf-8

# In[2]:


# !pip install passlib\[bcrypt\] python-jose


# In[3]:


import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.getcwd(), '..')))


# In[4]:


from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta


# In[5]:


from database import get_db
from models import User
from schemas import UserCreate, UserLogin, UserResponse


# In[6]:


import uuid
import os
from dotenv import load_dotenv


# In[7]:


load_dotenv()


# In[8]:


# Step 2: Create Router
router = APIRouter()


# In[9]:


# Step 3: Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# In[10]:


# Step 4: JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key_here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# In[11]:


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# In[12]:


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# In[13]:


def get_password_hash(password):
    return pwd_context.hash(password)


# In[14]:


# Step 5: Register User
@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(
        id=uuid.uuid4(),
        username=user.username,
        email=user.email,
        password=hashed_password,
        level=1
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# In[15]:


# Step 6: Login User
@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": str(db_user.id)})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": db_user.id,
        "username": db_user.username,
        "level": db_user.level
    }


# In[16]:


# !jupyter nbconvert --to script ~/Desktop/stock_trading_sim/app/routes/users.ipynb

try:
    get_ipython().system('jupyter nbconvert --to script users.ipynb')
except:
    pass

