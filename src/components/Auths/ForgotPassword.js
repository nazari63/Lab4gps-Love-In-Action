import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import visibility icons
import "../styles/ForgotPassword.css";
import { useAuth } from "../Context/AuthContext";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Steps: 1 = Email Input, 2 = OTP Verification, 3 = Password Reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false); // Toggle visibility for new password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle visibility for confirm password
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { initiateForgotPassword, verifyForgotPasswordOtp, resetUserPassword } =
    useAuth();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await initiateForgotPassword(email);
      setStep(2); // Move to OTP Verification step
    } catch (error) {
      setError(error?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await verifyForgotPasswordOtp(email, otp);
      setStep(3); // Move to Password Reset step
    } catch (error) {
      setError(error?.message || "Invalid or expired OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await resetUserPassword(email, newPassword);
      setSuccessMessage("Password reset successful! You can now log in.");
      setStep(4); // Success screen
    } catch (error) {
      setError(error?.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password">
      <h1>Forgot Password</h1>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit} className="forgot-password-form">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleOtpSubmit} className="forgot-password-form">
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handlePasswordReset} className="forgot-password-form">
          <label>New Password:</label>
          <div className="password-container">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password-icon"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <label>Confirm Password:</label>
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password-icon"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}

      {step === 4 && (
        <div className="success-message">
          <h2>{successMessage}</h2>
          <a href="/login" className="go-login">
            Go to Login
          </a>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
