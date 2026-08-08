/* =========================================================
   SHOP PAGE LOGIC
   - Renders category + material filters dynamically from data
   - Category click -> instant filter, no page refresh
   - Search bar filters products by name in real time
   - Price range + sort + simple pagination (9 per page)
   ========================================================= */

const state = {
  category: "all",
  query: "",
  maxPrice: 3500,
  material: "all",
  sort: "default",
  page: 1,
  perPage: 9
};

function getFilteredProducts() {
  let list = [...PRODUCTS];

  if (state.category !== "all") {
    list = list.filter((p) => p.category === state.category);
  }
  if (state.material !== "all") {
    list = list.filter((p) => p.material === state.material);
  }
  if (state.query.trim()) {
    const q = state.query.trim().toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q));
  }
  list = list.filter((p) => p.price <= state.maxPrice);

  switch (state.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "name":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
  return list;
}

function renderSidebar() {
  const catList = document.getElementById("categoryList");
  catList.innerHTML = CATEGORIES.map((c) => {
    const count = c.key === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c.key).length;
    return `<li data-cat="${c.key}" class="${state.category === c.key ? "active" : ""}">
      <span>${c.label}</span><span>(${String(count).padStart(2, "0")})</span>
    </li>`;
  }).join("");

  catList.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      state.category = li.dataset.cat;
      state.page = 1;
      renderAll();
    });
  });

  const materials = [...new Set(PRODUCTS.map((p) => p.material))];
  const matList = document.getElementById("materialList");
  matList.innerHTML =
    `<li data-mat="all" class="${state.material === "all" ? "active" : ""}"><span>All</span></li>` +
    materials
      .map((m) => {
        const count = PRODUCTS.filter((p) => p.material === m).length;
        return `<li data-mat="${m}" class="${state.material === m ? "active" : ""}">
          <span>${m}</span><span>(${String(count).padStart(2, "0")})</span>
        </li>`;
      })
      .join("");

  matList.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      state.material = li.dataset.mat;
      state.page = 1;
      renderAll();
    });
  });
}

function renderGrid() {
  const grid = document.getElementById("shopGrid");
  const filtered = getFilteredProducts();
  const start = (state.page - 1) * state.perPage;
  const pageItems = filtered.slice(start, start + state.perPage);

  grid.innerHTML = pageItems.length
    ? pageItems.map(productCardHTML).join("")
    : `<div class="no-results">No products found${state.query ? ` for "<b>${state.query}</b>"` : ""}. Try a different search or category.</div>`;

  document.getElementById("resultTitle").textContent = state.query
    ? `Result for "${state.query}"`
    : CATEGORIES.find((c) => c.key === state.category)?.label + " Products";

  const total = filtered.length;
  const shownEnd = Math.min(start + state.perPage, total);
  document.getElementById("resultCount").textContent = total
    ? `Showed ${total ? start + 1 : 0} - ${shownEnd} of ${total} products`
    : "";

  renderPagination(total);
}

function renderPagination(total) {
  const totalPages = Math.max(1, Math.ceil(total / state.perPage));
  const el = document.getElementById("pagination");
  if (totalPages <= 1) {
    el.innerHTML = "";
    return;
  }
  let pages = "";
  for (let i = 1; i <= totalPages; i++) {
    pages += `<button data-page="${i}" class="${state.page === i ? "active" : ""}">${String(i).padStart(2, "0")}</button>`;
  }
  el.innerHTML = `<div class="pages">${pages}</div>`;
  el.querySelectorAll("[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.page = Number(btn.dataset.page);
      renderAll();
      window.scrollTo({ top: 400, behavior: "smooth" });
    });
  });
}

function renderAll() {
  renderSidebar();
  renderGrid();
}

document.addEventListener("DOMContentLoaded", () => {
  const qParam = getQueryParam("q");
  const catParam = getQueryParam("category");
  if (qParam) {
    state.query = qParam;
    document.getElementById("headerSearchInput").value = qParam;
  }
  if (catParam) state.category = catParam;

  renderAll();

  document.getElementById("headerSearchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    state.query = document.getElementById("headerSearchInput").value;
    state.page = 1;
    renderAll();
  });

  document.getElementById("sortSelect").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderAll();
  });

  const priceRange = document.getElementById("priceRange");
  priceRange.addEventListener("input", () => {
    document.getElementById("priceLabel").value = `$0 - $${priceRange.value}`;
  });
  document.getElementById("applyPrice").addEventListener("click", () => {
    state.maxPrice = Number(priceRange.value);
    state.page = 1;
    renderAll();
  });
});
