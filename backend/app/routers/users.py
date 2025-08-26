from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models

from app.services.weather_service import get_weather

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/{user_id}/preferences")
def get_user_preferences(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    preferences = []
    print(user)
    for city in user.cities:
        weather = get_weather(city.city, city.state, db)
        preferences.append({
            "city": city.city,
            "country": city.country,
            "state": city.state or None,
            "weather": weather
        })

    return {"user": user.name, "preferences": preferences}
