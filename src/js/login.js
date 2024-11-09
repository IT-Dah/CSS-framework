// src/js/login.js

import { loginUser } from "./services/auth.js";

document.querySelector("#loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#loginEmail").value;
  const password = document.querySelector("#loginPassword").value;
  try {
    await loginUser(email, password);
    alert("Login successful");
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});
