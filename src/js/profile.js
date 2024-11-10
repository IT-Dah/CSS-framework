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
    const posts = await fetchPostsByAuthor(userData.name); // Fetch posts created by the user
    displayPosts(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    alert("Failed to fetch posts. Please try again later.");
  }

  // Event listeners for toggling the visibility of the update profile and create post sections
  const toggleUpdateProfileButton = document.getElementById(
    "toggleUpdateProfileButton"
  );
  const toggleNewPostButton = document.getElementById("toggleNewPostButton");
  const updateProfileSection = document.getElementById("updateProfileSection");
  const newPostSection = document.getElementById("newPostSection");

  if (toggleUpdateProfileButton) {
    toggleUpdateProfileButton.addEventListener("click", () => {
      updateProfileSection.style.display =
        updateProfileSection.style.display === "none" ? "block" : "none";
      newPostSection.style.display = "none"; // Hide new post section if visible
    });
  }

  if (toggleNewPostButton) {
    toggleNewPostButton.addEventListener("click", () => {
      newPostSection.style.display =
        newPostSection.style.display === "none" ? "block" : "none";
      updateProfileSection.style.display = "none"; // Hide update profile section if visible
    });
  }

  // Handle profile update form submission
  const updateProfileForm = document.getElementById("updateProfileForm");
  if (updateProfileForm) {
    updateProfileForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newBio = document.getElementById("profileBioInput").value;
      const newAvatar = document.getElementById("profileAvatarInput").value;

      const updatedProfile = {
        bio: newBio,
        avatar: {
          url: newAvatar,
          alt: "User avatar",
        },
      };

      // Update profile in the API
      try {
        const response = await updateProfileAPI(updatedProfile);
        alert("Profile updated successfully!");
        localStorage.setItem("userData", JSON.stringify(response.data));
        document.getElementById("profileAvatar").src = response.data.avatar.url;
        document.getElementById("profileBio").innerText = response.data.bio;
      } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Failed to update profile.");
      }
    });
  }

  // Handle new post form submission
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
        // Optionally, reload the page or update the UI with the new post
        location.reload(); // Refresh the page to show the new post
      } catch (error) {
        console.error("Error creating post:", error);
        alert("Failed to create post.");
      }
    });
  }
});

// Function to display posts
function displayPosts(posts) {
  const postsContainer = document.getElementById("userPostsContainer");
  postsContainer.innerHTML = ""; // Clear existing posts

  if (posts.length === 0) {
    const noPostsMessage = document.createElement("p");
    noPostsMessage.innerText = "No posts to display.";
    postsContainer.appendChild(noPostsMessage);
  }

  // Only show the latest 6 posts
  posts.slice(0, 6).forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("card", "mb-3");
    postElement.innerHTML = `
      <img src="${
        post.media?.url || "default.jpg"
      }" class="card-img-top" alt="${post.media?.alt || "Post image"}">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.body}</p>
        <p class="card-text text-muted">Posted by: ${
          post.author || "Unknown"
        }</p>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}
