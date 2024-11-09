// src/js/profile.js
import { getProfile } from "./services/api.js";

async function loadProfile() {
  const profileContainer = document.querySelector("#profileContainer");
  const username = localStorage.getItem("username");

  const profile = await getProfile(username);
  if (profile) {
    profileContainer.innerHTML = `
      <h2>${profile.username}</h2>
      <p>Followers: ${profile.followers.length}</p>
      <p>Following: ${profile.following.length}</p>
    `;
  } else {
    profileContainer.innerHTML = "<p>Profile not found.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadProfile);
