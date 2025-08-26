import React, { useEffect, useState, useRef } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import Popper from "@mui/material/Popper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { City } from "country-state-city";
import { keyframes } from "@emotion/react";
import Heading from "./heading";
import DisplatData from "./displayData";

const moveCloudsSlow = keyframes`
  from { background-position-x: 0; }
  to { background-position-x: -1000px; }
`;

const moveCloudsFast = keyframes`
  from { background-position-x: 0; }
  to { background-position-x: -3000px; }
`;

function Dashboard() {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const indianCities = City.getCitiesOfCountry("IN").map((c) => ({
    ...c,
    uniqueId: `${c.stateCode || "NA"}-${c.name}`,
  }));
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const fetchUserCities = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(
          `http://localhost:8000/users/${user.id}/preferences`
        );

        const mappedData = res.data.preferences.map((pref) => ({
          uniqueId: `${pref.state || "NA"}-${pref.city}`,
          city: pref.city,
          stateCode: pref.state || "NA",
          sys: { country: pref.country },
          data: pref.weather.data,
        }));

        setWeatherData(mappedData);
      } catch (err) {
        console.error("Failed to fetch user cities or weather:", err);
      }
    };

    fetchUserCities();
  }, []);

  const handleAddCity = async () => {
    if (
      selectedCity &&
      !weatherData.find((w) => w.uniqueId === selectedCity.uniqueId)
    ) {
      try {
        const weatherRes = await axios.get(
          `http://localhost:8000/weather/${selectedCity.name}/${selectedCity.stateCode}`
        );

        const newCity = {
          uniqueId: selectedCity.uniqueId,
          city: selectedCity.name,
          stateCode: selectedCity.stateCode,
          sys: { country: "IN" },
          data: weatherRes.data.data,
        };

        setWeatherData([...weatherData, newCity].slice(0, 5));
        setSelectedCity(null);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      }
    }
  };

  const handleRemoveCity = (uniqueId) => {
    setWeatherData(weatherData.filter((w) => w.uniqueId !== uniqueId));
  };

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSavePreferences = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.put(
        `http://localhost:8000/users/${user.id}/cities/`,
        weatherData.map((w) => ({
          city: w.city,
          state: w.stateCode,
          country: w.sys.country,
        }))
      );

      setToast({
        open: true,
        message: "Preferences saved successfully!",
        severity: "success",
      });
    } catch (err) {
      console.error(
        "Error saving preferences:",
        err.response?.data || err.message
      );
      setToast({
        open: true,
        message: "Failed to save preferences.",
        severity: "error",
      });
    }
  };

  const isMaxReached = weatherData.length >= 5;

  const availableCities = indianCities.filter(
    (c) => !weatherData.find((w) => w.uniqueId === c.uniqueId)
  );

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user
    navigate("/login"); // Redirect to login
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 5,
        px: 5,
        background: darkMode
          ? `url("https://www.transparenttextures.com/patterns/dark-clouds.png"), 
        linear-gradient(to right, #4b6cb7, #182848)`
          : "linear-gradient(to right, #a0c4ff, #caf0f8)",
      }}
    >
      <Tooltip title="Logout" arrow>
        <IconButton
          onClick={handleLogout}
          sx={{
            position: "absolute",
            top: 16,
            right: 30,
            zIndex: 2,
            bgcolor: "white",
            color: "error.main",
            "&:hover": {
              bgcolor: "error.main",
              color: "white",
            },
            boxShadow: 2,
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        arrow
      >
        <IconButton
          onClick={handleToggleMode}
          sx={{
            position: "absolute",
            top: 16,
            right: 80,
            zIndex: 2,
            bgcolor: "white",
            color: darkMode ? "yellow.dark" : "grey.800",
            "&:hover": {
              bgcolor: darkMode ? "yellow.dark" : "grey.800",
              color: "white",
            },
            boxShadow: 2,
          }}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: darkMode
            ? `url("https://www.transparenttextures.com/patterns/dark-clouds.png"), 
            linear-gradient(to right, #4b6cb7, #182848)`
            : 'url("https://www.transparenttextures.com/patterns/clouds.png")',
          backgroundRepeat: "repeat-x",
          backgroundSize: "cover",
          opacity: 0.5,
          zIndex: 0,
          animation: `${moveCloudsSlow} 120s linear infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: darkMode
            ? `url("https://www.transparenttextures.com/patterns/dark-clouds.png"), 
            linear-gradient(to right, #4b6cb7, #182848)`
            : 'url("https://www.transparenttextures.com/patterns/clouds.png")',
          backgroundRepeat: "repeat-x",
          backgroundSize: "cover",
          opacity: 0.3,
          zIndex: 0,
          animation: `${moveCloudsFast} 200s linear infinite`,
        }}
      />

      <Heading darkMode={darkMode}/>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "90%",
          maxWidth: 600,
          mb: 3,
          backgroundColor: "white",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          p: 0.5,
        }}
      >
        <Tooltip title={isMaxReached ? "You can only add 5 cities" : ""} arrow>
          <span style={{ width: "100%" }}>
            <Autocomplete
              disabled={isMaxReached}
              disablePortal={false}
              PopperComponent={(props) => (
                <Popper {...props} style={{ zIndex: 1300, width: inputRef.current ? inputRef.current.clientWidth : undefined }} />
              )}
              freeSolo
              options={availableCities}
              getOptionLabel={(option) =>
                `${option.name} (${option.stateCode})`
              }
              value={selectedCity}
              onChange={(event, newValue) => setSelectedCity(newValue)}
              isOptionEqualToValue={(option, value) =>
                option.uniqueId === value.uniqueId
              }
              filterOptions={(options, state) => {
                const inputValue = state.inputValue.toLowerCase();
                return options
                  .filter((option) =>
                    option.name.toLowerCase().includes(inputValue)
                  )
                  .slice(0, 50);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={inputRef} 
                  placeholder="Search for city..."
                  variant="outlined"
                  fullWidth
                  size="small"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && selectedCity) {
                      e.preventDefault();
                      handleAddCity(selectedCity);
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      borderRadius: 8,
                      paddingRight: "0px",
                      paddingLeft: "10px",
                      display: "flex",
                      alignItems: "center",
                    },
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ marginRight: "4px" }}
                      >
                        <IconButton
                          onClick={() => {
                            if (selectedCity) handleAddCity(selectedCity);
                          }}
                          size="small"
                        >
                          {selectedCity ? (
                            <AddCircleIcon color="primary" />
                          ) : (
                            <SearchIcon color="action" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </span>
        </Tooltip>
      </Box>

      <DisplatData
        weatherData={weatherData}
        handleRemoveCity={handleRemoveCity}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSavePreferences}
        sx={{
          mt: 6,
          px: 4,
          py: 1.5,
          fontSize: "1rem",
          borderRadius: 3,
          zIndex: 1,
          bottom: 15,
        }}
      >
        Save Preferences
      </Button>
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;
