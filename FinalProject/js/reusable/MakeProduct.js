"use strict";
function MakeProduct({ img = "icons/errorrandom0.jpg", name = "Name is Missing", quality = "Quality is Missing", price = "Price is Missing", addinfo = "None" }) {
    // create div productObj
    var productObj = document.createElement("div");
    productObj.classList.add("product");

    //assign variables
    productObj.name = name;
    var pquality = quality;          // first use of quality creates custom property
    var pprice = price;                  // create custom property price
    productObj.addinfo = addinfo;
    var pimg = img;

    // set Name
    productObj.setName = function (newName) {
        productObj.name = newName;
        display();
    }
    // set Quality
    productObj.changeQuality = function (newQuality) {
        if (newQuality!="") {
            console.log("Changing Quality to: " + newQuality);
            newQuality = "Quality was " + pquality + ", New Quality is: " + newQuality;
            pquality = newQuality;
            display();
        }
    }
    // change Price by a factor of 10
    productObj.changePrice = function (changeRate) {
        var cr = Number(changeRate);
        console.log("changing price by this rate " + cr);
        pprice = pprice * (1 + cr);
        display(); // show updated price on the page
    };
    // set Additional Info
    productObj.setAddInfo = function (newAddInfo) {
        productObj.addinfo = newAddInfo;
        display();
    }
   
    productObj.innerHTML = `
      <div class='productInfoClass'></div>
      <button class='nameButtonClass'>Change Name to: </button>
      <input class='newNameInputClass'/> <br/>
      <button class='qualityButtonClass'>Change Quality to: </button>
      <input class='newQualityInputClass'/> <br/>
      <button class='priceButtonClass'>Change Price By Factor: </button>
      <input class='priceFactorInputClass'/>
      <button class='addInfoButtonClass'>Change Info to: </button>
      <input class='newAddInfoInputClass'/> <br/>
    `;

    // Create variable references for all DOM elements (above) that we need to programatically access. 
    var productInfo = productObj.getElementsByClassName("productInfoClass")[0];
    var nameButton = productObj.getElementsByClassName("nameButtonClass")[0];
    var newNameInput = productObj.getElementsByClassName("newNameInputClass")[0];
    var qualityButton = productObj.getElementsByClassName("qualityButtonClass")[0];
    var newQualityInput = productObj.getElementsByClassName("newQualityInputClass")[0];
    var priceButton = productObj.getElementsByClassName("priceButtonClass")[0];
    var priceFactor = productObj.getElementsByClassName("priceFactorInputClass")[0];
    var addInfoButton = productObj.getElementsByClassName("addInfoButtonClass")[0];
    var newAddInfoInput = productObj.getElementsByClassName("newAddInfoInputClass")[0];

    // create custom private method display
    // make the current properties visible on the page - including the image
    var display = function () {
        productInfo.innerHTML = ` ${productObj.name}
            <br/>Quality: ${pquality}
            <br/>Price: ${formatCurrency(pprice)}
            <br/>Additional Information: ${productObj.addinfo}`;
    };
    var productImage = document.createElement("img");
    productImage.src = pimg;
    productObj.appendChild(productImage);

    productObj.log = function () {
        console.log("Quality of product with name " + productObj.name + " is " + pquality + " and price is $" + pprice);
    };

    // private function, can only be used within MakeProduct
    function formatCurrency(num) {
        return num.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
    }
    display();

    nameButton.onclick = function () {
        productObj.setName(newNameInput.value);
    };

    qualityButton.onclick = function () {
        productObj.changeQuality(newQualityInput.value);
    };

    priceButton.onclick = function () {
        productObj.changePrice(priceFactor.value);
    };

    addInfoButton.onclick = function () {
        productObj.setAddInfo(newAddInfoInput.value);
    };

    return productObj;
}