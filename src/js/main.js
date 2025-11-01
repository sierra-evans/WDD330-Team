import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

productList(".product-list", "tents");

// Register Modal
function showSignupModal() {
    const modal = document.getElementById("signupModal");
    const closeBtn = document.getElementById("closeModal");
  
    if (!modal) return;
  
    if (!localStorage.getItem("modalShown")) {
      modal.style.display = "flex";
      localStorage.setItem("modalShown", "true");
    }
  
    closeBtn?.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
  
  window.addEventListener("load", showSignupModal);
  // End of Register Modal
  