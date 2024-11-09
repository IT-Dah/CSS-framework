// src/js/services/auth.js
import { apiPost } from "./api.js";
import { API_AUTH_REGISTER, API_AUTH_LOGIN } from "./config.js";

export async function registerUser(email, password) {
  console.log("registerUser called");

  // Add a 'name' field as required by the API
  const data = {
    name: email.split("@")[0], // Using the email prefix as a default name
    email,
    password,
  };

  try {
    const response = await apiPost(API_AUTH_REGISTER, data);
    console.log("Register response:", response);
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}

export async function loginUser(email, password) {
  console.log("loginUser called");

  const data = {
    email,
    password,
  };

  try {
    const response = await apiPost(API_AUTH_LOGIN, data);
    console.log("Login response:", response);
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
