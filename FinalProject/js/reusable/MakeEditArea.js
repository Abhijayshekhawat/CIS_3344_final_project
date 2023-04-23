"use strict";
function MakeEditArea({ inputSpecs, successCallBack, cancelCallBack, editObj, title = "Untitled" }) {
    var textSpecs = [];
    var radioSpecs = [];
    var selectSpecs = [];
    for (var i = 0; i < inputSpecs.length; i++) {
        if (inputSpecs[i].inputType === "Input") {
            textSpecs.push(inputSpecs[i]);
        } else if (inputSpecs[i].inputType === "radio") {
            radioSpecs.push(inputSpecs[i]);
        } else if (inputSpecs[i].inputType === "selectList") {
            selectSpecs.push(inputSpecs[i]);
        }
    }

    // defensive (provider style) programming. First check if params has everything we need...
    if (!inputSpecs || !inputSpecs[0]) {
        var errorMsg = "MakeEditArea did not receive a parameter property named 'inputSpecs'\n" +
            "that has at least one object (that defines one input field).";
        alert(errorMsg); // this would generally be a programmer error, not user error
        throw errorMsg;
        return;
    }
    var inputSpecs = inputSpecs;

    if (!successCallBack || !(successCallBack instanceof Function)) {
        var errorMsg = "MakeEditArea did not receive a parameter property named 'successCallBack',\n" +
            "a Consumer function that will be called (passing an object full of user entered data)\n" +
            "if the user clicks 'Submit' and all the inputs validate.";
        alert(errorMsg); // this would generally be a programmer error, not user error
        throw errorMsg;
        return;
    }
    var successCallBack = successCallBack;

    if (!cancelCallBack || !(cancelCallBack instanceof Function)) {
        var errorMsg = "MakeEditArea did not receive a parameter property named 'cancelCallBack',\n" +
            "a Consumer function that will be called if the user clicks 'Cancel'.\n" +
            "(no input will be passed to the cancel call back function).";
        alert(errorMsg); // this would generally be a programmer error, not user error
        throw errorMsg;
        return;
    }
    var cancelCallBack = cancelCallBack;

    var editDiv = MakeTag({
        htmlTag: "div",
        cssClass: "editArea"
    }); // MakeTag inputs: { htmlTag, innerHTML, src, type, name, value, cssClass, parent }

    var componentTitle = MakeTag({
        htmlTag: "h2",
        innerHTML: title,
        parent: editDiv
    })
    for (var spec of textSpecs) {
        var rowDiv = MakeTag({
            htmlTag: "div",
            parent: editDiv,
            cssClass: "row"
        });
        MakeTag({// dont need a reference to this span tag.
            htmlTag: "span",
            cssClass: "prompt",
            innerHTML: spec.prompt,
            parent: rowDiv
        });
        spec.inputTag = MakeTag({
            htmlTag: "input",
            parent: rowDiv
        });

        // Pre-populate the input tags of the edit area with editObj values (if editObj was supplied). 
        if (editObj) {
            spec.inputTag.value = editObj[spec.fieldName];
        }
        spec.errorMsg = MakeTag({
            htmlTag: "span",
            cssClass: "error",
            innerHTML: "&nbsp;", // a blank, keeps it's space vertically
            parent: rowDiv
        });
    }
    for (var spe of radioSpecs) {
        var choices = spe.choices;
        var radioSelected = spe.selected;
        var rowDiv = MakeTag({
            htmlTag: "div",
            parent: editDiv,
            cssClass: "row"
        });
        var frm = MakeTag({
            htmlTag: "form",
            parent: rowDiv,
            cssClass: "radioForm"
        });
        prompt = spe.prompt || "Unknown prompt";
        MakeTag({
            htmlTag: "span",
            innerHTML: prompt,
            parent: frm,
            cssClass: "prompt"
        });
        if (!choices || !choices[0]) {
            alert("MakeRadio needs a parameter object with a 'choices' property (an array of choices)");
            return frm;
        }
        // "for .. of" is easier way to iterate over an array -- you don't have to use index i.
        // choice represents choices[i] if you had used an index value. 
        for (var choice of choices) {

            // each option of the radio button will be in a new paragraph (new line)
            var para = MakeTag({
                htmlTag: "p",
                parent: frm
            });
            // in the paragraph will be the little circle (which is the radio button option)
            var option = MakeTag({
                htmlTag: "input",
                type: "radio",
                name: "radName", // doesnt matter what this is (but must match code option onclick below)
                value: choice,
                parent: para,
                cssClass: "radio"
            });

            // after the radio button option (the little circle), put a label for the choice
            MakeTag({
                htmlTag: "span", // span is like div (a container) but doesnt start/end on new line.
                innerHTML: choice,
                parent: para,
                cssClass: "radioChoice"
            });

            if (radioSelected == choice) {
                option.checked = true;
                frm.value = choice;
            }

            // whenever the user clicks on one of the radio button option, set the a public "value" 
            // property of radio button component (the form which is the DOM element returned by this Make function)
            option.onclick = function () {
                frm.value = frm.radName.value;
            };
        }
        spe.errorMsg = MakeTag({
            htmlTag: "span",
            cssClass: "error",
            innerHTML: "&nbsp;", // a blank, keeps it's space vertically
            parent: rowDiv
        });
    }
    for (var sp of selectSpecs) {
        var sListSelected = sp.selected;
        var rowDiv = MakeTag({
            htmlTag: "div",
            parent: editDiv,
            cssClass: "row"
        });
        MakeTag({// dont need a reference to this span tag.
            htmlTag: "span",
            cssClass: "prompt",
            innerHTML: sp.prompt,
            parent: rowDiv
        });
        var selectList = MakeTag({
            htmlTag: "select",
            parent: rowDiv,
            name: sp.fieldName,
            parent: rowDiv,
            cssClass: "select"
        })
        for (var choice of sp.choices) {
            var sOption = MakeTag({
                htmlTag: "option",
                value: choice,
                innerHTML: choice,
                parent: selectList
            });
            if (choice === sListSelected) {
                sOption.selected = true;
            }
        }
        sp.errorMsg = MakeTag({
            htmlTag: "span",
            cssClass: "error",
            innerHTML: "&nbsp;", // a blank, keeps it's space vertically
            parent: rowDiv
        });
    }
    var submitButton = MakeTag({
        htmlTag: "button",
        innerHTML: "Submit",
        parent: editDiv
    });

    var cancelButton = MakeTag({
        htmlTag: "button",
        innerHTML: "Cancel",
        parent: editDiv
    });

    editDiv.recordLevelMsg = MakeTag({
        htmlTag: "span",
        cssClass: "recLevelMsg",
        parent: editDiv
    });


    submitButton.onclick = function () {
        var allGood = true;
        for (var spec of textSpecs) {
            var dType = spec.dataType;
            console.log("Data type is " + dType);
            if ((spec.minLen > 0) || (spec.inputTag.value.length > 0)) {
                if (dType == "integer") {
                    if (isNaN(spec.inputTag.value)) {
                        spec.errorMsg.innerHTML = "Error. You did not enter an Integer.";
                        allGood = false;
                    } else if (spec.inputTag.value % 1 > 0) {
                        spec.errorMsg.innerHTML = "Error, entered number. You did not enter an Integer.";
                        allGood = false;
                    } else if (spec.inputTag.value < spec.minVal) {
                        let x = spec.minVal - spec.inputTag.value;
                        spec.errorMsg.innerHTML = " Error: Input is under the limit by " + x + ". Min Value: " + spec.minVal;
                        allGood = false;
                    } else if (spec.inputTag.value > spec.maxVal) {
                        let x = spec.inputTag.value - spec.maxVal;
                        spec.errorMsg.innerHTML = " Error: Input is over the limit by " + x + ". Max Value: " + spec.maxVal;
                        allGood = false;
                    } else {
                        spec.errorMsg.innerHTML = "&nbsp;";
                    }
                } else if (dType == "number") {
                    if (isNaN(spec.inputTag.value)) {
                        spec.errorMsg.innerHTML = "Error. You did not enter a number.";
                        allGood = false;
                    } else if (spec.inputTag.value < spec.minVal) {
                        let x = spec.minVal - spec.inputTag.value;
                        spec.errorMsg.innerHTML = " Error: Input is under the limit by " + x + ". Min Value: " + spec.minVal;
                        allGood = false;
                    } else if (spec.inputTag.value > spec.maxVal) {
                        let x = spec.inputTag.value - spec.maxVal;
                        spec.errorMsg.innerHTML = " Error: Input is over the limit by " + x + ". Max Value: " + spec.maxVal;
                        allGood = false;
                    } else {
                        spec.errorMsg.innerHTML = "&nbsp;";
                    }
                } else if (dType == "integerRange") {
                    if (isNaN(spec.inputTag.value)) {
                        spec.errorMsg.innerHTML = "Error. You did not enter an integer.";
                        allGood = false;
                    } else if (spec.inputTag.value % 1 > 0) {
                        spec.errorMsg.innerHTML = "Error, entered number. You did not enter an Integer.";
                        allGood = false;
                    } else if (spec.inputTag.value < spec.minVal) {
                        let x = spec.minVal - spec.inputTag.value;
                        spec.errorMsg.innerHTML = " Error: Input is under the limit by " + x + ". Min Value: " + spec.minVal;
                        allGood = false;
                    } else if (spec.inputTag.value > spec.maxVal) {
                        let x = spec.inputTag.value - spec.maxVal;
                        spec.errorMsg.innerHTML = " Error: Input is over the limit by " + x + ". Max Value: " + spec.maxVal;
                        allGood = false;
                    } else {
                        spec.errorMsg.innerHTML = "&nbsp;";
                    }
                } else if (dType == "date") {
                    try {
                        var dateVal = new Date(spec.inputTag.value).toISOString();
                        spec.errorMsg.innerHTML = "&nbsp;";
                    } catch (e) {
                        spec.errorMsg.innerHTML = "Error. You did not enter a valid date.";
                        allGood = false;
                    }
                } else if (spec.inputTag.value.length < spec.minLen) {
                    let x = spec.minLen - spec.inputTag.value.length;
                    spec.errorMsg.innerHTML = " Error: Input is under the limit by " + x + ". Min Characters: " + spec.minLen;
                    allGood = false;
                } else if (spec.inputTag.value.length > spec.maxLen) {
                    let x = spec.inputTag.value.length - spec.maxLen;
                    spec.errorMsg.innerHTML = " Error: Input is over the limit. Characters over the limit are: " + spec.inputTag.value.substring(spec.maxLen,spec.maxLen+6) +"...";
                    allGood = false;
                } else {
                    spec.errorMsg.innerHTML = "&nbsp;";
                }
            }
        }

        if (!allGood) {
            editDiv.recordLevelMsg.innerHTML = "Please Try Again";
            return;
        }

        // Build object full of user data to pass to the success call back function
        editDiv.recordLevelMsg.innerHTML = "Data Accepted !";

        var inputVals = {};
        var radioVals = {};
        var selectVals = {};
        for (var spec of textSpecs) {
            for (var z = 0; z < textSpecs.length; z++) {
                inputVals[spec.fieldName] = spec.inputTag.value;
            }
        }
        for (var spe of radioSpecs) {
            for (var z = 0; z < radioSpecs.length; z++) {
                radioVals[spe.fieldName] = frm.value;
            }
        }
        for (var sp of selectSpecs) {
            for (var z = 0; z < selectSpecs.length; z++) {
                selectVals[sp.fieldName] = selectList.value;
                console.log("Hello" + selectList.value);
            }
        }
        console.log(selectVals);
        var allVals = { ...inputVals, ...radioVals, ...selectVals };
        successCallBack(allVals);

    };

    function clearAll() {
        // Blank out all input tags and also the record level message.
        for (var spec of textSpecs) {
            spec.inputTag.value = "";
        }
        for (var spe of radioSpecs) {
            for (var choice of choices) {
                if (radioSelected == choice) {
                    option.checked = true;
                } else {
                    option.checked = false;
                }
            }
        }
        for (var sp of selectSpecs) {
            for (var choice of sp.choices) {
                if (choice === sListSelected) {
                    sOption.selected = true;
                }
            }
        }
        editDiv.recordLevelMsg.innerHTML = "";
    }

    cancelButton.onclick = function () {
        // Since the user is cancelling, clear out all inputs and record level msg. 
        clearAll();

        // inform the consumer that the user cancelled (let them do what they want about that). 
        cancelCallBack(title);
    };
    editDiv.recordLevelMsg = MakeTag({
        htmlTag: "span",
        cssClass: "recLevelMsg",
        parent: editDiv
    });
    return editDiv;
}
