"use strict";
function MakeProductList(productObjArray) {
    function MakeProduct(productObj) {
        
        var name = productObj.name || "Name is Missing";
        var quality = productObj.quality || "Quality is Missing";
        var price = productObj.price || "Price is Missing";
        var stock = productObj.stock || "Stock is Missing";
        
        var productDiv = document.createElement("div");
        productDiv.classList.add("product");

        var infoDiv = document.createElement("div");
        productDiv.appendChild(infoDiv);
        productDiv.innerHTML = "Name: " + name + "<br/>" +
                               "Price: " + formatCurrency(price) + "<br/>" +
                               "Product quality: " + quality + "<br/>" +
                               "Click on image to buy stock!" + "<br/>";
        
        var img = document.createElement("img");
        img.src = productObj.img || "https://thumbs.dreamstime.com/b/creative-design-funny-error-message-funny-error-message-160151581.jpg";
        productDiv.appendChild(img);
        function formatCurrency(num) {
            if (isNaN(num)) {
                return num;
            } else {
                var numNum = parseFloat(num);
                return numNum.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
            }
        }
        img.onmouseenter = function () { display() };//when user hovers over image, stock is displayed.
        img.onclick = function () { // when user clicks on div associated with this object
            if (stock < 2) {
                stock = "Sorry, out of stock!"
                display();
            } else {
                stock--; // reduce stock by 1.
                display();
            }
        };
        
        img.onmouseenter = function () { display() };
        
        var stockSpan = document.createElement("span");
        productDiv.appendChild(stockSpan);
        function display() {
            infoDiv.innerHTML = "Name: " + name + "<br/>" +
                "Price: " + formatCurrency(price) + "<br/>" +
                "Product quality: " + quality + "<br/>";
                stockSpan.innerHTML = "Stock left: " + stock + "<br/>";
        }
        return productDiv;
    }

    var containerDiv = document.createElement("div");
    containerDiv.classList.add("productList");
    for (var theProductObj of productObjArray) {
        containerDiv.appendChild(MakeProduct(theProductObj));
    }
    return containerDiv;
}