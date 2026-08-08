/* =========================================================
   PRODUCT DETAIL PAGE LOGIC
   Reads the ?id= query param, finds the product in PRODUCTS,
   and renders every part of the page dynamically.
   ========================================================= */

let currentQty = 1;
let selectedType = null;
let selectedColor = null;

function loadProduct() {
  const id = Number(getQueryParam("id")) || PRODUCTS[0].id;
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  document.getElementById("pageTitle").textContent = product.name + " — Furnitur";
  document.getElementById("breadcrumb").innerHTML =
    `<a href="index.html">Home</a> / <a href="shop.html">Shop</a> / <b>${product.name}</b>`;

  selectedType = product.types ? product.types[0] : null;
  selectedColor = product.colors ? product.colors[0] : null;
  currentQty = 1;

  document.getElementById("pdWrap").innerHTML = `
    <div class="pd-gallery">
      <div class="main-img"><img id="mainImg" src="${product.gallery[0]}" alt="${product.name}"></div>
      <div class="pd-thumbs">
        ${product.gallery
          .map(
            (img, i) =>
              `<img src="${img}" class="${i === 0 ? "active" : ""}" data-img="${img}" alt="thumb ${i + 1}">`
          )
          .join("")}
      </div>
    </div>
    <div class="pd-info">
      <h1>${product.name}</h1>
      <div class="stars">${starsHTML(product.rating)} ${product.onSale ? '<span class="badge" style="position:static;margin-left:10px;">ON SALE</span>' : ""}</div>
      <div class="pd-meta">${product.sold} products sold &nbsp;•&nbsp; ${product.watched} products watched</div>

      ${
        product.types
          ? `<div class="pd-option">
              <label>Type:</label>
              <div class="opt-btns" id="typeOptions">
                ${product.types.map((t) => `<button data-type="${t}" class="${t === selectedType ? "active" : ""}">${t}</button>`).join("")}
              </div>
            </div>`
          : ""
      }

      ${
        product.colors
          ? `<div class="pd-option">
              <label>Color:</label>
              <div class="opt-btns" id="colorOptions">
                ${product.colors
                  .map(
                    (c) =>
                      `<span class="color-swatch ${c === selectedColor ? "active" : ""}" data-color="${c}" style="background:${c}"></span>`
                  )
                  .join("")}
              </div>
            </div>`
          : ""
      }

      <div class="qty-row">
        <div class="qty-control">
          <button id="qtyMinus">−</button>
          <span id="qtyValue">1</span>
          <button id="qtyPlus">+</button>
        </div>
      </div>

      <div class="pd-price">
        ${product.oldPrice ? `<span style="text-decoration:line-through;color:#9a9a97;font-size:16px;margin-right:10px;">${formatPrice(product.oldPrice)}</span>` : ""}
        ${formatPrice(product.price)}
      </div>

      <div class="pd-actions">
        <button class="btn" id="buyNowBtn">Buy Now</button>
        <button class="btn outline" id="addToCartBtn">Add to Cart</button>
      </div>
    </div>
  `;

  // thumbnail switching
  document.querySelectorAll(".pd-thumbs img").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      document.getElementById("mainImg").src = thumb.dataset.img;
      document.querySelectorAll(".pd-thumbs img").forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  // type options
  const typeWrap = document.getElementById("typeOptions");
  if (typeWrap) {
    typeWrap.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        typeWrap.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        selectedType = btn.dataset.type;
      });
    });
  }

  // color options
  const colorWrap = document.getElementById("colorOptions");
  if (colorWrap) {
    colorWrap.querySelectorAll(".color-swatch").forEach((sw) => {
      sw.addEventListener("click", () => {
        colorWrap.querySelectorAll(".color-swatch").forEach((s) => s.classList.remove("active"));
        sw.classList.add("active");
        selectedColor = sw.dataset.color;
      });
    });
  }

  // qty controls
  document.getElementById("qtyMinus").addEventListener("click", () => {
    currentQty = Math.max(1, currentQty - 1);
    document.getElementById("qtyValue").textContent = currentQty;
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    currentQty += 1;
    document.getElementById("qtyValue").textContent = currentQty;
  });

  // add to cart / buy now
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    if (!Auth.isLoggedIn()) {
      showToast("Please login to add items to your cart");
      setTimeout(() => Auth.requireLogin(), 700);
      return;
    }
    Cart.add(product.id, currentQty);
    showToast(`${product.name} added to cart`);
  });
  document.getElementById("buyNowBtn").addEventListener("click", () => {
    if (!Auth.isLoggedIn()) {
      showToast("Please login to continue");
      setTimeout(() => Auth.requireLogin(), 700);
      return;
    }
    Cart.add(product.id, currentQty);
    window.location.href = "cart.html";
  });

  // detail tab content
  document.getElementById("tabDetail").innerHTML = `
    <div>
      <h4>Description</h4>
      <p>${product.description}</p>
    </div>
    <div>
      <h4>Fits and Features</h4>
      <ol>${product.features.map((f) => `<li>${f}</li>`).join("")}</ol>
    </div>
  `;

  // related products (same category, excluding self)
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const fallback = related.length ? related : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
  document.getElementById("relatedGrid").innerHTML = fallback.map(productCardHTML).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  loadProduct();

  document.querySelectorAll(".pd-tabs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pd-tabs button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tabDetail").style.display = btn.dataset.tab === "detail" ? "grid" : "none";
      document.getElementById("tabDelivery").style.display = btn.dataset.tab === "delivery" ? "grid" : "none";
    });
  });

  document.getElementById("headerSearchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("headerSearchInput").value.trim();
    window.location.href = "shop.html" + (q ? `?q=${encodeURIComponent(q)}` : "");
  });
});
