// File: src/js/services/api.js

const API_KEY = "a223c2cb-fa90-4c4f-81a3-65ab7b95c3d8";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGhlcmVzZSIsImVtYWlsIjoidGhlcmVzZUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcyNzkzMjk0OX0.yQPUCytPzqk4a36Rw4bYQQDH5RNxaXQgHCC9hQEBS0E"; // Hardcoded for now, replace as needed

// Function to fetch all posts from the API
export async function fetchPostsFromAPI() {
  try {
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
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

// Function to fetch posts by a specific author
export async function fetchPostsByAuthor(authorName) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts?author=${authorName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
}

// Function to create a new post in the API
export async function createPostInAPI(postData) {
  try {
    const response = await fetch("https://v2.api.noroff.dev/social/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Error creating post");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// General POST request function for other needs
export async function apiPost(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API POST Error:", error);
    throw error;
  }
}
