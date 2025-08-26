# Weatherly Frontend

This is the frontend for **Weatherly**, a personal weather dashboard built with React. It allows users to search for cities, view weather forecasts, and log in using Google OAuth.

---

## 🛠 Features

- Google Sign-In authentication
- Search for multiple cities
- View current weather and 5-day forecast
- Light and Dark mode support
- Responsive UI with animated background and floating icons
- Smooth transitions using Framer Motion

---

## 💻 Tech Stack / Packages Used

- **React** – Frontend library  
- **Material-UI (MUI)** – Component library and styling  
- **React Router DOM** – Client-side routing  
- **Axios** – HTTP requests  
- **Framer Motion** – Animations for transitions and floating icons  
- **React Autocomplete / MUI Autocomplete** – Search bar functionality  
- **Google Identity Services** – Google Sign-In OAuth  
- **React Hot Toast / Snackbar (MUI)** – Notifications  

---

## ⚡ Setup Instructions
1. **Clone the repository:**
```bash
git clone https://github.com/akshaygaur2407/fyxlife_assignment.git
cd fyxlife_assignment/frontend
```

2. **Install dependencies:**
```bash
npm install
```
3. Create .env file in frontend/ with the following variables:
```bash
REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

4. Start the development server:
```bash
npm start
```