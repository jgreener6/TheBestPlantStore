//const PromptSync = require("prompt-sync")

storedEmptyCart = JSON.parse(localStorage.getItem("emptyCart"));
console.log(storedEmptyCart);

const theCartGreyBox = document.getElementById("TheCartGreyBox");
const cartItemsList = document.getElementById("CartItemsList");
const nameDiv = document.getElementById("name-div");
const qtyDiv = document.getElementById("qty-div");
const priceDiv = document.getElementById("price-div");
const subTotal = document.getElementById("subtotal");
const salesTax = document.getElementById("sales-tax");
const total = document.getElementById("total");
const cartPriceBox = document.getElementById("CartPrice");
const checkoutButton = document.getElementById("cartSubmit");

let subPrice = 0;

storedEmptyCart.forEach((product) => {
  const newName = document.createElement("p");
  newName.innerText = product.name;
  nameDiv.append(newName);

  const newPrice = document.createElement("p");
  newPrice.innerText = `$${product.price}`;
  priceDiv.append(newPrice);

  const newQty = document.createElement("p");
  newQty.innerText = product.category;
  qtyDiv.append(newQty);

  let price = +product.price;

  subPrice += price;
});

const taxMI = 0.06;
const tax = subPrice * taxMI;
var rounded = Math.round(tax * 10) / 10;
var fixed = rounded.toFixed(1);

const totalPrice = parseFloat(tax.toFixed(2)) + subPrice;

subTotal.innerText = `Subtotal: $${subPrice}`;
salesTax.innerText = `Tax: $${fixed}`;
total.innerText = `Total: $${totalPrice}`;

const paymentBoxToggle = document.getElementById("payment-box");
checkoutButton.addEventListener("click", (event) => {
  theCartGreyBox.classList.add("hidden");
  paymentBoxToggle.classList.remove("hidden");
});

const cashButton = document.getElementById("cash-button");
const cardButton = document.getElementById("card-button");
const cashToggle = document.getElementById("cashToggle");
const cardToggle = document.getElementById("cardToggle");

cashButton.addEventListener("click", (event) => {
  cashToggle.classList.remove("hidden");
  cardToggle.classList.add("hidden");
});
cardButton.addEventListener("click", (event) => {
  cardToggle.classList.remove("hidden");
  cashToggle.classList.add("hidden");
});

const cashTotalContainer = document.getElementById("cash-total-container");
const cashAmountContainer = document.getElementById("cash-amount-container");
const cashPayContainer = document.getElementById("cash-pay-container");
const cashChangeContainer = document.getElementById("cash-change-container");

const cashtotal = document.createElement("p");
cashtotal.innerText = `Total: $${totalPrice}`;
cashTotalContainer.append(cashtotal);

const cashPayment = document.getElementById("cash-payment");
const cashAmountPaid = document.getElementById("cash-amount-paid");
const changeDue = document.getElementById("change-due");
const cashCheckoutBtn = document.getElementById("cash-submit");
const cardCheckoutBtn = document.getElementById("card-submit");

cashCheckoutBtn.addEventListener("click", (event) => {
  event.preventDefault();
  paymentBoxToggle.classList.add("hidden");
  receiptDisplayCash.classList.remove("hidden");
  const cashAmountPaidText = document.createElement("p");
  cashAmountPaidText.innerText = `Amount Paid: $${cashPayment.value}`;
  const cashChangeDue = cashPayment.value - totalPrice;
  const cashChangeDueText = document.createElement("p")
  cashAmountPaid.append(cashAmountPaidText);
  cashChangeDueText.innerText = `Change Due: $${cashChangeDue}`;
  changeDue.append(cashChangeDueText);
});

/* cardCheckoutBtn.addEventListener("click", (event) => {
  //event.preventDefault();
  paymentBoxToggle.classList.add("hidden");
  receiptDisplayCard.classList.remove("hidden");
  const cardAmountPaidText = document.createElement("p");
  cardAmountPaidText.innerText = `Amount Paid: $${totalPrice}`;
  orderTotalCard.append(cardAmountPaidText);
}); */

function cardCheckOut(){
  paymentBoxToggle.classList.add("hidden");
  receiptDisplayCard.classList.remove("hidden");
  const cardAmountPaidText = document.createElement("p");
  cardAmountPaidText.innerText = `Amount Paid: $${totalPrice}`;
  orderTotalCard.append(cardAmountPaidText);
  event.preventDefault();
}

// receipt box card

const receiptBox = document.getElementById("receipt-box");
const receiptDisplayCard = document.getElementById("receipt-display-card");
const orderBoxCard = document.getElementById("order-box-card");
const orderNumberCard = document.getElementById("order-number-card");
const orderListCard = document.getElementById("order-list-card");
const orderTotalCard = document.getElementById("order-total-card");

const randomOrderNum = Math.floor(Math.random() * (100000 + 1) + 700000);

orderNumberCard.innerText = `Order Number: ${randomOrderNum}`;

storedEmptyCart.forEach((product) => {
  const orderList = document.createElement("p");
  orderList.innerText = product.name;
  orderListCard.append(orderList);

  const orderPrice = document.createElement("p");
  orderPrice.innerText = `$${product.price}`;
  orderListCard.append(orderPrice);

  let price = +product.price;

  subPrice += price;
});

const cardSubtotal = document.createElement("p");
const cardTaxTotal = document.createElement("p");
const cardTotal = document.createElement("p");

cardSubtotal.innerText = `Subtotal: $${subPrice}`;
orderTotalCard.append(cardSubtotal);
cardTaxTotal.innerText = `Tax: $${fixed}`;
orderTotalCard.append(cardTaxTotal);
cardTotal.innerText = `Total: $${totalPrice}`;
orderTotalCard.append(cardTotal);

// receipt box cash

const receiptDisplayCash = document.getElementById("receipt-display-cash");
const orderBoxCash = document.getElementById("order-box-cash");
const orderNumberCash = document.getElementById("order-number-cash");
const orderListCash = document.getElementById("order-list-cash");
const orderTotalCash = document.getElementById("order-total-cash");


orderNumberCash.innerText = `Order Number: ${randomOrderNum}`;

storedEmptyCart.forEach((product) => {
  const orderList = document.createElement("p");
  orderList.innerText = product.name;
  orderListCash.append(orderList);

  const orderPrice = document.createElement("p");
  orderPrice.innerText = `$${product.price}`;
  orderListCash.append(orderPrice);

  let price = +product.price;

  subPrice += price;
});

const cashTotal = document.createElement("p");

cashTotal.innerText = `Total: $${totalPrice}`;
orderTotalCash.append(cashTotal);
