"use strict";
function blogContent() {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
      <h4>My Blog</h4>
      <h5>Database:</h5>
      <p>
            For my database table, I will choose 'Products'. It will be a table that contains a list of all the products that we have in stock currently and information about them.
            It'll also include some vendor data to be able to link which vendor is supplying us what products and at what price.
            <ul>Table: product
                <li>Primary Key: product_id(integer)</li>
                <li>Unique name: product_name(varchar 50)</li>
                <li>product_cost(integer)</li>
                <li>nullable user optional: product_release_date(date)</li>
                <li>nullable user optional: product_weight(integer)</li>
                <li>product_purchased_on(date)</li>
                <li>product_quantity(integer)</li>
                <li>product_category(varchar 50)</li>
                <li>URL: product_image(varchar 1000)</li>
                <li>foreign key: web_user_id(integer)</li>
            </ul>
        </p>
        <h5>My Web Development Experience:</h5>
        <p>
            My web design experience very basic and so this class was interesting to say the least. I always looked at beautifult websites and wondered how they were made,
            and so getting into the basics and building itself is a lot of fun.
        </p>
        <h5>Module 01: HomePage Homework:</h5>
        <p>
            What I found valuable about this homework and something I immensely enjoyed was the ability to create and develop a website from the start,
            as well as using a real world use case scenario actually helped me see what my code would be doing.
        </p>
        <h5>Module 02: JS UI Homework:</h5>
        <p>
            What I found fun was how cool single page applications were and how they worked, I had always seen them but never knew they were single-page at the time. 
            Something I found a little difficult was merging the styles to come up with the right balance as well as functioning website.
        </p>
        <h5>Module 03: JS Object Homework:</h5>
        <a href="index.html#/product" >My Object</a>
        <p>
            I found the content generating part extremely difficult, there was a moment where I was missing one bracket and no content was loading and I couldnt figure out why,
            because the application was able to run. Being able to use templating was enjoyable as it seemed easier to do it that way.
        </p>
        <h5>Module 04: JS Object List Homework:</h5>
        <a href="index.html#/productList" >My Object List</a>
        <p>
            I found this homework easier than the last, maybe because it builds just a little bit on the last one and there are a lot of examples available. I enjoyed
            the event functions as it allowed me to express some creativity, although a little difficult to implement, I had better ideas, but they did not work.
        </p>
        <h5>Module 05:JS Slideshow/Ajax </h5>
        <a href="index.html#/slideshow" >My SlideShow</a>
        <p>
            I found the module fun. I enjoyed customizing the slideshow and trying to incorporate different ideas into this homework. I found creating the public function quite difficult,
            as I was unsure of what public function to use. I ended up settling on changing the text alignment of the caption.
        </p>
        <h5>Module 06:JS Clicksort/Filter </h5>
        <a href="index.html#/productscs" >My other Click Sort</a> <br/>
        <a href="index.html#/userscs" >My user Click Sort</a>
        <p>
            I found the module quite complicated, I found making the component dynamic a huge challenge especially because I had already implemented
            most of the code at that point. I enjoyed palying around with the clicksort and filter and trying to figure out how to combine both components.
            I am hoping to find something online in order to make the code more efficient as right now it seems like the code is overly complicated and long.
        </p>
        <h5>Module 07:React </h5>
            <a href="/ReactSite/reactIndex.html#/products" >My Other React Table</a> <br/>
            <a href="/ReactSite/reactIndex.html#/filterproducts" >My Other React Filter Table</a>
            <p>
                I found the module quite fun, I am quite enjoying React and find that the tasks I was strugglling with earlier, I am able to do with ease in React. I am 
                looking forward to see what we will be creating next. I did not find anything particularly tough this module.
            </p>
        <h5>Module 08:Input List Component </h5>
            <a href="index.html#/editarea" >My Input List Component</a>
            <p>
                I found it very difficult to access the value of the input tag. I managed to doe everything else successfully but,
                I was struggling with getting the value of the input tag. I however did enjoy the styling part of the homework.
            </p>
        <h5>Self Assessment:</h5>
        <p>
            Overall I'm pleased with how the website and the merging turned out. I hope all future webpages will work as well as this one too.
        </p>
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele;    
}