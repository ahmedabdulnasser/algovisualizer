document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-controls");
  const toggleControlsInfoButton = document.getElementById("toggle-controls-info");
  const controls = document.querySelector("#controls");
  const controlsInfo = document.querySelector("#controls-info");
  const popup = document.querySelector("#popup");
  const closePopupButton = document.querySelector("#close-popup");

  toggleButton.addEventListener("click", function () {
    if (controls.style.display === "none" || controls.style.display === "") {
      controls.style.display = "flex";
      controlsInfo.style.display = "none";
      toggleButton.textContent = "Hide Controls";
      toggleControlsInfoButton.textContent = "Show Controls Info";
    } else {
      controls.style.display = "none";
      toggleButton.textContent = "Show Controls";
    }
  });

  toggleControlsInfoButton.addEventListener("click", function () {
    if (controlsInfo.style.display === "none" || controlsInfo.style.display === "") {
      controlsInfo.style.display = "flex";
      controls.style.display = "none";
      toggleControlsInfoButton.textContent = "Hide Controls Info";
      toggleButton.textContent = "Show Controls";
    } else {
      controlsInfo.style.display = "none";
      toggleControlsInfoButton.textContent = "Show Controls Info";
    }
  });

  closePopupButton.addEventListener("click", function () {
    popup.style.display = "none";
  });

});
