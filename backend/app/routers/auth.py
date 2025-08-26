from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from auth import verify_google_token
from database import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/google")
def login_with_google(token: dict, db: Session = Depends(get_db)):
    user = verify_google_token(token["token"], db)
    return {"id": user.id, "name": user.name, "email": user.email}