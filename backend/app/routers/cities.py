from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas
from database import get_db

router = APIRouter(prefix="/users/{user_id}/cities", tags=["cities"])

@router.put("/", response_model=List[schemas.UserCityOut])
def sync_cities(
    user_id: int,
    cities: List[schemas.CityCreate], 
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    existing_cities = db.query(models.UserCity).filter(models.UserCity.user_id == user_id).all()

    requested_set = {(c.city, c.state, c.country) for c in cities}
    existing_set = {(c.city, c.state, c.country) for c in existing_cities}

    to_add = requested_set - existing_set
    to_delete = existing_set - requested_set

    for ec in existing_cities:
        if (ec.city, ec.state, ec.country) in to_delete:
            db.delete(ec)

    for city_name, state_name, country_name in to_add:
        db.add(models.UserCity(
            user_id=user_id, 
            city=city_name, 
            state=state_name, 
            country=country_name
        ))

    db.commit()

    updated_cities = db.query(models.UserCity).filter(models.UserCity.user_id == user_id).all()
    return updated_cities
