# Weatherly Backend

This is the backend for **Weatherly**, a personal weather dashboard built with FastAPI. It handles user authentication, city preferences, and integrates with the OpenWeatherMap API to fetch weather data.  

---

## 🛠 Features

- Google Sign-In authentication via OAuth 2.0
- User management (store and fetch user preferences)
- City weather caching for faster response and reduced API calls
- RESTful API endpoints for frontend consumption
- Light and Dark mode supported from frontend (via API data)
- CORS enabled for frontend integration

---

## 💻 Tech Stack / Packages Used

- **Python 3.10+** – Backend language  
- **FastAPI** – Web framework for building APIs  
- **SQLAlchemy** – ORM for database interactions  
- **SQLite / PostgreSQL** – Database for storing users and cache  
- **Requests** – HTTP client to fetch weather data  
- **Python-dotenv** – Manage environment variables  
- **Uvicorn** – ASGI server to run FastAPI  

---

## ⚡ Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/akshaygaur2407/fyxlife_assignment.git
cd fyxlife_assignment/backend
```

2. **Create and activate a virtual environment:**
```bash
python -m venv venv
source venv/bin/activate   # Linux / macOS
venv\Scripts\activate     
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create a .env file in the backend/ folder with the following variables:**
```bash
OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
DATABASE_URL=sqlite:///./fyxlife.db 
```

5. **Run database migrations / create tables:**
```bash
python -c "from database import Base, engine; Base.metadata.create_all(bind=engine)"

```

6. **Start the FastAPI server (development):**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

