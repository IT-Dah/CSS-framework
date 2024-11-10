// File: src/js/feed.js

import { fetchPostsFromAPI, createPostInAPI } from "./services/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch posts from the API
    const posts = await fetchPostsFromAPI();
    console.log("Fetched Posts:", posts);

    // Function to display posts
    function displayPosts(postsToDisplay) {
      const postsContainer = document.getElementById("postsContainer");
      postsContainer.innerHTML = ""; // Clear the existing posts

      postsToDisplay.slice(0, 12).forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("card", "mb-3");
        postElement.innerHTML = `
          <img src="${
            post.media?.url || "default.jpg"
          }" class="card-img-top" alt="Post image">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
            <small class="text-muted">Posted by: ${
              post.author || "Unknown"
            }</small>
          </div>
        `;
        postsContainer.appendChild(postElement);
      });
    }

    // Initially display posts
    displayPosts(posts.data);

    // Handle sort functionality
    const sortSelect = document.getElementById("sortSelect");
    sortSelect.addEventListener("change", function () {
      const sortBy = sortSelect.value;
      let sortedPosts;

      if (sortBy === "date") {
        // Sort posts by date (Assuming `post.date` exists)
        sortedPosts = posts.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      } else if (sortBy === "popularity") {
        // Sort posts by popularity (Assuming `post.likes` exists)
        sortedPosts = posts.data.sort((a, b) => b.likes - a.likes);
      }

      // Display sorted posts
      displayPosts(sortedPosts);
    });
  } catch (error) {
    console.error("Error loading posts:", error);
  }
});

// Add event listener to the new post form
const postForm = document.getElementById("newPostForm");
if (postForm) {
  postForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const postTitle = document.getElementById("postTitle").value;
    const postContent = document.getElementById("postContent").value;
    const postImage = document.getElementById("postImage").value;

    const newPost = {
      title: postTitle,
      body: postContent,
      media: {
        url: postImage,
        alt: "Post Image",
      },
    };

    try {
      const createdPost = await createPostInAPI(newPost);
      console.log("Post created:", createdPost);
      alert("Post created successfully!");
      // Optionally, reload the page or update the UI with the new post
      location.reload(); // Refresh the page to show the new post
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
  });
}
