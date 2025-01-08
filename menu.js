document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menuButton");
    const closeMenuButton = document.getElementById("closeMenuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("overlay");
  
    // Open the mobile menu
    function openMenu() {
      mobileMenu.classList.remove("-translate-x-full");
      overlay.classList.remove("hidden");
    }
  
    // Close the mobile menu
    function closeMenu() {
      mobileMenu.classList.add("-translate-x-full");
      overlay.classList.add("hidden");
    }
  
    // Event listeners
    menuButton.addEventListener("click", openMenu);
    closeMenuButton.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
  });
  