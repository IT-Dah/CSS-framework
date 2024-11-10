// File: src/js/services/auth.js
import { API_AUTH_LOGIN, API_AUTH_REGISTER } from "./config.js";
import { apiPost } from "./api.js";

export async function registerUser(userData) {
  try {
    // Construct the registration data object according to the API documentation
    const registrationData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      bio: userData.bio || "", // Optional field
      avatar: {
        url: userData.avatar || "https://i.ibb.co/89h1WDB/banan.webp",
        alt: "User avatar",
      },
      banner: {
        url: userData.banner || "",
        alt: "User banner",
      },
      venueManager: false, // Setting it to false by default
    };

    console.log("Registration Payload:", registrationData);

    // Validate email format (must end with "@stud.noroff.no")
    const emailPattern = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
    if (!emailPattern.test(userData.email)) {
      alert(
        "Invalid email format. Please use an email ending with '@stud.noroff.no'."
      );
      return;
    }

    // Check if passwords match
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Send the API request
    const response = await apiPost(API_AUTH_REGISTER, registrationData);

    if (response.ok) {
      const data = await response.json();
      alert("Registration successful!");
      window.location.href = "../index.html";
      return data;
    } else {
      // Log the error response
      const errorData = await response.json();
      console.error("Error Response JSON:", errorData);
      alert(
        `Registration failed: ${
          errorData.errors[0]?.message || "Unknown error"
        }`
      );
    }
  } catch (error) {
    alert("An error occurred during registration.");
    console.error("API POST Error:", error);
  }
}

// Updated Login User Function
export async function loginUser(userData) {
  try {
    const data = await apiPost(API_AUTH_LOGIN, userData);

    // Log the response data for debugging
    console.log("API Response Data:", data);

    // Extract the accessToken from the nested user data
    const accessToken = data?.data?.accessToken;

    if (accessToken) {
      // Store the accessToken and user data in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userData", JSON.stringify(data.data));
      alert("Login successful!");
      window.location.href = "/src/feed/index.html";
      return data;
    } else {
      alert("Login failed: No token found.");
    }
  } catch (error) {
    alert("An error occurred during login.");
    console.error("Login Error:", error);
  }
}
