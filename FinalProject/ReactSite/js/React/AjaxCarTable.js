const AjaxCarTable = () => {

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
        ajax_alt("json/cars.json",
            function (carList) {        // success function gets obj already run thru JSON.
                setItems(carList);
                setError("");
            },
            function (msg) {   // failure message gets error message
                setError(msg);
            }
        );
    }, []);


    const CarTable = ({ list }) => {
        return (
            <div className="clickSort">
                <table>
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th className="textAlignCenter">Image</th>
                            <th>Condition</th>
                            <th className="textAlignRight">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map(listObj =>
                                <tr key={listObj.id}>
                                    <td>{listObj.make}</td>
                                    <td className="wideImage textAlignCenter"><img src={listObj.photo} /></td>
                                    <td>{listObj.condition}</td>
                                    <td className="textAlignRight">{listObj.price}</td>
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
            {error ? <div>Error: {error} </div> : <CarTable list={items} />}
        </div>
    );
}; // AjaxCarTable


// Sample Car from the JSON file.
/*
    "make": "Audi",
    "image": "pics/audi.png",
    "condition": "fair",
    "price": "21000"
 */