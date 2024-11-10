// File: src/js/services/api.js

export async function apiPost(url, data) {
  try {
    console.log("API Request:", url, data);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

// Function to fetch posts from the API
export async function fetchPostsFromAPI() {
  try {
    // Get the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Check if the token exists
    if (!accessToken) {
      throw new Error("Unauthorized: No token found");
    }

    // Send the GET request with the Authorization header
    const response = await fetch("https://v2.api.noroff.dev/social/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Pass the token here
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
