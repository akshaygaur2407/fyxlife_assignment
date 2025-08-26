from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from services.weather_service import get_weather

router = APIRouter(prefix="/weather", tags=["weather"])

@router.get("/{city}/{state}")
def fetch_weather(city: str, state: str, db: Session = Depends(get_db)):
    return get_weather(city, state, db)
