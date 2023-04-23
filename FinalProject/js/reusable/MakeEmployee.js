function MakeEmployee(params) {
    var employee = {};
    employee.img = params.img || "https://thumbs.dreamstime.com/z/funny-error-message-162331961.jpg";
    employee.name = params.name || "Name is Missing";
    employee.title = params.title || "Title is Missing";
    var ele = document.createElement("div");
    ele.classList.add("employee");
    var myImage = document.createElement("img");
    myImage.src = employee.img;
    ele.appendChild(myImage);
    var myPara = document.createElement("h3");
    myPara.innerHTML = employee.name;
    ele.appendChild(myPara);
    var myHeading = document.createElement("h4");
    myHeading.innerHTML = employee.title;
    ele.appendChild(myHeading);
    myPara.onclick = function () {
        myPara.innerHTML = employee.name.split('').sort(function () { return 0.5 - Math.random() }).join('');
    }
    return ele;
}