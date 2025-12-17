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

  // End of Register Modal
  