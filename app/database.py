#!/usr/bin/env python
# coding: utf-8

# In[1]:


import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.getcwd(), 'app')))


# In[2]:


# DATABASE CONNECTION SETUP (Jupyter notebook version)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv


# In[3]:


# Load .env file
load_dotenv()


# In[4]:


# Read database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")


# In[5]:


# SQLAlchemy setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# In[6]:


print("✅ Database connection established successfully.")


# In[7]:


from sqlalchemy.orm import Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# In[17]:


# !jupyter nbconvert --to script ~/Desktop/stock_trading_sim/app/database.ipynb

try:
    get_ipython().system('jupyter nbconvert --to script database.ipynb')
except:
    pass

