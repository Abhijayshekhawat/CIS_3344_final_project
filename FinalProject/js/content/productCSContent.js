function productCSContent() {
    var content = `
        <style>
            p {
                margin-left: 1.5rem;
            }
            .flexContainer {
                display: flex;
                flex-direction: row;
            }
        </style>
    `;
    var ele = document.createElement("div");
    ele.innerHTML = content;
    var flexBox = document.createElement("div");
    flexBox.classList.add('flexContainer');
    ele.appendChild(flexBox);
    ajax("js/json/products.json", processData, document.getElementById("clicksort"));
    function processData(productList) {
        console.log(productList);
        var newProductList = [];
        for (var i = 0; i < productList.length; i++) {
            newProductList[i] = {};
            newProductList[i].Name = SortableTableUtils.makeText(productList[i].productName);
            newProductList[i].Image = SortableTableUtils.makeImage(productList[i].productImage, "15rem");
            newProductList[i].Cost = SortableTableUtils.makeNumber(productList[i].productCost, true);
            newProductList[i].ReleaseDate = SortableTableUtils.makeDate(productList[i].productReleaseDate);
            newProductList[i].Weight = SortableTableUtils.makeNumber(productList[i].productWeight);
            newProductList[i].Quantity = SortableTableUtils.makeNumber(productList[i].productQuantity);
            newProductList[i].Type = SortableTableUtils.makeText(productList[i].productType);
            newProductList[i].Vendor = SortableTableUtils.makeText(productList[i].productVendor);
            newProductList[i].UserEmail = SortableTableUtils.makeText(productList[i].userEmail);
            newProductList[i].UserID = SortableTableUtils.makeNumber(productList[i].webUserId);
        }
        var csObj2 = MakeClickSort({ title: "Products Available", objList: newProductList, sortOrderPropName: "Name", sortIcon: "icons/csboth.png", numProps1stMobileCol: 2 });
        csObj2.classList.add("clickSort");
        flexBox.appendChild(csObj2);
    }
    return ele;
}