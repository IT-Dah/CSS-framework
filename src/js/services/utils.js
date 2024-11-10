// File: src/js/services/utils.js

import { fetchUserPosts } from "./api.js";

// Function to fetch posts for the logged-in user
export async function fetchLoggedInUserPosts() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localStorage.getItem("accessToken");

  if (!userData || !accessToken) {
    throw new Error("User is not logged in or access token is missing.");
  }

  return await fetchUserPosts(userData.name);
}
