# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

from app.routes import users, trading, ai

app = FastAPI(title="Stock Trading Simulator API")

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN, "http://localhost:3000", "http://127.0.0.1:5173", "*"],  # relax for dev; tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(trading.router)
app.include_router(ai.router)

@app.get("/")
def root():
    return {"message": "Stock Trading Simulator backend running"}
