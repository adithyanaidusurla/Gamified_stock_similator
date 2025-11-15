# app/routes/users.py
from fastapi import APIRouter, HTTPException
from passlib.hash import bcrypt
from app.database import users_col
from app.schemas import UserCreate, UserLogin
from app.utils import doc_to_dict
from bson.objectid import ObjectId

router = APIRouter(prefix="/api/users", tags=["users"])

@router.post("/signup")
def signup(user: UserCreate):
    # check existing email
    if users_col.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    user_dict = user.dict()
    # Hash password (bcrypt)
    user_dict["password"] = bcrypt.hash(user_dict["password"])
    # initial fields
    user_dict["currentLevel"] = 1
    user_dict["xp"] = 0
    res = users_col.insert_one(user_dict)
    return {"id": str(res.inserted_id), "message": "User created"}

@router.post("/login")
def login(payload: UserLogin):
    user = users_col.find_one({"email": payload.email})
    if not user or not bcrypt.verify(payload.password, user.get("password", "")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    user_out = doc_to_dict(user)
    # don't return password
    user_out.pop("password", None)
    return user_out

@router.get("/{user_id}")
def get_user(user_id: str):
    try:
        user = users_col.find_one({"_id": ObjectId(user_id)})
    except Exception:
        user = None
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user_out = doc_to_dict(user)
    user_out.pop("password", None)
    return user_out
