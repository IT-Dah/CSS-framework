// File: src/js/profile.js

document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    // Display the user's name, email, and avatar
    document.getElementById("profileName").innerText = userData.name;
    document.getElementById("profileEmail").innerText = userData.email;
    document.getElementById("profileAvatar").src = userData.avatar.url;
  }

  // Handle profile update (e.g., bio, avatar)
  const updateProfileForm = document.getElementById("updateProfileForm");
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

      // Assuming the API call to update the profile looks like this
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
        alert("Profile updated successfully!");
        // Optionally, reload or update the UI with the new profile data
      } else {
        alert("Failed to update profile.");
      }
    });
  }
});
