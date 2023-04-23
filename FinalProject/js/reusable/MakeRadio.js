

/* Here's an example of the "well formed HTML" for a radio button (like you should
 * see if you right clicked the web page and inpected using the elements tab). The 
 * "name" of all the radio button elements (with a form) must be the same so that 
 * they are bundled into one radio group. 
 * 
 *  Which pizza toppings is your FAVORITE (pick only one)?<br/>
 <input type="radio" name="favTopping" value="Chz" /> Cheeze  <br/>
 <input type="radio" name="favTopping" value="Mush" checked /> Mushrooms <br/>
 <input type="radio" name="favTopping" value="Pep" /> Pepperoni <br/>
 */



// This uses destructuring of input parameter. 
// So, you have to pass it a parameter object that has properties: 
//   prompt, choices (array of choices for the radio button), selected (optional).

function MakeRadio({ prompt, choices, selected }) {

    // MakeTag function input properties:
    //    Required: htmlTag 
    //    Optional: innerHTML, cssClass, src, type, name, value, parent.
    var frm = MakeTag({
        htmlTag: "form",
        cssClass: "radio"
    });
    prompt = prompt || "Unknown prompt";
    MakeTag({
        htmlTag: "span",
        innerHTML: prompt,
        parent: frm
    });

    if (!choices || !choices[0]) {
        alert("MakeRadio needs a parameter object with a 'choices' property (an array of choices)");
        return frm;
    }

    selected = selected || ""; // if not provided, no radio option will be pre-selected

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
            parent: para
        });

        // after the radio button option (the little circle), put a label for the choice
        MakeTag({
            htmlTag: "span", // span is like div (a container) but doesnt start/end on new line.
            innerHTML: choice,
            parent: para
        });

        if (selected === choice) {
            option.checked = true;
            frm.value = choice;
        }

        // whenever the user clicks on one of the radio button option, set the a public "value" 
        // property of radio button component (the form which is the DOM element returned by this Make function)
        option.onclick = function () {
            frm.value = frm.radName.value;
        };

    }

    // to get the selected value of the radio buttton, just access the public data member named "value" 
    // (makes it easier to use along with input elements which already have a public property "value". 

    return frm;
}