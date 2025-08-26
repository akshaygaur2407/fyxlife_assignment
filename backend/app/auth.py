from fastapi import Depends, HTTPException
from google.oauth2 import id_token
from google.auth.transport import requests
from sqlalchemy.orm import Session
import models
import os


def verify_google_token(token: str, db: Session):
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), os.getenv("GOOGLE_CLIENT_ID"))

        user = db.query(models.User).filter(models.User.email == idinfo["email"]).first()
        if not user:
            user = models.User(name=idinfo["name"], email=idinfo["email"])
            db.add(user)
            db.commit()
            db.refresh(user)

        return user

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Google token")
