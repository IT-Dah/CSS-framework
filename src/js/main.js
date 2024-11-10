// File: src/js/main.js
import { registerUser, loginUser } from "./services/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("#registerForm");
  const loginForm = document.querySelector("#loginForm");

  // Handle Registration Form Submission
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get form input values
      const name = document.querySelector("#registerName").value;
      const email = document.querySelector("#registerEmail").value;
      const password = document.querySelector("#registerPassword").value;
      const confirmPassword = document.querySelector(
        "#registerConfirmPassword"
      ).value;
      const avatar = document.querySelector("#registerAvatar").value;

      // Call registerUser function with all required data
      const result = await registerUser({
        name,
        email,
        password,
        confirmPassword,
        avatar,
      });

      if (result) {
        alert("Registration successful. Please log in.");
        window.location.href = "/index.html";
      }
    });
  }

  // Handle Login Form Submission
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get login input values
      const email = document.querySelector("#loginEmail").value;
      const password = document.querySelector("#loginPassword").value;

      // Call loginUser function
      const result = await loginUser({ email, password });

      if (result) {
        // Redirect to the Feed Page
        window.location.href = "/src/feed/index.html";
      }
    });
  }
});
