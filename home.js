/* =========================================================
   HOME PAGE LOGIC
   - Renders the featured product grid from PRODUCTS
   - Handles the All / On Sale / Sofa / Hanging Light tabs
     with NO page reload (instant client-side filtering)
   - Header search bar redirects to shop.html?q=...
   ========================================================= */

function renderFeatured(tag) {
  const grid = document.getElementById("featuredGrid");
  const filtered =
    tag === "all"
      ? PRODUCTS.filter((p) => p.tags.includes("all")).slice(0, 6)
      : PRODUCTS.filter((p) => p.tags.includes(tag)).slice(0, 6);

  grid.innerHTML = filtered.length
    ? filtered.map(productCardHTML).join("")
    : `<p style="grid-column:1/-1;text-align:center;padding:40px;color:#888;">No products in this category yet.</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeatured("all");

  document.querySelectorAll("#homeTabs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#homeTabs button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderFeatured(btn.dataset.tag);
    });
  });

  const searchForm = document.getElementById("headerSearchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = document.getElementById("headerSearchInput").value.trim();
      window.location.href = "shop.html" + (q ? `?q=${encodeURIComponent(q)}` : "");
    });
  }
});
