(function () {
  const views = {
    cart: document.getElementById("cart-view"),
    payment: document.getElementById("payment-view"),
    receipt: document.getElementById("receipt-view"),
  };
  const cartList = document.getElementById("cart-list");
  const cartSummary = document.getElementById("cart-summary");
  const emptyState = document.getElementById("empty-cart");
  const checkoutBtn = document.getElementById("checkout-btn");
  const paymentTotal = document.getElementById("payment-total");
  const methodBtns = document.querySelectorAll(".method-btn");
  const cardForm = document.getElementById("card-form");
  const cashForm = document.getElementById("cash-form");
  const receiptEl = document.getElementById("receipt");

  let cart = loadCart();

  function showView(name) {
    Object.entries(views).forEach(([key, el]) => (el.hidden = key !== name));
    window.scrollTo(0, 0);
  }

  function totalsHtml({ subtotal, tax, total }) {
    return `
      <div class="totals-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
      <div class="totals-row"><span>Tax (6%)</span><span>${formatPrice(tax)}</span></div>
      <div class="totals-row grand"><span>Total</span><span>${formatPrice(total)}</span></div>`;
  }

  // ---------- Cart ----------

  function renderCart() {
    const lines = cartLines(cart);
    const isEmpty = lines.length === 0;
    emptyState.hidden = !isEmpty;
    cartList.hidden = isEmpty;
    cartSummary.hidden = isEmpty;
    if (isEmpty) return;

    cartList.innerHTML = lines
      .map(
        ({ product: p, qty }) => `
        <li class="cart-item">
          <img src="./Assets/${p.image}" alt="" />
          <div class="cart-item-info">
            <span class="cart-item-name">${p.name}</span>
            <span class="tag tag-${p.category}">${CATEGORY_LABELS[p.category]}</span>
          </div>
          <div class="qty-control" aria-label="Quantity for ${p.name}">
            <button class="qty-btn" data-id="${p.id}" data-delta="-1" aria-label="Decrease quantity">&minus;</button>
            <span class="qty">${qty}</span>
            <button class="qty-btn" data-id="${p.id}" data-delta="1" aria-label="Increase quantity">+</button>
          </div>
          <span class="cart-item-price">${formatPrice(p.price * qty)}</span>
          <button class="remove-btn" data-id="${p.id}" aria-label="Remove ${p.name}">
            <i class="bx bx-trash" aria-hidden="true"></i>
          </button>
        </li>`
      )
      .join("");

    document.getElementById("totals").innerHTML = totalsHtml(cartTotals(cart));
  }

  cartList.addEventListener("click", (e) => {
    const qtyBtn = e.target.closest(".qty-btn");
    const removeBtn = e.target.closest(".remove-btn");
    if (qtyBtn) {
      const id = qtyBtn.dataset.id;
      cart[id] = (cart[id] || 0) + Number(qtyBtn.dataset.delta);
      if (cart[id] <= 0) delete cart[id];
    } else if (removeBtn) {
      delete cart[removeBtn.dataset.id];
    } else {
      return;
    }
    saveCart(cart);
    renderCart();
  });

  checkoutBtn.addEventListener("click", () => {
    paymentTotal.textContent = formatPrice(cartTotals(cart).total);
    showView("payment");
  });

  document.getElementById("back-to-cart").addEventListener("click", () => showView("cart"));

  // ---------- Payment ----------

  methodBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const method = btn.dataset.method;
      methodBtns.forEach((b) => b.setAttribute("aria-pressed", b === btn));
      cardForm.hidden = method !== "card";
      cashForm.hidden = method !== "cash";
      (method === "card" ? cardForm : cashForm).querySelector("input").focus();
    });
  });

  const yearSelect = document.getElementById("exp-year");
  const thisYear = new Date().getFullYear();
  for (let y = thisYear; y <= thisYear + 10; y++) {
    yearSelect.add(new Option(y, y));
  }

  const ccInput = document.getElementById("cc-number");
  ccInput.addEventListener("input", () => {
    const digits = ccInput.value.replace(/\D/g, "").slice(0, 19);
    ccInput.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  });

  // Luhn checksum: catches typos in card numbers.
  function isValidCardNumber(digits) {
    if (!/^\d{13,19}$/.test(digits)) return false;
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let d = Number(digits[digits.length - 1 - i]);
      if (i % 2 === 1) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
    }
    return sum % 10 === 0;
  }

  function setError(form, message) {
    const el = form.querySelector(".form-error");
    el.textContent = message;
    el.hidden = !message;
  }

  cardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const digits = ccInput.value.replace(/\s/g, "");
    const month = Number(document.getElementById("exp-month").value);
    const year = Number(yearSelect.value);
    const cvv = document.getElementById("cvv").value.trim();
    const now = new Date();

    if (!isValidCardNumber(digits)) {
      return setError(cardForm, "That card number doesn't look right.");
    }
    if (!month || !year || year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
      return setError(cardForm, "Please choose a valid expiration date.");
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      return setError(cardForm, "CVV should be 3 or 4 digits.");
    }
    setError(cardForm, "");
    completeOrder({ method: "card", last4: digits.slice(-4) });
  });

  cashForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { total } = cartTotals(cart);
    const paid = Math.round(Number(document.getElementById("cash-amount").value) * 100);
    if (!paid || paid < total) {
      return setError(cashForm, `That's not enough! The total is ${formatPrice(total)}. Stealing is bad. 🌵`);
    }
    setError(cashForm, "");
    completeOrder({ method: "cash", paid, change: paid - total });
  });

  // ---------- Receipt ----------

  function completeOrder(payment) {
    const lines = cartLines(cart);
    const totals = cartTotals(cart);
    const orderNumber = Math.floor(700000 + Math.random() * 100000);

    const paymentRows =
      payment.method === "card"
        ? `<div class="totals-row"><span>Paid with card</span><span>•••• ${payment.last4}</span></div>`
        : `<div class="totals-row"><span>Cash paid</span><span>${formatPrice(payment.paid)}</span></div>
           <div class="totals-row"><span>Change due</span><span>${formatPrice(payment.change)}</span></div>`;

    receiptEl.innerHTML = `
      <i class="bx bxs-check-circle receipt-icon" aria-hidden="true"></i>
      <h1>Thank you for your purchase!</h1>
      <p class="muted">Order #${orderNumber} &middot; ${new Date().toLocaleString()}</p>
      <ul class="receipt-lines">
        ${lines
          .map(
            ({ product, qty }) =>
              `<li><span>${product.name}${qty > 1 ? ` &times; ${qty}` : ""}</span><span>${formatPrice(product.price * qty)}</span></li>`
          )
          .join("")}
      </ul>
      <div class="totals">${totalsHtml(totals)}${paymentRows}</div>
      <a href="./index.html" class="btn btn-block">Keep shopping</a>`;

    cart = {};
    saveCart(cart);
    showView("receipt");
  }

  renderCart();
})();
