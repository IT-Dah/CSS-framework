document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    // Display the user's name, email, avatar, and bio
    document.getElementById("profileName").innerText = userData.name;
    document.getElementById("profileEmail").innerText = userData.email;
    document.getElementById("profileAvatar").src = userData.avatar.url;
    document.getElementById("profileBio").innerText =
      userData.bio || "No bio available"; // Display the bio if available
  }

  // Handle profile update (e.g., bio, avatar)
  const updateProfileForm = document.getElementById("updateProfileForm");
  if (updateProfileForm) {
    updateProfileForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const newBio = document.getElementById("profileBioInput").value; // Get new bio input
      const newAvatar = document.getElementById("profileAvatarInput").value; // Get new avatar input

      const updatedProfile = {
        bio: newBio,
        avatar: {
          url: newAvatar,
          alt: "User avatar",
        },
      };

      // Assuming the API call to update the profile looks like this
      const response = await fetch(
        `https://v2.api.noroff.dev/social/profiles/${userData.name}`, // Use username in the URL
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-Noroff-API-Key": "a223c2cb-fa90-4c4f-81a3-65ab7b95c3d8", // API key for authorization
          },
          body: JSON.stringify(updatedProfile),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Profile updated successfully!");

        // Update the localStorage with the new profile info
        localStorage.setItem("userData", JSON.stringify(data.data));

        // Update UI to reflect new profile data
        document.getElementById("profileAvatar").src = data.data.avatar.url;
        document.getElementById("profileBio").innerText =
          data.data.bio || "No bio available"; // Update the bio

        // Clear the form fields after successful update
        updateProfileForm.reset(); // This will reset the form fields
      } else {
        alert("Failed to update profile.");
      }
    });
  }
});
