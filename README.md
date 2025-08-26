# 🌦️ Fyxlife Weather Dashboard Assignment

A full-stack weather dashboard application built as part of the Fyxlife assignment.  
The project is divided into two parts:

- **Frontend** → React app for user interface. ([Readme here](./frontend/README.md))
- **Backend** → FastAPI service with database and weather API integration. ([Readme here](./backend/README.md))

---

## 🚀 Features
- Google Login integration
- View current weather and 5-day forecasts
- Add / remove up to **5 preferred cities**
- Responsive design for desktop & mobile
- Caching to minimize API calls

---

## 📂 Project Structure
fyxlife_assignment/
│
├── frontend/ # React-based frontend
│ └── README.md
│
├── backend/ # FastAPI backend
│ └── README.md
│
└── README.md # Global project overview (this file)


---

## 📝 Assumptions & Notes
1. **Data limited to India** → Only Indian cities are supported for now.  
2. **Authentication** → Implemented via Google OAuth login.  
   - No JWT/session mechanism implemented.  
   - APIs are currently not protected from unauthorized access.  
3. **Preferences** → A user can save **up to 5 preferred cities**.  
4. **Weather API** → OpenWeatherMap is used for fetching live data.  
5. **Database** → Used for storing user preferences and cached weather data.  
6. **Deployment** →  
   - Frontend hosted separately (e.g., Vercel/Netlify).  
   - Backend deployed (e.g., Render).  
7. **Scope** → The app demonstrates functionality & integration.  
   - It is **not production-grade** (missing security hardening, rate limiting, JWTs, etc.).  

---

## ⚡ Setup
Each part (frontend & backend) has its own setup instructions:  
- [Frontend setup](./frontend/README.md)  
- [Backend setup](./backend/README.md)  

---

## 📌 Future Improvements
- Add JWT-based auth & secure APIs  
- Expand support beyond Indian cities  
- Improve error handling & offline caching  
- Allow more customization for users  

---

## 🕒 Time Spent
Approx. **X hours** (replace with your actual time).

---