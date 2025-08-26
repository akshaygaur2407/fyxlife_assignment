import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id:
            "96513746160-2621oi856tsu3kvd9ipqvn19d1pmumuk.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });

        if (googleButtonRef.current) {
          window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: "filled_blue",
            size: "large",
            shape: "pill",
          });
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const res = await axios.post("https://fyxlife-assignment.onrender.com/auth/google", {
        token: response.credential,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.bgCircle1}></div>
      <div style={styles.bgCircle2}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>Weatherly</h1>
        <p style={styles.subtitle}>
          Sign in to access your personalized weather dashboard
        </p>
        {/* Use ref instead of direct id */}
        <div ref={googleButtonRef} style={{ marginTop: "30px" }}></div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    background: `url("https://www.transparenttextures.com/patterns/dark-clouds.png"), linear-gradient(to right, #4b6cb7, #182848)`,
    overflow: "hidden",
    fontFamily: "'Roboto', sans-serif",
  },
  card: {
    position: "relative",
    padding: "50px 40px",
    borderRadius: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "360px",
    zIndex: 2,
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "12px",
    color: "#222",
  },
  subtitle: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "25px",
    lineHeight: 1.4,
  },
  bgCircle1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    top: "-100px",
    left: "-100px",
    zIndex: 1,
    animation: "float 10s ease-in-out infinite alternate",
  },
  bgCircle2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    bottom: "-50px",
    right: "-50px",
    zIndex: 1,
    animation: "float 12s ease-in-out infinite alternate-reverse",
  },
};

export default Login;
