#!/usr/bin/env python
# coding: utf-8

# In[1]:


#!/usr/bin/env python
# coding: utf-8

# In[1]: Install required packages (if not done already)
# Uncomment & run this if needed
# !pip install fastapi uvicorn nbimporter python-dotenv


# In[2]:


import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.getcwd(), 'app')))


# In[3]:


# In[2]: Imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# In[4]:


# Import routers
from routes import users, trading, ai


# In[5]:


# In[3]: App Initialization
app = FastAPI(
    title="📈 Stock Trading Simulation API",
    description="Simulate trading, get AI insights, and level up as a trader!",
    version="1.0.0"
)

# In[4]: CORS Middleware (optional but useful if frontend is involved)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In[5]: Include Routers
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(trading.router, prefix="/trading", tags=["Trading"])
app.include_router(ai.router, prefix="/ai", tags=["AI & Insights"])

# In[6]: Root Route
@app.get("/")
def root():
    return {"message": "🚀 Stock Trading Simulation API is running!"}


# In[6]:


# In[7]: Run using uvicorn (Don't run this in notebook, only in .py file or terminal)
# Save as main.py and run via terminal: uvicorn app.main:app --reload


# In[7]:


# !jupyter nbconvert --to script ~/Desktop/stock_trading_sim/app/main.ipynb

try:
    get_ipython().system('jupyter nbconvert --to script main.ipynb')
except:
    pass

