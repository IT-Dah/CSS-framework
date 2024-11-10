// File: src/js/logout.js

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");

  // Check if user is logged in (i.e., accessToken exists)
  const accessToken = localStorage.getItem("accessToken");
  const userData = localStorage.getItem("userData");

  if (!accessToken || !userData) {
    // If user is not logged in, hide the logout button
    if (logoutButton) {
      logoutButton.style.display = "none";
    }
  } else {
    // If user is logged in, show the logout button
    if (logoutButton) {
      logoutButton.style.display = "inline-block";

      // Add click event listener to handle logout
      logoutButton.addEventListener("click", () => {
        // Remove access token and user data from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");

        // Redirect to the login page
        window.location.href = "/index.html"; // Adjust the path if necessary
      });
    }
  }
});
