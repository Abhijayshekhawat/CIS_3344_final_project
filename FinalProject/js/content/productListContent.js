"use strict";
function productListContent() {
    var content = ` 
      <h4>Products Available:</h4>
      <p>
         Hover over image, to see the number in stock and click on Image to purchase.
      </p>
    `;
    var ele = document.createElement("div");
    ele.innerHTML = content;
    var myProductListDiv = MakeProductList([
        { Name: "Speaker", price: 80, quality: "Used", stock: 15, img: "pics/pics_products/speaker.jpg" },
        {}, // this "product object" should receive default values for condition and price... 
        { Name: "Kindle", price: 250, quality: "New", stock: 5, img: "pics/pics_products/kindle.jpg" }
    ]);
    ele.appendChild(myProductListDiv);
    var yourProductListDiv = MakeProductList([
        { Name: "Camera", price: 2000, quality: "New", stock: 25, img: "pics/pics_products/camera.jpg"},
        { Name: "Headphones", price: 150, quality: "Used", stock: 10, img: "pics/pics_products/headphones.jpg" }
    ]);
    ele.appendChild(yourProductListDiv);
    return ele;
}