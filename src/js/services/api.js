// src/js/services/api.js
import { API_KEY } from "./config.js";

export async function apiPost(url, data) {
  try {
    console.log("API Request:", url, data);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
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