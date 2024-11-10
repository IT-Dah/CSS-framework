// File: src/js/feed.js
import { fetchPostsFromAPI, createPostInAPI } from "./services/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const posts = await fetchPostsFromAPI();
    console.log("Fetched Posts:", posts);

    // Example of how to display the fetched posts (you can loop through posts and display them)
    const postsContainer = document.getElementById("postsContainer");
    posts.data.slice(0, 5).forEach((post) => {
      const postElement = document.createElement("div");
      postElement.innerHTML = `
        <div class="card">
          <img src="${
            post.media?.url || "default.jpg"
          }" class="card-img-top" alt="Post image">
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
