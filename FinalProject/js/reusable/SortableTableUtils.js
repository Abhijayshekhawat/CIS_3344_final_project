"use strict";

/* 
 * ------------------------- SortableTableUtils --------------------------------------
 * 
 * All the public methods of SortableTableUtils return an HTML "td" tag (table data), 
 * formatted and aligned nicely, depending on the type of data being passed in.
 * 
 */

var SortableTableUtils = {};

SortableTableUtils.makeText = function (text) {
        var tableData = document.createElement('td');
        text = text || ""; // set it to empty string if the input parameter does not exist
        if (text === "") {
            tableData.sortOrder = -1;  // put empty entries at top if sorting by this column
        } else {
            tableData.sortOrder = text.toUpperCase();
        }
        tableData.innerHTML = text;
        tableData.style.textAlign = "left"; // text elements usually align left

        return tableData;
};

SortableTableUtils.makeNumber = function (num, isFormatCurrency) {
        var tableData = document.createElement('td');

        if (!num) { // empty data
            num = "";
            tableData.sortOrder = -1; // put empty entries at top if sorting by this column

        } else { // non empty data

            var tmp = num + ""; // tmp will be num but converted to string.

            // In case the number is already formatted, remove the formatting characters.
            tmp = tmp.replace(" ", "");
            tmp = tmp.replace(",", "");
            tmp = tmp.replace("$", "");

            if (isNaN(tmp)) { // non numeric data
                tableData.sortOrder = -1; // put invalid entries at top if sorting by this column
                num = "Not numeric " + num; // preserve the original data when added this error msg.
            } else { // numeric data
                var convertedNum = Number(tmp);
                tableData.sortOrder = convertedNum; // put empty entries at top if sorting by this column
                if (isFormatCurrency) {
                    num = convertedNum.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
                }
            }
        }

        tableData.innerHTML = num;
        tableData.style.textAlign = "right"; // text elements usually align left
        return tableData;
};

// Create a multiplyer that converts days to milliseconds
// OR can divide by this to convert from milliseconds to days.
//   days * 24 => hours
//   hours * 60 => minutes
//   minutes * 60 => seconds
//   seconds * 1000 => milliseconds.
const daysToMilliSecs = 24 * 60 * 60 * 1000;

// Specify the number of days from Jan 1, 0000 to Jan 1, 1970. 
// Add in an extra day every 4 years to account for leap years. 
const daysTo1970 = 1970 * 365 + Math.floor(1970 / 4);

SortableTableUtils.makeDate = function (dateString) {
        var tableData = document.createElement('td');

        if (!dateString) { // empty data
            dateString = "";
            tableData.sortOrder = -1; // put empty entries at top if sorting by this column

        } else { // check if it's a date

            var milliSecsFrom1970 = Date.parse(dateString);
            if (isNaN(dateString) && !isNaN(milliSecsFrom1970)) {
                //console.log(dateString + " is a Date ");

                var daysFrom1970 = milliSecsFrom1970 / (daysToMilliSecs);

                var daysFrom0000 = daysFrom1970 + daysTo1970;

                tableData.sortOrder = daysFrom0000;
            } else {
                tableData.sortOrder = -1; // put invalid entries at top if sorting by this column
                dateString = "Not a Date " + dateString;
            }
        }

        tableData.innerHTML = dateString;
        tableData.style.textAlign = "center"; // center the dates
        return tableData;
};

SortableTableUtils.makeImage = function (imageFileName, width) {

    var tableData = document.createElement('td');
    var img = document.createElement("img");
    if (imageFileName && imageFileName !== "") {
        img.src = imageFileName;
    }
    img.style.width = width;

    tableData.appendChild(img);
    tableData.style.textAlign = "center"; // center the images 
    tableData.sortOrder = null; // should not be sorting on image columns
    return tableData;
};