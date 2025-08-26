import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography } from "@mui/material";
import Dashboard from "./dashboard";
import { Cloud, WbSunny, Opacity } from "@mui/icons-material";

export default function WeatherApp() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f0f4f8", position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          top: "-100px",
          left: "-100px",
          zIndex: 0,
          animation: "float 12s ease-in-out infinite alternate",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          bottom: "-50px",
          right: "-50px",
          zIndex: 0,
          animation: "float 15s ease-in-out infinite alternate-reverse",
        }}
      />

      <AnimatePresence>
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1 }}
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: `url("https://www.transparenttextures.com/patterns/dark-clouds.png"), 
              linear-gradient(to right, #4b6cb7, #182848)`,
              color: "white",
              textAlign: "center",
              position: "relative",
              zIndex: 1, // make sure splash content is above circles
            }}
          >
            {/* Main Logo */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <Typography
                variant="h1"
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: "3rem", md: "5rem" } }}
              >
                ☁️ Weatherly
              </Typography>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "1.25rem", md: "2rem" }, fontWeight: 600 }}
              >
                Your personal weather companion
              </Typography>
            </motion.div>

            {/* Floating Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              style={{ display: "flex", gap: "20px", marginTop: "40px" }}
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <WbSunny sx={{ fontSize: 50, color: "yellow" }} />
              </motion.div>
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                <Cloud sx={{ fontSize: 50, color: "white" }} />
              </motion.div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                <Opacity sx={{ fontSize: 50, color: "#80dfff" }} />
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ minHeight: "100vh" }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            100% { transform: translateY(20px); }
          }
        `}
      </style>
    </Box>
  );
}
