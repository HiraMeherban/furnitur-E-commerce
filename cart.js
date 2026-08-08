/* =========================================================
   CART MODULE
   Persists the cart in localStorage under "furnitur_cart" so
   it survives page refreshes and navigation between pages.
   Shape saved: [{ id, qty }]
   ========================================================= */

const CART_KEY = "furnitur_cart";

const Cart = {
  read() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Cart read error:", e);
      return [];
    }
  },

  write(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    Cart.updateBadge();
  },

  add(productId, qty = 1) {
    const items = Cart.read();
    const existing = items.find((i) => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id: productId, qty });
    }
    Cart.write(items);
  },

  setQty(productId, qty) {
    let items = Cart.read();
    if (qty <= 0) {
      items = items.filter((i) => i.id !== productId);
    } else {
      const existing = items.find((i) => i.id === productId);
      if (existing) existing.qty = qty;
    }
    Cart.write(items);
  },

  remove(productId) {
    const items = Cart.read().filter((i) => i.id !== productId);
    Cart.write(items);
  },

  clear() {
    Cart.write([]);
  },

  /* Cart items enriched with full product data */
  detailed() {
    return Cart.read()
      .map((line) => {
        const product = PRODUCTS.find((p) => p.id === line.id);
        if (!product) return null;
        return { ...product, qty: line.qty, lineTotal: product.price * line.qty };
      })
      .filter(Boolean);
  },

  count() {
    return Cart.read().reduce((sum, i) => sum + i.qty, 0);
  },

  subtotal() {
    return Cart.detailed().reduce((sum, i) => sum + i.lineTotal, 0);
  },

  /* Updates every cart-count badge present on the current page */
  updateBadge() {
    const count = Cart.count();
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = count;
      el.style.display = count > 0 ? "flex" : "none";
    });
  }
};

document.addEventListener("DOMContentLoaded", Cart.updateBadge);
