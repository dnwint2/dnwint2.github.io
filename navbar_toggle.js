// Mobile Nav Toggle (Hamburger Menu / close menu)
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");

function toggleMobileMenu() {
  if (navToggle.getAttribute("aria-expanded") == "false") {
    primaryNav.setAttribute("data-visible", "true");
    navToggle.setAttribute("aria-expanded", "true");
  } else if (navToggle.getAttribute("aria-expanded") == "true") {
    primaryNav.setAttribute("data-visible", "false");
    navToggle.setAttribute("aria-expanded", "false");
  } else {
    console.log("conditional fail");
  }
}

navToggle.addEventListener("click", toggleMobileMenu);
