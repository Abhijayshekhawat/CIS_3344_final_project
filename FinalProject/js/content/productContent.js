"use strict";
function productContent() {
    var content = `
        <style>
            .productContainer {
                display:flex; 
                flex-direction: row;
                background-color: white;
            }
            .productContainer .product {
                width: 33%; /* to fit three columns inside the flexContainer */
                box-sizing: border-box; /* makes padding and border counted in the width */
            }
            .productContainer .productStyle img {
                width: 80%;
            }
        </style>
    `;
    var ele = document.createElement("div");
    ele.innerHTML = content; // the HTML code specified just above...
    var productContainer = document.createElement("div");
    productContainer.classList.add('flexContainer'); // see styling in this file, above...
    ele.appendChild(productContainer);
    productContainer.appendChild(MakeProduct({ name: "Speaker", quality: "Excellent", price: 500, img: "pics/pics_products/speaker.jpg", addinfo: "Top of the line speaker"}));
    productContainer.appendChild(MakeProduct({ name: "Camera", quality: "Refurbished", price: 1500, img: "pics/pics_products/camera.jpg", addinfo:"Used high quality camera"}));
    productContainer.appendChild(MakeProduct({}));
    return ele;
}
