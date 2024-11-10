// File: src/js/profile.js

document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    // Display the user's name, email, and avatar
    document.getElementById("profileName").innerText = userData.name;
    document.getElementById("profileEmail").innerText = userData.email;
    document.getElementById("profileAvatar").src = userData.avatar.url;
  } else {
    alert("No user data found. Please log in.");
    window.location.href = "/index.html"; // Redirect to login page
  }

  // Handle profile update (e.g., bio, avatar)
  const updateProfileForm = document.getElementById("editProfileForm");
  if (updateProfileForm) {
    updateProfileForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const newBio = document.getElementById("profileBio").value;
      const newAvatar = document.getElementById("profileAvatarInput").value;

      const updatedProfile = {
        bio: newBio,
        avatar: {
          url: newAvatar,
          alt: "User avatar",
        },
      };

      // Make the API call to update the profile
      const response = await fetch(
        "https://v2.api.noroff.dev/social/profiles",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(updatedProfile),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        alert("Profile updated successfully!");

        // Update localStorage with the new profile data
        localStorage.setItem("userData", JSON.stringify(updatedData.data));

        // Optionally, update the profile UI with the new data
        document.getElementById("profileName").innerText =
          updatedData.data.name;
        document.getElementById("profileEmail").innerText =
          updatedData.data.email;
        document.getElementById("profileAvatar").src =
          updatedData.data.avatar.url;
      } else {
        alert("Failed to update profile.");
      }
    });
  }
});
