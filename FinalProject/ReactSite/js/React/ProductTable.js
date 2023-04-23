const ProductTable = ({ list, heading }) => {

    console.log("ProductTable invoked");
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

// Sample User from the Product JSON file.
/*
    "productID": "1",
    "productName": "Camera",
    "productImage": "pics/pics_products/camera.jpg",
    "productCost": "1500",
    "productReleaseDate": "11/22/2021",
    "productWeight": "2",
    "productPurchasedOn": "10/05/2022",
    "productQuantity": "15",
    "productType": "Electronic",
    "productVendor": "Cannon Inc",
    "userImage": "http://cis-linux2.temple.edu/~sallyk/pics_users/karl.jpg",
    "userEmail": "karl@gmail.com",
    "webUserId": "349"
 */