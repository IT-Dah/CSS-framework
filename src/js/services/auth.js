// File: src/js/services/auth.js
import { API_AUTH_LOGIN, API_AUTH_REGISTER } from "./config.js";
import { apiPost } from "./api.js";

// Register User
export async function registerUser(userData) {
  try {
    const response = await apiPost(API_AUTH_REGISTER, userData);
    if (response.status === 201) {
      const data = await response.json();
      alert("Registration successful!");
      window.location.href = "../index.html";
      return data;
    } else {
      const errorData = await response.json();
      alert(
        `Registration failed: ${
          errorData.errors[0]?.message || "Unknown error"
        }`
      );
    }
  } catch (error) {
    alert("An error occurred during registration.");
  }
}

// Login User
export async function loginUser(userData) {
  try {
    const response = await apiPost(API_AUTH_LOGIN, userData);
    const data = await response.json();
    const accessToken = data.accessToken || data.data?.accessToken;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      alert("Login successful!");
      window.location.href = "../feed/index.html";
      return data;
    } else {
      alert("Login failed: No token found.");
    }
  } catch (error) {
    alert("An error occurred during login.");
  }
}
