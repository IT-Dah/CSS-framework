// File: src/js/main.js
import { registerUser, loginUser } from "./services/auth.js";

// Handle Registration Form
const registerForm = document.querySelector("#registerForm");
if (registerForm) {
  console.log("Register form found");
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("#registerName").value;
    const email = document.querySelector("#registerEmail").value;
    const password = document.querySelector("#registerPassword").value;

    if (name && email && password) {
      const userData = { name, email, password };
      console.log("Register form submitted", userData);
      const result = await registerUser(userData);

      // Redirect to login page if registration is successful
      if (result) {
        window.location.href = "/index.html";
      }
    } else {
      alert("Please fill out all fields.");
    }
  });
}

// Handle Login Form
const loginForm = document.querySelector("#loginForm");
if (loginForm) {
  console.log("Login form found");
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#loginEmail").value;
    const password = document.querySelector("#loginPassword").value;

    if (email && password) {
      const userData = { email, password };
      console.log("Login form submitted", userData);
      const result = await loginUser(userData);

      // Redirect to feed page if login is successful
      if (result) {
        window.location.href = "/feed/index.html";
      }
    } else {
      alert("Please fill out all fields.");
    }
  });
}
