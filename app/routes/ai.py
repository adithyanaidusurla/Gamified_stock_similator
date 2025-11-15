# app/routes/ai.py
from fastapi import APIRouter
router = APIRouter(prefix="/api/ai", tags=["ai"])

@router.get("/mock-feedback")
def mock_feedback():
    return {"feedback": "Mock feedback: try grounding your reasoning in price/momentum/RSI."}
