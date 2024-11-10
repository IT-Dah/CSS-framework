// File: src/js/feed.js

import { fetchPostsFromAPI } from "./services/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch posts from the API
    const postsResponse = await fetchPostsFromAPI();

    // Assuming the API returns an object with a 'data' property containing the posts array
    const posts = postsResponse.data; // Access the 'data' array from the response

    const postsContainer = document.getElementById("postsContainer");

    // Display posts dynamically
    posts.forEach((post) => {
      const postCard = document.createElement("div");
      postCard.classList.add("col");

      postCard.innerHTML = `
        <div class="card h-100">
          <img src="${post.image}" class="card-img-top" alt="${post.title}">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.content}</p>
          </div>
        </div>
      `;
      postsContainer.appendChild(postCard);
    });
  } catch (error) {
    console.error("Error loading posts:", error);
    alert("Failed to load posts.");
  }
});
