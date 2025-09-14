import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuth();

  const goToHome = () => {
    navigate("/");
  };

  const [isSignUp, setIsSignUp] = useState(true); // toggle mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sic: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, sic, password } = formData;

    if (!email || !password || (isSignUp && (!name || !sic))) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    try {
      if (isSignUp) {
        // Sign up user
        const res = await axios.post("http://localhost:3000/api/students", {
          username: name,
          email,
          sic,
          password,
        }
    );
        setIsAuthenticated(true);
        // goToHome();
        alert("Signup successful!");
      } else {
        // Sign in user
        const res = await axios.post("http://localhost:3000/api/login", {
          email,
          password,
        });        
        setIsAuthenticated(true);
        // goToHome();
        alert("Login successful!");
      }

      navigate("/"); // Go to home page
    } catch (err) {
      console.error(err);
      setError("Error during authentication.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>{isSignUp ? "Sign Up" : "Sign In"}</h2>

        {isSignUp && (
          <>
            <div style={styles.group}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.group}>
              <label htmlFor="sic">SIC:</label>
              <input
                type="text"
                id="sic"
                value={formData.sic}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </>
        )}

        <div style={styles.group}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.group}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            style={{ color: "#007BFF", cursor: "pointer" }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    width: "320px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  group: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginBottom: "10px",
  },
};

export default Login;
