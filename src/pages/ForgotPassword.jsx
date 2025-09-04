import "./ForgotPassword.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../features/userSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !newPassword) {
      setError("⚠️ All fields are required");
      return;
    }

    try {
      await dispatch(resetPassword({ email, newPassword }));
      setMessage("✅ Password updated successfully! You can log in now.");
      
      // Clear inputs
      setEmail("");
      setNewPassword("");

      // Redirect after 2s
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "❌ Something went wrong");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>🔑 Reset Password</h2>
        <p>Enter your registered email and choose a new password.</p>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="reset-btn">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
