// File: src/js/feed.js

import { fetchPostsFromAPI } from "./services/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const posts = await fetchPostsFromAPI();
    const postsContainer = document.getElementById("postsContainer");

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("col");

      postElement.innerHTML = `
        <div class="card h-100">
          <img src="${post.avatar.url}" class="card-img-top" alt="${post.avatar.alt}" />
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.content}</p>
          </div>
        </div>
      `;

      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error loading posts:", error);
    alert("Failed to load posts. Please try again later.");
  }
});
