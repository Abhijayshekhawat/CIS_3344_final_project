const AjaxProductTable = () => {

    console.log("AjaxProductTable running");

    // Tell React that items array is something that
    // (when changed) should redisplay the ListComponent.
    // Set items initial value to [].
    const [items, setItems] = React.useState([]);

    // Tell React that if "error" changes, redisplay this 
    // ListComponent. Set initial value of error to null.
    const [error, setError] = React.useState(null);

    // useEffect 2nd parameter is an array of elements that 
    // (if they change) should trigger the function specified 
    // as the 1st useEffect parameter.
    // This pattern (having an empty array as 2nd parameter) is 
    // how you get React to do something once (like call ajax_alt). 
    React.useEffect(() => {
        ajax_alt("json/products.json",
            function (productList) {        // success function gets obj already run thru JSON.
                setItems(productList);
                setError("");
            },
            function (msg) {   // failure message gets error message
                setError(msg);
            }
        );
    }, []);


    const ProductTable = ({ list, heading }) => {
        return (
            <div className="clickSort">
                <h2>{heading}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th className="textAlignCenter">Image</th>
                            <th className="textAlignRight">Cost</th>
                            <th className="textAlignCenter">Release Date</th>
                            <th className="textAlignRight">Weight</th>
                            <th className="textAlignRight">Quantity</th>
                            <th className="textAlignCenter">User Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map(listObj =>
                                <tr key={listObj.productID}>
                                    <td>{listObj.productName}</td>
                                    <td className="wideImage textAlignCenter"><img src={listObj.productImage} /></td>
                                    <td className="textAlignRight">${listObj.productCost}</td>
                                    <td className="textAlignCenter">{listObj.productReleaseDate}</td>
                                    <td className="textAlignRight">{listObj.productWeight}</td>
                                    <td className="textAlignRight">{listObj.productQuantity}</td>
                                    <td className="shadowImage textAlignCenter"><img src={listObj.userImage} /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            {error ? <div>Error: {error} </div> : <ProductTable list={items} heading="Products" />}
        </div>
    );
}; // AjaxProductTable


// Sample Car from the JSON file.
/*
    "make": "Audi",
    "image": "pics/audi.png",
    "condition": "fair",
    "price": "21000"
 */