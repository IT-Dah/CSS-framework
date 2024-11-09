// src/js/register.js

import { registerUser } from "./services/auth.js";

document
  .querySelector("#registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#registerEmail").value;
    const password = document.querySelector("#registerPassword").value;
    try {
      await registerUser(email, password);
      alert("Registration successful");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  });
