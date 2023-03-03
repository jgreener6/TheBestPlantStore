//const PromptSync = require("prompt-sync")

 storedEmptyCart = JSON.parse(localStorage.getItem("emptyCart"))
 console.log(storedEmptyCart)

 const cartItemsList = document.getElementById("CartItemsList")
 const nameDiv = document.getElementById("nameDiv")
 const qtyDiv = document.getElementById("qtyDiv")
 const priceDiv = document.getElementById("priceDiv")
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
    newPrice.innerText= product.price
    priceDiv.append(newPrice)

    const newQty = document.createElement("p")
    newQty.innerText= product.category
    qtyDiv.append(newQty)

    let price = +product.price
    
   subPrice += price
 });

 const taxMI = 0.06;
 const tax = subPrice * taxMI;
 /* var rounded = Math.round(tax * 10) / 10
 var fixed = rounded.toFixed(1)
 parseFloat(tax.toFixed(2))
 */
 const totalPrice = tax + subPrice;

 
 subTotal.innerText = (`Subtotal: ${subPrice}`)
 salesTax.innerText = (`Tax: ${tax}`)
 total.innerText = (`Total: ${totalPrice}`)





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
 
