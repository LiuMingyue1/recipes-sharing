import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { userId } = response.data;
  
      // 存储 userId
      localStorage.setItem('userId', userId);
      alert('Login successful!');
      navigate(`/profile/${userId}`); // 跳转到用户的 Profile 页面
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };
  

  return (
    <div style={{ width: "100%", maxWidth: "400px", marginTop: "-50px" }}>
      <h2
        style={{
          marginTop: "10px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333300",
        }}
      >
        Login
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "medium",
              color: "#333300",
            }}
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              color: "#333300",
              border: "1px solid #ccc",
              borderRadius: "5px",
              outline: "none",
              marginTop: "5px",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "medium",
              color: "#333300",
            }}
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              color: "#333300",
              border: "1px solid #ccc",
              borderRadius: "5px",
              outline: "none",
              marginTop: "5px",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#FFF",
            backgroundColor: "#333300",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            textAlign: "center",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2b2b2b")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#333300")}
        >
          Login
        </button>
      </form>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {error}
        </p>
      )}

      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "14px",
          color: "#333300",
        }}
      >
        Not a member?{" "}
        <a
          href="/register"
          style={{
            fontWeight: "bold",
            color: "#333300",
            textDecoration: "underline",
          }}
        >
          Sign up for free
        </a>
      </p>
    </div>
  );
};

export default LoginForm;

