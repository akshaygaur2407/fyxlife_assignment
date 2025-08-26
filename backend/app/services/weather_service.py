import requests, os, datetime
from sqlalchemy.orm import Session
import models
import requests
from typing import Optional

API_KEY = os.getenv("OPENWEATHER_API_KEY", "64ce41589d498c36aec9ccbf789d0da7")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

def get_weather(city: str, state: Optional[str], db: Session):
    state = state or ""  # normalize None to empty string

    # 1. Check cache
    cached = db.query(models.WeatherCache).filter(
        models.WeatherCache.city == city,
        models.WeatherCache.state == state
    ).first()

    if cached and (datetime.datetime.utcnow() - cached.last_updated).seconds < 600:
        return {"city": cached.city, "state": cached.state, "data": cached.data, "cached": True}

    # 2. Call API
    params = {"q": f"{city},{state},IN", "appid": API_KEY, "units": "metric"}
    resp = requests.get(BASE_URL, params=params)
    if resp.status_code != 200:
        return {"error": f"Failed to fetch weather: {resp.json()}"}

    data = resp.json()

    # 3. Save/update cache
    if cached:
        cached.data = data
        cached.last_updated = datetime.datetime.utcnow()
    else:
        cached = models.WeatherCache(
            city=city,
            state=state,
            data=data,
            last_updated=datetime.datetime.utcnow()
        )
        db.add(cached)

    db.commit()
    return {"city": city, "state": state, "data": data, "cached": False}
