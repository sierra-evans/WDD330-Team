import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Calculate discount information
  const suggestedPrice = product.SuggestedRetailPrice;
  const finalPrice = product.FinalPrice;
  let discountBadge = '';
  let priceDisplay = `<p class="product-card__price">$${finalPrice}</p>`;
  
  if (suggestedPrice && finalPrice < suggestedPrice) {
    const discountPercentage = Math.round(((suggestedPrice - finalPrice) / suggestedPrice) * 100);
    discountBadge = `<div class="product-card__discount-badge">${discountPercentage}% OFF</div>`;
    priceDisplay = `
      <div class="product-card__pricing">
        <p class="product-card__original-price">$${suggestedPrice.toFixed(2)}</p>
        <p class="product-card__final-price">$${finalPrice}</p>
      </div>`;
  }

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    ${discountBadge}
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    ${priceDisplay}</a>
  </li>`;
}

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  const products = await getData(category);
  console.log(products);
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, products);
  document.querySelector(".title").innerHTML = category;
}
