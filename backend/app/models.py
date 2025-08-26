from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    google_id = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    cities = relationship("UserCity", back_populates="user")


class UserCity(Base):
    __tablename__ = "user_cities"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    city = Column(String, index=True)
    state = Column(String, nullable=True)
    country = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="cities")


class WeatherCache(Base):
    __tablename__ = "weather_cache"
    id = Column(Integer, primary_key=True, index=True)
    city = Column(String, unique=True, index=True)
    state = Column(String, nullable=False) 
    data = Column(JSON)  # stores raw API response
    last_updated = Column(DateTime, default=datetime.utcnow)
