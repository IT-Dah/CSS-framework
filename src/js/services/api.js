// File: src/js/services/api.js

// Hardcoded API Key and Access Token
const API_KEY = "a223c2cb-fa90-4c4f-81a3-65ab7b95c3d8";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGhlcmVzZSIsImVtYWlsIjoidGhlcmVzZUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcyNzkzMjk0OX0.yQPUCytPzqk4a36Rw4bYQQDH5RNxaXQgHCC9hQEBS0E"; // Replace with your actual token

// Function to fetch posts from the API
export async function fetchPostsFromAPI() {
  try {
    // Check if the token exists (for the sake of testing, you can ignore this check)
    if (!accessToken) {
      throw new Error("Unauthorized: No token found");
    }

    console.log("Access Token:", accessToken); // Log the token for debugging

    // Send the GET request with the Authorization header and API Key
    const response = await fetch("https://v2.api.noroff.dev/social/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Authorization header with token
        "X-Noroff-API-Key": API_KEY, // API Key in the headers
      },
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const posts = await response.json();
    console.log("Fetched Posts:", posts);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

// POST request function
export async function apiPost(url, data) {
  try {
    // Check if the token exists (for the sake of testing, you can ignore this check)
    if (!accessToken) {
      throw new Error("Unauthorized: No token found");
    }

    console.log("API Request:", url, data);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Authorization header with token
        "X-Noroff-API-Key": API_KEY, // API Key in the headers
      },
      body: JSON.stringify(data),
    });

    console.log("API Response:", response);
    if (!response.ok) {
      throw new Error("API request failed");
    }

    const result = await response.json();
    console.log("API Result:", result);
    return result;
  } catch (error) {
    console.error("API POST Error:", error);
    throw error;
  }
}
