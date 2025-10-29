import productList from "./productList.mjs";
import loadHeaderFooter from "./utils.mjs";

productList(".product-list", "tents");
loadHeaderFooter();
import { getData } from "./productData.mjs";

// Render top products into the .product-list on the home page
async function renderTopProducts(category = "tents") {
	try {
		const products = await getData(category);
		const list = document.querySelector(".product-list");
		if (!list) return;

		// If the HTML already contains static items, replace them
		list.innerHTML = "";

		products.slice(0, 8).forEach((p) => {
			list.innerHTML += productCardTemplate(p);
		});
	} catch (err) {
		// graceful fallback
		console.error("Failed to load products", err);
	}
}

function productCardTemplate(p) {
	const discount = computeDiscount(p.ListPrice, p.FinalPrice);
	const discountBadge = discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : "";

	return `
		<li class="product-card">
			<a href="product_pages/index.html?product=${p.Id}">
				<div class="product-card__thumb">
					<img src="${p.Image}" alt="${p.Name}" />
					${discountBadge}
				</div>
				<h3 class="card__brand">${p.Brand.Name}</h3>
				<h2 class="card__name">${p.NameWithoutBrand}</h2>
				<p class="product-card__price">$${p.FinalPrice}</p>
			</a>
		</li>
	`;
}

function computeDiscount(listPrice, finalPrice) {
	const lp = Number(listPrice);
	const fp = Number(finalPrice);
	if (!lp || !fp || lp <= fp) return 0;
	const pct = Math.round(((lp - fp) / lp) * 100);
	return pct;
}

// Only run on pages that have a product-list
document.addEventListener("DOMContentLoaded", () => renderTopProducts());

// Newsletter Form Handling
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
  