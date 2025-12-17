import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId).then(() => {
//   Comments System
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const commentList = document.getElementById("comment-list");

  const addToCartBtn = document.getElementById("addToCart");
  if (!addToCartBtn) return;

  const storageKey = `comments-${addToCartBtn.dataset.id}`;

  function loadComments() {
    if (!commentList) return;
    const comments = JSON.parse(localStorage.getItem(storageKey)) || [];
    commentList.innerHTML = "";
    comments.forEach((comment) => {
      const li = document.createElement("li");
      li.textContent = comment;
      commentList.appendChild(li);
    });
  }

  if (commentForm) {
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const commentText = commentInput.value.trim();
      if (!commentText) return;

      const comments = JSON.parse(localStorage.getItem(storageKey)) || [];
      comments.push(commentText);
      localStorage.setItem(storageKey, JSON.stringify(comments));

      commentInput.value = "";
      loadComments();
    });
  }

  loadComments();
});
