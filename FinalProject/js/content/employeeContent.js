function employeeContent() {
    var content = `
        <style>
            p {
                margin-left: 1.5rem;
            }
            .flexContainer {
                display:flex; 
                flex-direction: row;
                background-color: white;
            }
            .flexContainer .employee {
                width: 33%; /* to fit three columns inside the flexContainer */
                box-sizing: border-box; /* makes padding and border counted in the width */
            }
        </style>
    `;
    var ele = document.createElement("div");
    ele.innerHTML = content; // the HTML code specified just above...
    var employeeContainer = document.createElement("div");
    employeeContainer.classList.add('flexContainer'); // see styling in this file, above...
    ele.appendChild(employeeContainer);
    employeeContainer.appendChild(MakeEmployee({ img: "pics/pics_products/elonmusk.jpg", name: "Elon Musk", title: "Manager" }));
    employeeContainer.appendChild(MakeEmployee({ img: "pics/pics_products/stevejobs.jpg", name: "Steve Jobs", title: "CEO" }));
    return ele;
}