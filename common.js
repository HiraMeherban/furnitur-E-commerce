/* =========================================================
   COMMON UTILITIES — shared by every page
   ========================================================= */

function formatPrice(n) {
  return "$" + Number(n).toFixed(2);
}

function starsHTML(rating) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += i <= rating ? "★" : '<span class="empty">★</span>';
  }
  return html;
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* Builds one product card. Used by home page + shop page. */
function productCardHTML(p) {
  const priceHTML = p.oldPrice
    ? `<span class="old">${formatPrice(p.oldPrice)}</span><span class="new">${formatPrice(p.price)}</span>`
    : formatPrice(p.price);

  const badge = p.oldPrice
    ? `<span class="badge">-${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>`
    : "";

  return `
    <div class="product-card" data-id="${p.id}">
      <a href="product.html?id=${p.id}" class="img-wrap">
        ${badge}
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </a>
      <div class="info">
        <a href="product.html?id=${p.id}"><h3>${p.name}</h3></a>
        <div class="stars">${starsHTML(p.rating)}</div>
        <div class="price">${priceHTML}</div>
        <button class="add-cart-mini" data-add="${p.id}">Add to Cart</button>
      </div>
    </div>
  `;
}

/* Builds one blog post card. Used by home page preview + blog.html listing. */
function blogCardHTML(post) {
  return `
    <a class="blog-card" href="blog-post.html?id=${post.id}">
      <div class="blog-img"><img src="${post.image}" alt="${post.title}" loading="lazy"></div>
      <div class="blog-info">
        <div class="blog-date">${post.date} | ${post.time}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <div class="blog-tags">${post.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      </div>
    </a>
  `;
}

/* Delegated click handler for any ".add-cart-mini" button rendered anywhere.
   Requires login first — matches how most real stores work. */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  e.preventDefault();

  if (!Auth.isLoggedIn()) {
    showToast("Please login to add items to your cart");
    setTimeout(() => Auth.requireLogin(), 700);
    return;
  }

  const id = Number(btn.dataset.add);
  const product = PRODUCTS.find((p) => p.id === id);
  Cart.add(id, 1);
  showToast(`${product ? product.name : "Item"} added to cart`);
});

/* Renders the Login / My Account link in the header, on every page */
function renderAuthLink() {
  const actions = document.querySelector(".header-actions");
  if (!actions) return;

  let link = document.getElementById("authLink");
  if (!link) {
    link = document.createElement("a");
    link.id = "authLink";
    link.href = "login.html";
    actions.insertBefore(link, actions.firstChild);
  }

  const user = Auth.get();
  if (user) {
    link.textContent = `👤 ${user.name || "Account"}`;
    link.href = "#";
    link.onclick = (e) => {
      e.preventDefault();
      Auth.logout();
      showToast("Logged out");
      renderAuthLink();
    };
  } else {
    link.textContent = "👤 Login";
    link.href = "login.html";
    link.onclick = null;
  }
}

document.addEventListener("DOMContentLoaded", renderAuthLink);
document.addEventListener("authchange", renderAuthLink);

/* Mobile nav toggle (used on all pages) */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.style.display = nav.style.display === "flex" ? "none" : "flex";
      nav.style.flexDirection = "column";
      nav.style.position = "absolute";
      nav.style.top = "70px";
      nav.style.left = "0";
      nav.style.right = "0";
      nav.style.background = "#fff";
      nav.style.padding = "20px";
      nav.style.gap = "16px";
      nav.style.boxShadow = "0 8px 20px rgba(0,0,0,.08)";
    });
  }
});

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
