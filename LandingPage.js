(function (){
const containers = document.querySelectorAll(".imageContainer");
const images = document.querySelectorAll(".product-image");
const info = document.querySelectorAll(".product-info");
function imageClick (e){
    
    info.forEach(i => i.style.display="none");
    containers.forEach(c => {
        c.style.height = "unset";
        c.style.backgroundColor = "unset";
    });


   let image = e.target;
   let container = image.parentElement;
   container.style.height = "500px";
   container.style.backgroundColor = "#aaaaaa";
   
   const pInfo = container.querySelector(".product-info");
   pInfo.style.display = "block";

   
   



}
images.forEach ((i)=>i.addEventListener("click", imageClick))

}());