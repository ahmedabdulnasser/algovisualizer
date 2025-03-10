document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-controls");
  const controls = document.querySelector(".controls");

  toggleButton.textContent = "Show Controls";

  toggleButton.addEventListener("click", function () {
    if (controls.style.display === "none" || controls.style.display === "") {
      controls.style.display = "flex";
      toggleButton.textContent = "Hide Controls";
    } else {
      controls.style.display = "none";
      toggleButton.textContent = "Show Controls";
    }
  });
});
