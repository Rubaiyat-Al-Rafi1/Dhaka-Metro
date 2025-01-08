document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const closeButton = document.getElementById("closeButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");
  const startJourneyButton = document.getElementById("startJourney");
  const loginLinks = document.querySelectorAll("#loginLink, #loginLinkMobile");
  const logoutLinks = document.querySelectorAll("#logoutLink, #logoutLinkMobile");
  const userLinks = document.querySelectorAll(
      "#travelLink, #walletLink, #routeLink, #profileLink, #ticketsLink, #travelLinkMobile, #walletLinkMobile, #routeLinkMobile, #profileLinkMobile, #ticketsLinkMobile"
  );

  let isLoggedIn = false; // Initial login state

  /**
   * Helper: Toggle mobile menu visibility.
   */
  function toggleMenu() {
      const isOpen = mobileMenu.classList.contains("translate-x-0");
      mobileMenu.classList.toggle("translate-x-0", !isOpen);
      overlay.classList.toggle("hidden", isOpen);
  }

  /**
   * Check login status by calling the backend.
   */
  function checkLoginStatus() {
      fetch("check_session.php")
          .then((response) => response.json())
          .then((data) => {
              isLoggedIn = data.loggedIn;

              if (isLoggedIn) {
                  // Show user-specific links
                  userLinks.forEach((link) => link.classList.remove("hidden"));
                  logoutLinks.forEach((link) => link.classList.remove("hidden"));

                  // Hide login links
                  loginLinks.forEach((link) => link.classList.add("hidden"));
              } else {
                  // Show login links
                  loginLinks.forEach((link) => link.classList.remove("hidden"));

                  // Hide user-specific and logout links
                  userLinks.forEach((link) => link.classList.add("hidden"));
                  logoutLinks.forEach((link) => link.classList.add("hidden"));
              }
          })
          .catch((error) => console.error("Error checking login status:", error));
  }

  /**
   * Handle user logout.
   */
  /**
 * Handle user logout.
 */
function handleLogout(event) {
  event.preventDefault(); // Prevent default link behavior

  fetch("logout.php", { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
          if (data.success) {
              // Refresh and redirect to index.html
              window.location.href = "index.html";
          } else {
              console.error("Logout failed:", data.message);
          }
      })
      .catch((error) => console.error("Error during logout:", error));
}


  /**
   * Redirect "Start Your Journey" button based on login state.
   */
  function redirectStartJourney() {
      if (isLoggedIn) {
          window.location.href = "travel.html"; // Go to travel page if logged in
      } else {
          window.location.href = "login.php"; // Go to login page if not logged in
      }
  }

  // Check login status on page load
  checkLoginStatus();

  // Add event listeners
  menuButton.addEventListener("click", toggleMenu);
  closeButton.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
  startJourneyButton.addEventListener("click", redirectStartJourney);
  logoutLinks.forEach((logoutLink) => logoutLink.addEventListener("click", handleLogout));
});
