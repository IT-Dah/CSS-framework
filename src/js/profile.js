// File: src/js/profile.js
import { createPostInAPI } from "../js/services/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData) {
    alert("Please log in.");
    window.location.href = "/index.html"; // Redirect to login if no user data found
    return;
  }

  // Display user profile data
  document.getElementById("profileName").innerText = userData.name;
  document.getElementById("profileEmail").innerText = userData.email;
  document.getElementById("profileAvatar").src = userData.avatar.url;
  document.getElementById("profileBio").innerText =
    userData.bio || "No bio available";

  // Fetch user's posts based on the userData (assuming userData has a 'name' or 'id' field)
  try {
    const posts = await fetchUserPosts(userData.name);
    displayPosts(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    alert("Failed to fetch posts. Please try again later.");
  }

  // Toggle Update Profile Form
  const toggleUpdateProfileButton = document.getElementById(
    "toggleUpdateProfileButton"
  );
  const updateProfileSection = document.getElementById("updateProfileSection");
  toggleUpdateProfileButton.addEventListener("click", () => {
    updateProfileSection.style.display =
      updateProfileSection.style.display === "none" ? "block" : "none";
  });

  // Toggle New Post Form
  const toggleNewPostButton = document.getElementById("toggleNewPostButton");
  const newPostSection = document.getElementById("newPostSection");
  toggleNewPostButton.addEventListener("click", () => {
    newPostSection.style.display =
      newPostSection.style.display === "none" ? "block" : "none";
  });

  // Handle profile update
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

  // Handle new post submission
  const newPostForm = document.getElementById("newPostForm");
  if (newPostForm) {
    newPostForm.addEventListener("submit", async (e) => {
      e.preventDefault();

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
        location.reload(); // Refresh the page to show the new post
      } catch (error) {
        console.error("Error creating post:", error);
        alert("Failed to create post.");
      }
    });
  }
});

// Function to fetch user posts
async function fetchUserPosts(username) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Access token is missing. Please log in.");
  }

  const response = await fetch(
    `https://v2.api.noroff.dev/social/posts?author=${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error fetching posts");
  }

  const posts = await response.json();
  return posts.data;
}

// Function to display posts
function displayPosts(posts) {
  const postsContainer = document.getElementById("userPostsContainer");
  postsContainer.innerHTML = "";

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
