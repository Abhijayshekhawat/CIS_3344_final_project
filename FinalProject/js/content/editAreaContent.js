"use strict";
function editAreaContent() {
    var content = `
        <br/>
        <div class="editArea1"></div>
        <div class="msgArea1"><br/></div>
        <br/>
        <div class="editArea2"></div>
        <div class="msgArea2"><br/></div>
        <br/>
    `;

    var editAreaContainer = document.createElement("div");
    editAreaContainer.innerHTML = content;

    // Get a reference to the two divs into which you want to place
    // slide show components. 
    //var editArea = editAreaContainer.getElementsByClassName("firstDiv")[0];
    //var msgArea = editAreaContainer.getElementsByClassName("secondDiv")[0];

    function footballInputList() {
        var editArea1 = editAreaContainer.getElementsByClassName("editArea1")[0];
        var msgArea1 = editAreaContainer.getElementsByClassName("msgArea1")[0];

        var footballSpecs = [
            {
                "prompt": "Player Name: ",
                "fieldName": "playerName",
                "dataType": "string",
                "minLen": 2,
                "maxLen": 50,
                "inputType": "Input"
            },
            {
                "prompt": "No of Goals: ",
                "fieldName": "goals",
                "dataType": "integer",
                "minLen":0,
                "minVal": 0,
                "maxVal": 1500,
                "inputType": "Input"
            },
            {
                "prompt": "Goals per game: ",
                "fieldName": "goalsPerGame",
                "dataType": "number",
                "minLen": 0,
                "inputType": "Input"
            },
            {
                "prompt": "Date of Birth: ",
                "fieldName": "birthDate",
                "dataType": "date",
                "minLen": 0, // means optional
                "maxLen": 20,
                "inputType": "Input"
            },
            {
                "prompt": "Age: ",
                "fieldName": "playerAge",
                "dataType": "integerRange",
                "minVal": 16,
                "maxVal": 50,
                "minLen": 0, // means optional
                "inputType": "Input"
            },
            {
                "prompt": "Career Status: ",
                "fieldName": "careerStatus",
                "minLen": 0,
                "inputType": "radio",
                "choices": ["Retired", "About to Retire", "Actively Playing"],
                "selected":"About to Retire"
            },
            {
                "prompt": "Position: ",
                "fieldName": "position",
                "minLen": 0,
                "inputType": "selectList",
                "choices": ["Forward", "Midfielder", "Defender", "Goalkeeper"],
                "selected": "Goalkeeper"
            }
        ];
        var editObj1 = {
            "playerName": "Footballer Name",
            "goals": "Number of Goals Scored",
            "goalsPerGame": "The overall Goals per Game Ratio",
            "birthDate": "Player Date of Birth",
            "playerAge": "Age of player",
            "careerStatus": "About to Retire",
            "position": "Goalkeeper"
        };

        function success(inpObj) {
            console.log(inpObj);
            msgArea1.innerHTML += "We will process your request with these values:<br/>";
            for (let propName in inpObj) {
                msgArea1.innerHTML += "&nbsp; &nbsp; " + propName + ": " +
                    inpObj[propName] + "<br/>";
            }
            msgArea1.innerHTML += "<br/>";
        }

        function cancel(title) {
            msgArea1.innerHTML += "Sorry that you decided to cancel the " + title + " entry<br/><br/>";
            msgArea1.innerHTML += "<br/>";
        }

        var component1 = MakeEditArea({
            title: "Football Players",
            inputSpecs: footballSpecs,
            successCallBack: success,
            cancelCallBack: cancel,
            editObj: editObj1
        });
        editArea1.appendChild(component1);
    }
    footballInputList();

    function productInputList() {
        var editArea2 = editAreaContainer.getElementsByClassName("editArea2")[0];
        var msgArea2 = editAreaContainer.getElementsByClassName("msgArea2")[0];

        var productSpecs = [
            {
                "prompt": "Product Name: ",
                "fieldName": "productName",
                "dataType": "string",
                "minLen": 2,
                "maxLen": 50,
                "inputType": "Input"
            },
            {
                "prompt": "Product ID: ",
                "fieldName": "productID",
                "dataType": "integer",
                "minLen": 1,
                "minVal": 100,
                "maxVal": 9999,
                "inputType": "Input"
            },
            {
                "prompt": "Product Cost: ",
                "fieldName": "productCost",
                "dataType": "number",
                "minLen": 0,
                "inputType": "Input"
            },
            {
                "prompt": "Release Date: ",
                "fieldName": "productReleaseDate",
                "dataType": "date",
                "minLen": 0, // means optional
                "maxLen": 20,
                "inputType": "Input"
            },
            {
                "prompt": "Quantity: ",
                "fieldName": "productQuantity",
                "dataType": "integerRange",
                "minVal": 0,
                "maxVal": 100,
                "minLen": 0, // means optional
                "inputType": "Input"
            },
            {
                "prompt": "Product Type: ",
                "fieldName": "productType",
                "minLen": 0,
                "inputType": "radio",
                "choices": ["Poster", "Device", "Electronic"]
            },
            {
                "prompt": "Product Vendor: ",
                "fieldName": "productVendor",
                "minLen": 0,
                "inputType": "selectList",
                "choices": ["Cannon", "Sony", "RedBubble", "Alienware"]
            }
        ];

        function success(inpObj) {
            console.log(inpObj);
            msgArea2.innerHTML += "We will process your request with these values:<br/>";
            for (let propName in inpObj) {
                msgArea2.innerHTML += "&nbsp; &nbsp; " + propName + ": " +
                    inpObj[propName] + "<br/>";
            }
            msgArea2.innerHTML += "<br/>";
        }

        function cancel(title) {
            msgArea2.innerHTML += "Sorry that you decided to cancel the " + title + " entry<br/><br/>";
            msgArea2.innerHTML += "<br/>";
        }

        var component2 = MakeEditArea({
            title: "Products",
            inputSpecs: productSpecs,
            successCallBack: success,
            cancelCallBack: cancel
        });
        editArea2.appendChild(component2);
    }
    productInputList();
    return editAreaContainer;
}