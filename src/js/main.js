// src/js/main.js
import { registerUser, loginUser } from "./services/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  const loginForm = document.querySelector("#loginForm");
  const registerForm = document.querySelector("#registerForm");

  if (loginForm) {
    console.log("Login form found");
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.querySelector("#loginEmail").value;
      const password = document.querySelector("#loginPassword").value;
      console.log("Login form submitted", { email, password });
      try {
        const response = await loginUser(email, password);
        alert("Login successful");
        console.log(response);
      } catch (error) {
        alert("Login failed");
        console.error(error);
      }
    });
  }

  if (registerForm) {
    console.log("Register form found");
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.querySelector("#registerEmail").value;
      const password = document.querySelector("#registerPassword").value;
      console.log("Register form submitted", { email, password });
      try {
        const response = await registerUser(email, password);
        alert("Registration successful");
        console.log(response);
      } catch (error) {
        alert("Registration failed");
        console.error(error);
      }
    });
  }
});
