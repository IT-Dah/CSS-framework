document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "/profile/index.html";
  });
});
