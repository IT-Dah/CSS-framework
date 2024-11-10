// File: src/js/logout.js

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      // Remove access token and user data from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");

      // Redirect to the login page
      window.location.href = "/index.html"; // Adjust the path if necessary
    });
  }
});
