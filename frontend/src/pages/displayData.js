import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function DisplatData({ weatherData, handleRemoveCity }) {
  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      sx={{ mt: 4, zIndex: 1 }}
    >
      {weatherData.map((w) => (
        <Grid item key={w.uniqueId}>
          <Card
            sx={{
              width: 300,
              minHeight: 280,
              borderRadius: 3,
              boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
              background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
              position: "relative",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            {/* Close Button */}
            <IconButton
              size="small"
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => handleRemoveCity(w.uniqueId)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            <CardContent sx={{ px: 3, py: 2 }}>
              {/* City & State */}
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {w.city}, {w?.stateCode}
              </Typography>

              {/* Temperature + Weather Icon */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ lineHeight: 1.3, mr: 2 }}
                >
                  {w.data?.main?.temp ?? "N/A"}°C
                </Typography>

                {w.data?.weather?.[0]?.icon && (
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={`https://openweathermap.org/img/wn/${w.data.weather[0].icon}@2x.png`}
                      alt={w.data.weather[0].description}
                      style={{ width: 50, height: 50 }}
                    />
                  </Box>
                )}
              </Box>

              {/* Weather Details */}
              <Typography variant="body1" sx={{ mb: 1 }}>
                Feels like: {w.data?.main?.feels_like ?? "N/A"}°C
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                💧 Humidity: {w.data?.main?.humidity ?? "N/A"}%
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                💨 Wind: {w.data?.wind?.speed ?? "N/A"} m/s
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                🔹 Pressure: {w.data?.main?.pressure ?? "N/A"} hPa
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                🌫 Visibility: {w.data?.visibility ?? "N/A"} m
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                ☁ Clouds: {w.data?.clouds?.all ?? "N/A"}%
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                🌅 Sunrise:{" "}
                {w.data?.sys?.sunrise
                  ? new Date(w.data.sys.sunrise * 1000).toLocaleTimeString()
                  : "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                🌇 Sunset:{" "}
                {w.data?.sys?.sunset
                  ? new Date(w.data.sys.sunset * 1000).toLocaleTimeString()
                  : "N/A"}
              </Typography>
              <Typography variant="body2">
                ☁ {w.data.weather[0].main} ({w.data.weather[0].description})
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default DisplatData;
