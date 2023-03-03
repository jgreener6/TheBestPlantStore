 storedEmptyCart = JSON.parse(localStorage.getItem("emptyCart"))
 console.log(storedEmptyCart)

 const cartItemsList = document.getElementById("CartItemsList")

 for (let i=0; i < storedEmptyCart.length; i++){
    console.log('hello')
 }