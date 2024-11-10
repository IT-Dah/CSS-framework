import { fetchPostsFromAPI } from "./services/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch the posts from the API
    const posts = await fetchPostsFromAPI();

    // Limit to the last 5 posts
    const recentPosts = posts.data.slice(0, 5); // Adjust the number to limit

    console.log("Recent Posts:", recentPosts);

    // Select the container where posts will be displayed
    const postsContainer = document.getElementById("postsContainer");

    // Loop through the recent posts and display them
    recentPosts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("col");

      // Check if post has media (images, etc.)
      const mediaUrl = post.media ? post.media.url : ""; // Add your media URL path here

      postElement.innerHTML = `
        <div class="card h-100">
          <img src="${mediaUrl}" class="card-img-top" alt="Post Thumbnail" />
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
          </div>
        </div>
      `;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error loading posts:", error);
    alert("Failed to load posts.");
  }
});
