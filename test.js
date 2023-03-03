const cartString = localStorage.getItem('emptyCart')

const emptyCart = JSON.parse(cartString)

console.log(emptyCart)