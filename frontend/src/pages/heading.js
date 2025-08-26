import { motion } from "framer-motion";
import {
    Typography
  } from "@mui/material";
  import { Cloud, WbSunny, Opacity } from "@mui/icons-material";

  
  function Heading({ darkMode }) {
    const textColor = darkMode ? "#ffffff" : undefined;
    return (
      <>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Typography
            variant="h1"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, color: textColor }}
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
            sx={{
              fontSize: { xs: "1rem", md: "1.5rem" },
              fontWeight: 600,
              color: textColor,
            }}
          >
            Your personal weather companion
          </Typography>
        </motion.div>
  
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <WbSunny sx={{ fontSize: 40, color: "yellow" }} />
          </motion.div>
  
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Cloud sx={{ fontSize: 40, color: "white" }} />
          </motion.div>
  
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            <Opacity sx={{ fontSize: 40, color: "#80dfff" }} />
          </motion.div>
        </motion.div>
      </>
    );
  }
  
  export default Heading;  