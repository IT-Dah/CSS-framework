// src/js/feed.js
import { getFeedPosts } from "./services/api.js";

async function loadFeed() {
  const feedContainer = document.querySelector("#feedContainer");
  const posts = await getFeedPosts();

  if (posts.length > 0) {
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.innerHTML = `
        <h5>${post.title}</h5>
        <p>${post.body}</p>
      `;
      feedContainer.appendChild(postElement);
    });
  } else {
    feedContainer.innerHTML = "<p>No posts available.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadFeed);
