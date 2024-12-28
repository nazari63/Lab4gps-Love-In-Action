import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // Import AuthContext
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import visibility icons
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state to prevent multiple clicks
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password); // Call the login function from AuthContext
      navigate("/member-portal/dashboard"); // Redirect to the dashboard
    } catch (err) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-container">
          <h1>Login</h1>
          <form onSubmit={handleLogin} className="login-form">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password:</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p>
            Forgot your password? <a href="/forgot-password">Reset it here</a>
          </p>
        </div>

        <div className="login-poster">
          <h2>New here?</h2>
          <p>
            If you haven't created an account yet, you can easily sign up and
            start exploring our features.
          </p>
          <a href="/signup" className="signup-link">
            Sign Up Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
