// File: src/js/feed.js
import { fetchPostsFromAPI } from "./services/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const posts = await fetchPostsFromAPI();
    displayPosts(posts); // Function to display posts
  } catch (error) {
    console.error("Error loading posts:", error);
  }
});

// Function to display posts in the feed
function displayPosts(posts) {
  const postsContainer = document.getElementById("postsContainer");

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("col");
    postElement.innerHTML = `
      <div class="card h-100">
        <img src="${
          post.imageUrl || "https://via.placeholder.com/150"
        }" class="card-img-top" alt="${post.title}">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.content}</p>
        </div>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}
