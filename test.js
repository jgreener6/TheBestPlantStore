 storedEmptyCart = JSON.parse(localStorage.getItem("emptyCart"))
 console.log(storedEmptyCart)

 const cartItemsList = document.getElementById("CartItemsList")
 const nameDiv = document.getElementById("nameDiv")
 const qtyDiv = document.getElementById("qtyDiv")
 const priceDiv = document.getElementById("priceDiv")




 storedEmptyCart.forEach(product => {
    const newName = document.createElement("p")
    newName.innerText= product.name
    nameDiv.append(newName)

    const newPrice = document.createElement("p")
    newPrice.innerText= product.price
    nameDiv.append(newPrice)

    const newQty = document.createElement("p")
    newQty.innerText= product.category
    nameDiv.append(newQty)
 });
 
