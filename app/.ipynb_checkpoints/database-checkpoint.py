#!/usr/bin/env python
# coding: utf-8

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


# In[10]:


print("✅ Database connection established successfully.")

