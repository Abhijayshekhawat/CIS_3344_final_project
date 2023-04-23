function homeContent () {

// ` this is a "back tick". You can use it to define multi-line strings in JavaScript.
// 
// NetBeans menu option "Source - Format" will not work with the text inside of a 
// String, so you have to do this indentation manually with the editor. 

var content = `
        <h3>The only application for all your stock control needs!</h3>
        <p>
            We think you'll agree our application has tons of useful features: add inventory, record sales.
            Inventory management software that gives you complete control of your entire inventory-tracking stock accurately no matter how many sales channels or warehouses you operate.
        </p>
        <p>
            Our Application is the only free online inventory system that won't limit the number of items, locations and users you need to run your small business.
            There's a reason thousands of global and local businesses have made our application their choice for online inventory management.
            <a href="https://www.ogl.co.uk/why-is-stock-control-important-to-a-business#:~:text=The%20purpose%20of%20stock%20control,and%20cover%20any%20unforeseen%20issues.">Click this link to find out why stock control important to a business operation. </a>
        <p>
            THOUSANDS OF SMALL BUSINESSES COUNT ON US FOR INVENTORY MANAGEMENT
            &nbsp;
            <img style=width:85%; src="pics/smallb.png" alt="Small Businesses">
        </p>`;
        var ele = document.createElement("div");
        ele.innerHTML = content;
        return ele;
        }