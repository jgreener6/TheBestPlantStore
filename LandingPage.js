(function () {
  
  const header = document.getElementById("nav-bar");
  const btns = header.getElementsByClassName("filterBtn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      const current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
      
    });
  }

 const pointys = document.getElementsByName("pointy");
 const flowers = document.getElementsByName("flower");
 const trees = document.getElementsByName("tree");
  const allBtn = document.getElementById("allBtn");
  const treeBtn = document.getElementById("treesBtn");
  const flowerBtn = document.getElementById("flowerBtn");
  const pointyBtn = document.getElementById("pointyBtn");

  for (const pointy of pointys) {
    allBtn.addEventListener("click", (event) => {
      pointy.parentNode.style.display = "block"
    })
    treeBtn.addEventListener("click", (event) => {
      pointy.parentNode.style.display = "none"
    })
    flowerBtn.addEventListener("click", (event) => {
      pointy.parentNode.style.display = "none"
    })
    pointyBtn.addEventListener("click", (event) => {
      pointy.parentNode.style.display = "block"
    })
    
  }

  for (const flower of flowers) {
    allBtn.addEventListener("click", (event) => {
      flower.parentNode.style.display = "block"
    })
    treeBtn.addEventListener("click", (event) => {
      flower.parentNode.style.display = "none"
    })
    flowerBtn.addEventListener("click", (event) => {
      flower.parentNode.style.display = "block"
    })
    pointyBtn.addEventListener("click", (event) => {
      flower.parentNode.style.display = "none"
    })
    
  }

  for (const tree of trees) {
    allBtn.addEventListener("click", (event) => {
      tree.parentNode.style.display = "block"
    })
    treeBtn.addEventListener("click", (event) => {
      tree.parentNode.style.display = "block"
    })
    flowerBtn.addEventListener("click", (event) => {
      tree.parentNode.style.display = "none"
    })
    pointyBtn.addEventListener("click", (event) => {
      tree.parentNode.style.display = "none"
    })
    
  }
  


  const containers = document.querySelectorAll(".imageContainer");
  const images = document.querySelectorAll(".product-image");
  const info = document.querySelectorAll(".info-container");
  const addCartBtns = document.querySelectorAll(".add-cart");
  const cartBtn = document.getElementById("cart");
  function imageClick(e) {
    info.forEach((i) => (i.style.display = "none"));
    containers.forEach((c) => {
      c.style.height = "unset";
      c.style.backgroundColor = "unset";
    });

    let image = e.target;
    let container = image.parentElement;
    container.style.height = "500px";
    container.style.backgroundColor = "#3d413b7e";

    const pInfo = container.querySelector(".info-container");
    pInfo.style.display = "block";
  }

  const emptyCart = [];

  for (const addCartBtn of addCartBtns) {
    addCartBtn.addEventListener("click", (event) => {
      let productObject = {
        name: addCartBtn.dataset.name,
        category: addCartBtn.dataset.category,
        price: addCartBtn.dataset.price,
        id: addCartBtn.dataset.id,
      };
      emptyCart.push(productObject);

      let cartTotal = document.getElementById("cart-total");
      cartTotal.innerHTML = emptyCart.length;
      cartTotal.style.display = "inline";
      // console.log(emptyCart)

      localStorage.setItem("emptyCart", JSON.stringify(emptyCart));

      console.log("emptyCart", localStorage.emptyCart);
    });
  }

  // localStorage.setItem('emptyCart', JSON.stringify(emptyCart))

  // console.log("emptyCart", localStorage.emptyCart)

  images.forEach((i) => i.addEventListener("click", imageClick));
})();
