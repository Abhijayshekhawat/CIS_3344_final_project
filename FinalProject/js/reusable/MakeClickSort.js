// This version of MakeTable expects objList to hold an array of objects 
// in which all the properties are already "td" tags which may contain images, 
// alignment, etc. 
function MakeClickSort({ title = "Unknown Title", objList = {}, sortOrderPropName = "Name", sortIcon = "icons/csboth.png", numProps1stMobileCol = 2 }) {
    var sortType = "ascending";
    function isToShow(obj, searchKey) {

        // show the object if searchKey is empty
        if (!searchKey || searchKey.length === 0) {
            return true;
        }

        // convert search key to upper case (will convert values also to upper case before comparing).
        var searchKeyUpper = searchKey.toUpperCase();

        for (var prop in obj) {

            // Do not try to find a match for Table cells that hold images. 
            if (!obj[prop].innerHTML.includes("_")) {

                // pull out the innerHTML because all properties of obj are actually <td> tags, not just text.
                var propVal = obj[prop].innerHTML; // associative array, using property name as if index. 
                var propValUpper = propVal.toUpperCase(); // convert to upper case to match searchKey.

                console.log("checking if " + searchKeyUpper + " is in " + propValUpper);

                if (propValUpper.includes(searchKeyUpper)) {
                    console.log("Yes it is inside");
                    return true;
                }
            } // excluding image tds
        }
        console.log("no it is not inside");
        return false;
    } // isToShow 
    function jsSort(objList, byProperty) {

        if (!objList || !objList[0]) {
            var message = "Cannot sort. Need an objList with at least one object";
            console.log(message);
            alert(message);
            return;  // early return -- dont try to sort.
        }

        var obj = objList[0];
        if (!obj[byProperty]) {
            var message = "objList does not have property " + byProperty + " -- cannot sort by that property.";
            console.log(message);
            alert(message);
            return;  // early return -- dont try to sort.
        }

        if (!('sortOrder' in obj[byProperty])) {
            var message = "Cannot sort objList by property " + byProperty +
                " because this property never had it's sortOrder set (by a method in SortableTableUtils.js).";
            console.log(message);
            alert(message);
            return;  // early return -- dont try to sort.
        }
        objList.sort(function (q, z) {  // in line (and anonymous) def'n of fn to compare list elements. 
            // the function you create is supposed to return positive (if first bigger), 0 if equal, negative otherwise.

            // using JS associative array notation, extract the 'byProperty' property from the two
            // list elements so you can compare them.
            var qVal = q[byProperty].sortOrder;
            var zVal = z[byProperty].sortOrder;


            var c = 0;
            if (sortType === "ascending") {
                if (qVal > zVal) {
                    c = 1;
                } else if (qVal < zVal) {
                    c = -1;
                }
                console.log("comparing " + qVal + " to " + zVal + " is " + c);
                return c;
            } else {
                if (qVal > zVal) {
                    c = -1;
                } else if (qVal < zVal) {
                    c = 1;
                }
                console.log("comparing " + qVal + " to " + zVal + " is " + c);
                return c;
            }
        });
    }
    function MakeHeaderRow(obj, numProps1stMobileCol, sortIcon) {
        var headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th class="identHeaderC mobCell">
            </th>
            <th class="infoHeaderC mobCell">
            </th>
        `;

        // These first two <th>s will be visible only in Mobile. They will hold 
        // the property names vertically (part in the 1st, the rest in the 2nd).
        var identHeader = headerRow.getElementsByClassName("identHeaderC")[0];
        var infoHeader = headerRow.getElementsByClassName("infoHeaderC")[0];

        var j = 0;
        // The rest of these headers will show only in desktop
        // iterate through the properties in the first object in the object list.

        for (let propName in obj) {

            let fldNameHdrMobile = document.createElement("p");
            fldNameHdrMobile.innerHTML = propName;

            fldNameHdrMobile.onclick = function () {
                if (sortType === "ascending") {
                    console.log("WILL SORT ON " + propName);
                    addTableBody(newTable, objList, propName);
                    (sortType === "ascending") ? (sortType = "descending") : (sortType = "ascending")

                } else {
                    console.log("WILL SORT ON " + propName);
                    addTableBody(newTable, objList, propName);
                    (sortType === "ascending") ? (sortType = "descending") : (sortType = "ascending")
                }
            };
            // each property name is added to one of two mobile header cells
            if (j < numProps1stMobileCol) {
                identHeader.appendChild(fldNameHdrMobile);
            } else {
                infoHeader.appendChild(fldNameHdrMobile);
            }
            j++;

            // each property name is also added to a desktop header cell.
            let headingCell = document.createElement("th");
            var headingText = propName.replace("_", " ");
            var temp = headingText;

            // if a property name starts with underscore then we assume that column should not 
            // be click sortable (maybe it is an image column).
            if ((propName[0] !== "_") && (!propName.toUpperCase().includes("IMAGE"))) {

                headingCell.onclick = function () {
                    if (sortType === "ascending") {
                        sortIcon = "icons/csup.png";
                        headingText = "";
                        headingText = `<img src='${sortIcon}'width="15"px/> ${propName}`;
                        headingCell.innerHTML = headingText;
                        console.log("WILL SORT ON " + propName);
                        addTableBody(newTable, objList, propName);
                        (sortType === "ascending") ? (sortType = "descending") : (sortType = "ascending")

                    } else {
                        sortIcon = "icons/csdown.png";
                        headingText = "";
                        headingText = `<img src='${sortIcon} 'width= "15px"/> ${propName}`;
                        headingCell.innerHTML = headingText;
                        console.log("WILL SORT ON " + propName);
                        addTableBody(newTable, objList, propName);
                        (sortType === "ascending") ? (sortType = "descending") : (sortType = "ascending")
                    }
                };

                if (propName.toUpperCase().includes("IMAGE")) {
                    headingText = headingText;
                } else {
                    headingText = "<img src='" + sortIcon + "'width='" + "20px" + "' /> " + headingText;
                }
                //headingCell.sortPropName = propName;

            }
            headingCell.innerHTML = headingText;
            headingCell.classList.add("deskCell");
            headerRow.appendChild(headingCell);
        }

        return headerRow;
    } // MakeHeaderRow
    function addTableBody(table, list, sortOrderPropName, filterValue) {

        // remove old tbody element if there is one (else you'll get the new sorted rows 
        // added to end of what's there).
        var oldBody = table.getElementsByTagName("tbody");
        if (oldBody[0]) {
            console.log("ready to remove oldBody");
            table.removeChild(oldBody[0]);
        }

        jsSort(list, sortOrderPropName);

        // Add one row (to HTML table) per element in the array.
        // Each array element has a list of properties that will become 
        // td elements (Table Data, a cell) in the HTML table. 
        var tableBody = document.createElement("tbody");
        table.appendChild(tableBody);
        
        //for (var obj of objList) {
        //    tableBody.appendChild(MakeDataRow(obj, numProps1stMobileCol));
        //}

        // To the tbody, add one row (to HTML table) per object in the object list.
        // To each row, add a td element (Table Data, a cell) that holds the object's 
        // property values. 
        for (var i in objList) {
            if (isToShow(objList[i], filterValue)) {
                var obj = objList[i];
                tableBody.appendChild(MakeDataRow(obj, numProps1stMobileCol));
                /*//tableBody.appendChild(MakeDataRow(obj, numProps1stMobileCol));
                var tableRow = document.createElement("tr");
                tableBody.appendChild(tableRow);

                // create one table data <td> content matching the property name
                var obj = objList[i];
                //tableBody.appendChild(MakeDataRow(obj, numProps1stMobileCol));
                for (var prop in obj) {

                //    // **** THE ONLY CHANGE IS HERE ****
                //    // obj[prop] should already hold a "td" tag
                    //tableRow.appendChild(MakeDataRow(obj, numProps1stMobileCol));
                    tableRow.appendChild(obj[prop]);
                //    // **** END OF THE CHANGE       ****
                }*/
            }
        }
        
    } // addTableBody


    // Create a <tr> then add all the (<td>) properties of obj to that <tr>
    function MakeDataRow(obj, numProps1stMobileCol) {

        var dataRow = document.createElement("tr");
        // For responsive design, add the first columns that will show values 
        // (vertically) only in mobile.
        dataRow.innerHTML = `
          <td class="mobCell identColC">
          </td>
          <td class="mobCell infoColC">
          </td>
        `;
        var identCol = dataRow.getElementsByClassName("identColC")[0];
        var infoCol = dataRow.getElementsByClassName("infoColC")[0];
        // The rest of the <td>s will show horizontally, only in desktop.

        var i = 0;
        for (var prop in obj) {

            // The innerHTML of each <td> (property of obj) gets added to one of 
            // the first two mobile columns (added vertically with new lines between)
            if (i < 1) {
                identCol.innerHTML += obj[prop].innerHTML;
            } else if (i < numProps1stMobileCol) {
                identCol.innerHTML += "<br/>" + obj[prop].innerHTML;
            } else if (i === numProps1stMobileCol) {
                infoCol.innerHTML += obj[prop].innerHTML;
            } else {
                infoCol.innerHTML += "<br/>" + obj[prop].innerHTML;
            }
            i++;
            // These same <td>s (of obj) will be added to desktop columns 
            // and will show horizontally. 
            dataRow.appendChild(obj[prop]);
            // style this cell to show only in desktop.
            obj[prop].classList.add("deskCell");
        }
        return dataRow;
    } // MakeDataRow


    // ***************** Entry Point ************************
    console.log("objList on next line");
    console.log(objList);

    // Create a container to hold the HTML table
    var container = document.createElement("div");
    container.classList.add("clickSort");

    // Add a heading (for the title) and add that to the container
    var heading = document.createElement("h2");
    heading.innerHTML = title;
    container.appendChild(heading);

    // create an area (between title and html table) where the user 
    // can enter their search criteria.
    var searchDiv = document.createElement("div");
    container.appendChild(searchDiv);
    searchDiv.innerHTML = "Filter: ";

    // Create a filter text box for user input and append it.
    var searchInput = document.createElement("input");
    searchDiv.appendChild(searchInput);

    var newTable = document.createElement("table");
    container.appendChild(newTable);

    // use the first object's property names as column headings.
    newTable.appendChild(MakeHeaderRow(objList[0], numProps1stMobileCol, sortIcon));

    var tableBody = document.createElement("tbody");
    newTable.appendChild(tableBody);

    // To the HTML table's <tbody>, add one <tr> (table row) per object 
    // from objList. 
    for (var obj of objList) {
        tableBody.appendChild(MakeDataRow(obj, numProps1stMobileCol));
    }
    searchInput.onkeyup = function () {
        console.log("search filter changed to " + searchInput.value);
        addTableBody(newTable, objList, sortOrderPropName, searchInput.value);
    };

    return container;
}  // MakeTableBetter