/* =========================================================
   Shared "Your Order" summary box used on every checkout step
   (customer info, shipping & payment, review). Pulls live data
   straight from the persistent Cart / localStorage.
   ========================================================= */

function renderOrderSummary(targetId, opts = {}) {
  const items = Cart.detailed();
  const wrap = document.getElementById(targetId);
  if (!wrap) return;

  wrap.innerHTML = items
    .map(
      (item) => `
    <div class="cart-line" style="grid-template-columns:80px 1fr;">
      <img src="${item.image}" alt="${item.name}" style="width:80px;height:80px;">
      <div>
        <h4>${item.name}</h4>
        <div style="font-size:12px;color:#6f6f6c;margin:4px 0;">${item.qty} item${item.qty > 1 ? "s" : ""}</div>
        <b>${formatPrice(item.lineTotal)}</b>
      </div>
    </div>`
    )
    .join("") || `<p style="color:#6f6f6c;">Your cart is empty.</p>`;

  const subtotal = Cart.subtotal();
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  document.getElementById("orderSubtotal") && (document.getElementById("orderSubtotal").textContent = formatPrice(subtotal));
  document.getElementById("orderDiscount") && (document.getElementById("orderDiscount").textContent = "-" + formatPrice(discount));
  document.getElementById("orderTotal") && (document.getElementById("orderTotal").textContent = formatPrice(total));
}

document.addEventListener("DOMContentLoaded", () => renderOrderSummary("orderLines"));
