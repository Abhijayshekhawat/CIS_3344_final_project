"use strict";
function MakeSlideShow(slideShowObject) { //accepts a single input parameter
    var picList = slideShowObject[0].data;
    console.log(picList);

    if (!picList[0].image || !picList[0].caption) { //Throws a message if required properties(image and caption) are not provided
        throw ("MakeSlideShow expects an array of objects, each having an 'image' and a 'caption' property");
    }
    var slideStyle = slideShowObject[0].style || "slideShow"; //setting default value of optional properties.
    var titleValue = slideShowObject[0].slideTitle || "Missing Title";

    var slideShow = document.createElement("div");
    slideShow.classList.add(slideStyle);

    var title = document.createElement("div");
    title.innerHTML = titleValue;
    slideShow.appendChild(title);

    // add a div that will hold the image
    var div = document.createElement("div");
    slideShow.appendChild(div);

    // add image into the div & set the image's src attribute to show picture
    var myImage = document.createElement("img");
    div.append(myImage);


    var captionDiv = document.createElement("div");
    captionDiv.classList.add("caption");
    slideShow.appendChild(captionDiv);


    var buttonDiv = document.createElement("div");
    slideShow.appendChild(buttonDiv);

    var numberDiv = document.createElement("div");
    slideShow.appendChild(numberDiv);

    // add back button under the image (and empty paragraph)
    var backButton = document.createElement("button");
    backButton.innerHTML = " &lt; ";
    buttonDiv.appendChild(backButton);

    // add forward button under the image (and empty paragraph)
    var fwdButton = document.createElement("button");
    fwdButton.innerHTML = " &gt; ";
    buttonDiv.appendChild(fwdButton);

    // private variable that keeps track of which image is showing
    var picNum = 0;
    setPic();

    function setPic() {
        myImage.src = picList[picNum].image;
        captionDiv.innerHTML = picList[picNum].caption;
    }

    function setNumber() {
        numberDiv.innerHTML = picNum + 1 + " / " + picList.length;
    }

    var position = ""
    function setPosition() {
        captionDiv.style.textAlign = position;
    }

    // Advance to next image in the picture list
    function nextPic() {

        if (picNum < picList.length - 1) {
            picNum++;
        }
        setPic();
        setNumber();
    }

    // Go to the previous image in the picture list
    function prevPic() {

        if (picNum > 0) {
            picNum--;
        }
        setPic();
        setNumber();
    }

    // add next and previous funcionality to next and previous buttons
    backButton.onclick = prevPic;
    fwdButton.onclick = nextPic;


    slideShow.setPicNum = function (newNum) {
        if ((newNum >= 0) && (newNum < picList.length)) {
            picNum = newNum;
            // change the src attribute of the image element to the desired new image)				
            setPic();
            setNumber();
        }
    };

    slideShow.setCaptionPosition = function (newPosition) {
        position = newPosition;
        setPosition();
    }
    return slideShow;
}