//const PromptSync = require("prompt-sync")

 storedEmptyCart = JSON.parse(localStorage.getItem("emptyCart"))
 console.log(storedEmptyCart)

 const cartItemsList = document.getElementById("CartItemsList")
 const nameDiv = document.getElementById("name-div")
 const qtyDiv = document.getElementById("qty-div")
 const priceDiv = document.getElementById("price-div")
 const subTotal = document.getElementById("subtotal")
 const salesTax = document.getElementById("sales-tax")
 const total = document.getElementById("total")
 const cartPriceBox = document.getElementById("CartPrice")
 const checkoutButton = document.getElementById(".cartSubmit");


let subPrice = 0;


 storedEmptyCart.forEach(product => {
    const newName = document.createElement("p")
    newName.innerText= product.name
    nameDiv.append(newName)

    const newPrice = document.createElement("p")
    newPrice.innerText= `$${product.price}`
    priceDiv.append(newPrice)

    const newQty = document.createElement("p")
    newQty.innerText= product.category
    qtyDiv.append(newQty)

    let price = +product.price
    
   subPrice += price
 });

 const taxMI = 0.06;
 const tax = subPrice * taxMI;
 var rounded = Math.round(tax * 10) / 10
 var fixed = rounded.toFixed(1)
 

 const totalPrice = parseFloat(tax.toFixed(2)) + subPrice;

 
 subTotal.innerText = (`Subtotal: $${subPrice}`)
 salesTax.innerText = (`Tax: $${fixed}`)
 total.innerText = (`Total: $${totalPrice}`)



 const cashTotalContainer = document.getElementById("cash-total-container");
 const cashAmountContainer = document.getElementById("cash-amount-container");
 const cashPayContainer = document.getElementById("cash-pay-container");
 const cashChangeContainer = document.getElementById("cash-change-container");

const cashtotal = document.createElement("p");
cashtotal.innerText = (`Total: $${totalPrice}`);
cashTotalContainer.append(cashtotal);





 
//  for (const checkoutButton) {
//     checkoutButton.addEventListener("click", (event) => {
//       const paymentMethod = prompt("Would you like to pay with Cash or Card today?")
//       if ( paymentMethod === "Cash"){
//         const cashTendered = prompt("How much Cash do you have?")
//       } else if (paymentMethod === "Card"){
//         const cardInfo = prompt("How much Cash do you have?")
//       } else (
//         console.log ("Please enter a valid payment method")
//       )

//       console.log(paymentMethod)
//     });
//   }
 
