/* =========================================================
   CART PAGE LOGIC
   Renders every line item straight from Cart.detailed()
   (which merges localStorage quantities with PRODUCTS data),
   supports quantity +/-, remove, and live totals.
   ========================================================= */

function renderCartPage() {
  const items = Cart.detailed();
  const wrap = document.getElementById("cartLines");

  if (!items.length) {
    wrap.innerHTML = `
      <div style="text-align:center;padding:80px 20px;color:#6f6f6c;">
        <p style="font-size:18px;font-weight:700;margin-bottom:10px;">Your cart is empty</p>
        <p style="margin-bottom:24px;">Looks like you haven't added anything yet.</p>
        <a href="shop.html" class="btn">Continue Shopping</a>
      </div>`;
  } else {
    wrap.innerHTML = items
      .map(
        (item) => `
      <div class="cart-line" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <div class="stars">${starsHTML(item.rating)}</div>
          <div class="cart-line-bottom">
            <div class="qty-control">
              <button data-minus="${item.id}">−</button>
              <span>${item.qty}</span>
              <button data-plus="${item.id}">+</button>
            </div>
            <div>
              <b>${formatPrice(item.lineTotal)}</b>
              <button class="remove-item" data-remove="${item.id}" style="margin-left:16px;">Remove</button>
            </div>
          </div>
        </div>
      </div>`
      )
      .join("");
  }

  document.getElementById("sumSubtotal").textContent = formatPrice(Cart.subtotal());
  document.getElementById("sumTotal").textContent = formatPrice(Cart.subtotal());

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (!items.length) {
    checkoutBtn.classList.add("outline");
    checkoutBtn.style.pointerEvents = "none";
    checkoutBtn.style.opacity = ".5";
  }
}

document.addEventListener("click", (e) => {
  const plus = e.target.closest("[data-plus]");
  const minus = e.target.closest("[data-minus]");
  const remove = e.target.closest("[data-remove]");

  if (plus) {
    const id = Number(plus.dataset.plus);
    const current = Cart.read().find((i) => i.id === id);
    Cart.setQty(id, (current ? current.qty : 0) + 1);
    renderCartPage();
  }
  if (minus) {
    const id = Number(minus.dataset.minus);
    const current = Cart.read().find((i) => i.id === id);
    Cart.setQty(id, (current ? current.qty : 1) - 1);
    renderCartPage();
  }
  if (remove) {
    Cart.remove(Number(remove.dataset.remove));
    renderCartPage();
    showToast("Item removed");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();

  document.getElementById("checkoutBtn").addEventListener("click", (e) => {
    if (!Cart.count()) return; // already disabled via CSS, but guard anyway
    if (!Auth.isLoggedIn()) {
      e.preventDefault();
      showToast("Please login to proceed to checkout");
      setTimeout(() => Auth.requireLogin(), 700);
    }
  });

  document.getElementById("headerSearchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("headerSearchInput").value.trim();
    window.location.href = "shop.html" + (q ? `?q=${encodeURIComponent(q)}` : "");
  });
});
