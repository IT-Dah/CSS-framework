// src/js/services/auth.js
import { API_AUTH_LOGIN, API_AUTH_REGISTER } from "./config.js";
import { apiPost } from "./api.js";

// Register User
export async function registerUser(userData) {
  console.log("registerUser called");

  try {
    const response = await apiPost(API_AUTH_REGISTER, userData);
    console.log("Register response:", response);

    if (response.status === 201) {
      const data =
        typeof response.json === "function" ? await response.json() : response;
      console.log("Registration successful:", data);
      alert("Registration successful!");
      return data;
    } else {
      const errorData = await response.json();
      console.error("Registration error:", errorData);
      alert(
        `Registration failed: ${
          errorData.errors[0]?.message || "Unknown error"
        }`
      );
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred during registration.");
  }
}

// Login User
export async function loginUser(userData) {
  console.log("loginUser called");

  try {
    const response = await apiPost(API_AUTH_LOGIN, userData);
    console.log("Login response:", response);

    const data =
      typeof response.json === "function" ? await response.json() : response;
    console.log("Login response data:", data);

    const accessToken =
      data.accessToken || data.data?.accessToken || data.meta?.accessToken;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      console.log("Access token stored in localStorage:", accessToken);
      alert("Login successful!");

      // Redirect to the Feed Page
      window.location.href = "feed/index.html";
      return data;
    } else {
      console.error("No token found in response data:", data);
      alert("Login failed: No token found.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login.");
  }
}
