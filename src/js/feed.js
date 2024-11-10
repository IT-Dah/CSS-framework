// File: src/js/feed.js
import { fetchPostsFromAPI } from "./services/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const postsContainer = document.getElementById("postsContainer");

  try {
    const posts = await fetchPostsFromAPI();

    // Ensure posts data is available
    if (posts?.data && Array.isArray(posts.data)) {
      posts.data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("col");

        const postCard = `
          <div class="card h-100">
            <img src="${
              post.media?.url || "https://via.placeholder.com/150"
            }" class="card-img-top" alt="${post.title}" />
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.body}</p>
            </div>
          </div>
        `;

        postElement.innerHTML = postCard;
        postsContainer.appendChild(postElement);
      });
    } else {
      postsContainer.innerHTML = "<p>No posts available.</p>";
    }
  } catch (error) {
    console.error("Error loading posts:", error);
    postsContainer.innerHTML =
      "<p>Error loading posts. Please try again later.</p>";
  }
});
