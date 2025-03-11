let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  let currentScroll = window.scrollY;
  if (currentScroll === 0) {
    navbar.classList.remove("scrolling");
  } else {
    navbar.classList.add("scrolling");
  }
  if (currentScroll > lastScrollTop) {
    // Scrolling down
    navbar.classList.add("hidden");
  } else {
    // Scrolling up
    navbar.classList.remove("hidden");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
