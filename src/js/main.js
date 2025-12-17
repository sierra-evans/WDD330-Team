import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

productList(".product-list", "tents");

// Register Modal
const modal = document.getElementById("welcome-modal");
const closeBtn = document.getElementById("close-modal");

// Check if the visitor has been here before
if (!localStorage.getItem("hasVisited")) {
  modal.classList.remove("hidden"); // Show modal
  localStorage.setItem("hasVisited", "true"); // Mark as visited
}

// Close modal on click
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Only run on pages that have a product-list
document.addEventListener("DOMContentLoaded", () => renderTopProducts());

// Newsletter Form
document.addEventListener("DOMContentLoaded", () => {
	const button = document.getElementById("subscribe-btn");
	const message = document.getElementById("newsletter-message");
	const input = document.getElementById("email");
  
	button.addEventListener("click", () => {
	  // Show message
	  message.textContent = "Thank you for subscribing!";
	  message.style.color = "#2a5934";
  
	  // Clear input
	  input.value = "";
	});
  });
  // End of Register Modal
  