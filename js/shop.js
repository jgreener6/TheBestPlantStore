(function () {
  const grid = document.getElementById("product-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cartCountEl = document.getElementById("cart-count");
  const toast = document.getElementById("toast");

  let cart = loadCart();
  let toastTimer;

  function renderProducts(category) {
    const items = category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);
    grid.innerHTML = items
      .map(
        (p) => `
        <article class="product-card">
          <div class="product-image-wrap">
            <img src="./Assets/${p.image}" alt="${p.alt}" loading="lazy" />
          </div>
          <div class="product-body">
            <span class="tag tag-${p.category}">${CATEGORY_LABELS[p.category]}</span>
            <h2 class="product-name">${p.name}</h2>
            <p class="product-description">${p.description}</p>
            <div class="product-footer">
              <span class="product-price">${formatPrice(p.price)}</span>
              <button class="btn add-btn" data-id="${p.id}" aria-label="Add ${p.name} to cart">
                <i class="bx bx-cart-add" aria-hidden="true"></i> Add
              </button>
            </div>
          </div>
        </article>`
      )
      .join("");
  }

  function updateCartCount() {
    const count = cartCount(cart);
    cartCountEl.textContent = count;
    cartCountEl.hidden = count === 0;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", b === btn);
      });
      renderProducts(btn.dataset.category);
    });
  });

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-btn");
    if (!btn) return;
    const product = getProduct(btn.dataset.id);
    cart[product.id] = (cart[product.id] || 0) + 1;
    saveCart(cart);
    updateCartCount();
    showToast(`${product.name} added to cart`);
  });

  // Keep the badge in sync if the cart changes in another tab.
  window.addEventListener("storage", (e) => {
    if (e.key === CART_KEY) {
      cart = loadCart();
      updateCartCount();
    }
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  renderProducts("all");
  updateCartCount();
})();
