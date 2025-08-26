# app/schemas.py
from pydantic import BaseModel
from typing import Optional

# For creating a city (request body)
class CityCreate(BaseModel):
    city: str
    country: str
    state: Optional[str] = None  


# For returning a city (response model)
class UserCityOut(BaseModel):
    id: int
    city: str
    country: Optional[str]

    class Config:
        orm_mode = True 
