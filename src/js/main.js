import { registerUser, loginUser } from "./services/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("#registerForm");
  const loginForm = document.querySelector("#loginForm");
  const logoutButton = document.querySelector("#logoutButton");

  // Handle Registration Form Submission
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.querySelector("#registerName").value;
      const email = document.querySelector("#registerEmail").value;
      const password = document.querySelector("#registerPassword").value;
      const confirmPassword = document.querySelector(
        "#registerConfirmPassword"
      ).value;
      const avatar = document.querySelector("#registerAvatar").value;

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

      const email = document.querySelector("#loginEmail").value;
      const password = document.querySelector("#loginPassword").value;

      const result = await loginUser({ email, password });

      if (result) {
        window.location.href = "/src/feed/index.html"; // Redirect to feed
      }
    });
  }

  // Handle Logout Button (on feed page)
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      alert("You have logged out.");
      window.location.href = "/index.html"; // Redirect back to login page
    });
  }

  // Feed Page Logic
  if (window.location.pathname.includes("feed/index.html")) {
    loadPosts();
  }
});

// Example function to load posts (simplified version)
function loadPosts() {
  // Simulating loading posts - You can replace this with an API call if needed
  const postsContainer = document.getElementById("postsContainer");

  // Example posts data
  const posts = [
    {
      title: "Post 1",
      content: "This is a test post.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      title: "Post 2",
      content: "Another test post.",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  // Render posts
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("col");

    postElement.innerHTML = `
      <div class="card h-100">
        <img src="${post.imageUrl}" class="card-img-top" alt="Post Thumbnail">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.content}</p>
        </div>
      </div>
    `;

    postsContainer.appendChild(postElement);
  });
}
