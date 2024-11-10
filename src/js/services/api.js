// File: src/js/services/api.js

const API_KEY = "a223c2cb-fa90-4c4f-81a3-65ab7b95c3d8";
const accessToken = localStorage.getItem("accessToken");

// Function to fetch all posts from the API
export async function fetchPostsFromAPI() {
  try {
    console.log("Fetching all posts");
    const response = await fetch("https://v2.api.noroff.dev/social/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
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

// Function to create a new post in the API
export async function createPostInAPI(postData) {
  try {
    console.log("Creating Post:", postData);

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
    console.log("Created Post:", result);
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// Function to fetch user posts by author
export async function fetchPostsByAuthor(author) {
  try {
    console.log("Fetching posts by author:", author);

    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts?author=${author}`,
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
      throw new Error("Error fetching posts");
    }

    const posts = await response.json();
    console.log("Fetched User Posts:", posts);
    return posts;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
}
