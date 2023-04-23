"use strict";
function slideShowContent() {

    var content = `
   <style>
        .ssFlex {
            display:flex;
            flex-direction:row;
        }
        .ssFlex .ssHolder {
            width: 33%;
            box-sizing:border-box;
            text-align:center;
        }
        </style>
        <div class="firstDiv ssHolder">
        </div>
        <div class="secondDiv ssHolder">
        </div>
        <div class="thirdDiv ssHolder">
        </div>
`;

    var container = document.createElement("div");
    container.innerHTML = content;
    container.classList.add("ssFlex");

    // Get a reference to the two divs into which you want to place
    // slide show components. 
    var firstDiv = container.getElementsByClassName("firstDiv")[0];
    var secondDiv = container.getElementsByClassName("secondDiv")[0];
    var thirdDiv = container.getElementsByClassName("thirdDiv")[0];

    ajax("js/json/cats.json", processCatList, firstDiv);

    function processCatList(catList) { //All Optional properties supplied

        // MakeSlideShow expects a property called "image", so provide that... 
        for (var i = 0; i < catList.length; i++) {
            catList[i].caption = catList[i].nickname;
            console.log("No: " + i + " " + catList[i].caption + " " + catList[i].image);
        }

        console.log("catList after setting image properties");
        console.log(catList);
        const slideShowObject = [{ data: catList, style: "slideShow", slideTitle: "Cats" }];
        var ss = MakeSlideShow(slideShowObject);
        firstDiv.appendChild(ss);

        // Example showing why you need to get the ss reference, so the HTML page can invoke 
        // any public methods that may be available from the returned slide show object.
        ss.setPicNum(1);
    }

    ajax("js/json/cars.json", processCarList, secondDiv);

    function processCarList(carList) { //All Optional properties supplied

        // MakeSlideShow expects a property called "image", so provide that... 
        for (var i = 0; i < carList.length; i++) {
            carList[i].caption = carList[i].make;
            console.log("No: " + i + " " + carList[i].caption + " " + carList[i].image);
        }

        const slideShowObject = [{ data: carList, style: "slideShow", slideTitle: "Cars" }];
        var ss = MakeSlideShow(slideShowObject);
        secondDiv.appendChild(ss);

        // Example showing why you need to get the ss reference, so the HTML page can invoke 
        // any public methods that may be available from the returned slide show object.
        ss.setPicNum(2);
        ss.setCaptionPosition("right");
    }

    ajax("js/json/waterFun.json", processWaterList, thirdDiv);

    function processWaterList(waterList) { //No Optional properties supplied

        // MakeSlideShow expects a property called "image", so provide that... 
        for (var i = 0; i < waterList.length; i++) {
            waterList[i].caption = waterList[i].item;
            console.log("No: " + i + " " + waterList[i].caption + " " + waterList[i].image);
        }

        const slideShowObject = [{ data: waterList }];
        console.log(slideShowObject[0].data);
        var ss = MakeSlideShow(slideShowObject);
        thirdDiv.appendChild(ss);

        // Example showing why you need to get the ss reference, so the HTML page can invoke 
        // any public methods that may be available from the returned slide show object.
        ss.setPicNum(3);
        ss.setCaptionPosition("left");
    }

    return container;
}