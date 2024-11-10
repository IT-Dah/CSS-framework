// File: src/js/profile.js
import { fetchPostsByAuthor, createPostInAPI } from "../js/services/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData) {
    alert("Please log in.");
    window.location.href = "../index.html"; // Redirect to login if no user data found
    return;
  }

  // Display user profile data
  document.getElementById("profileName").innerText = userData.name;
  document.getElementById("profileEmail").innerText = userData.email;
  document.getElementById("profileAvatar").src = userData.avatar.url;
  document.getElementById("profileBio").innerText =
    userData.bio || "No bio available";

  // Fetch user's posts
  try {
    const posts = await fetchPostsByAuthor(userData.name);
    displayPosts(posts.data.slice(0, 6)); // Display 6 latest posts
  } catch (error) {
    console.error("Error fetching user posts:", error);
    alert("Failed to fetch posts. Please try again later.");
  }

  // Toggle Update Profile form visibility
  const toggleUpdateProfileButton = document.getElementById(
    "toggleUpdateProfileButton"
  );
  const updateProfileSection = document.getElementById("updateProfileSection");

  toggleUpdateProfileButton.addEventListener("click", () => {
    updateProfileSection.style.display =
      updateProfileSection.style.display === "none" ? "block" : "none";
  });

  // Toggle New Post form visibility
  const toggleNewPostButton = document.getElementById("toggleNewPostButton");
  const newPostSection = document.getElementById("newPostSection");

  toggleNewPostButton.addEventListener("click", () => {
    newPostSection.style.display =
      newPostSection.style.display === "none" ? "block" : "none";
  });

  // Handle new post submission
  const newPostForm = document.getElementById("newPostForm");
  if (newPostForm) {
    newPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const postTitle = document.getElementById("postTitle").value;
      const postContent = document.getElementById("postContent").value;
      const postImage = document.getElementById("postImage").value;

      const newPost = {
        title: postTitle,
        body: postContent,
        author: userData.name,
        media: {
          url: postImage,
          alt: "Post Image",
        },
      };

      try {
        const createdPost = await createPostInAPI(newPost);
        console.log("Post created:", createdPost);
        alert("Post created successfully!");
        location.reload(); // Refresh the page to show the new post
      } catch (error) {
        console.error("Error creating post:", error);
        alert("Failed to create post.");
      }
    });
  }
});

// Function to display user's posts
function displayPosts(posts) {
  const postsContainer = document.getElementById("userPostsContainer");
  postsContainer.innerHTML = ""; // Clear existing posts

  if (posts.length === 0) {
    const noPostsMessage = document.createElement("p");
    noPostsMessage.innerText = "No posts to display.";
    postsContainer.appendChild(noPostsMessage);
  }

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("card", "mb-3");
    postElement.innerHTML = `
      <img src="${
        post.media?.url || "default.jpg"
      }" class="card-img-top" alt="${post.media?.alt || "Post image"}">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.body}</p>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}
