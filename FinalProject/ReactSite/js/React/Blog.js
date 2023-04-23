function Blog() {
    return (
        <div className="body">
            <h3>My Blog</h3>
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
            <h5>Module 07:React </h5>
            <a href="/ReactSite/reactIndex.html#/products" >My Other React Table</a> <br/>
            <a href="/ReactSite/reactIndex.html#/filterproducts" >My Other React Filter Table</a>
            <p>
                I found the module quite fun, I am quite enjoying React and find that the tasks I was strugglling with earlier, I am able to do with ease in React. I am 
                looking forward to see what we will be creating next. I did not find anything particularly tough this module.
            </p>
            <h5>Self Assessment:</h5>
            <p>
                Overall I'm pleased with how the website and the merging turned out. I hope all future webpages will work as well as this one too.
            </p>
        </div>
    );
}