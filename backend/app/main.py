import os
import uvicorn
from fastapi import FastAPI
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from routers import users, cities, weather, auth

# Create tables
Base.metadata.create_all(bind=engine)

# Initialize app
app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://fyxlife-assignment.onrender.com"
    # add your deployed frontend URL here later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(cities.router)
app.include_router(weather.router)
app.include_router(auth.router)

# Entry point for Render
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000)) 
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
