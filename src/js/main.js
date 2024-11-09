// File: src/js/main.js
import { registerUser, loginUser } from "./services/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("#registerForm");
  const loginForm = document.querySelector("#loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = document.querySelector("#registerName").value;
      const email = document.querySelector("#registerEmail").value;
      const password = document.querySelector("#registerPassword").value;
      const result = await registerUser({ name, email, password });
      if (result) window.location.href = "/index.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.querySelector("#loginEmail").value;
      const password = document.querySelector("#loginPassword").value;
      const result = await loginUser({ email, password });
      // Updated redirect path
      if (result) window.location.href = "/feed/index.html";
    });
  }
});
