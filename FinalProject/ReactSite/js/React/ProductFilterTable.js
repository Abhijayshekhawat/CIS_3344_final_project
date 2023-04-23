const ProductFilterTable = ({list, heading}) => {

    console.log("ProductFilterTable running!!");

    // Tell React that 'isFirstRender' (boolean) is something that
    // (when changed) should redisplay this component.
    // Set its initial value to true.
    const [isFirstRender, setIsFirstRender] = React.useState(true);

    // on first rendering, build the Product table directly from list (input param)
    // after the Product clicks the search button, build the Product table from 
    // the list that's been run through a filter operation. Otherwise, the 
    // list shows up empty intially.

    // Tell React that 'items' (array) is something that
    // (when changed) should redisplay this component.
    // Set items initial value to [], an empty array.
    const [items, setItems] = React.useState(list);
    console.log("Initial ProductFilterTable value of list on next line");
    console.log(list);

    // Tell React that 'filterInput' is something that
    // (when changed) should cause this component to be 
    // redisplayed. Set initial value of filterInput to "".
    const [filterInput, setFilterInput] = React.useState("");

    const doFilter = () => {
        setIsFirstRender(false);
        let newList = filterObjList(list, filterInput);
        console.log("ProductFilterTable Search clicked. See filtered list on next line:");
        console.log(newList);
        setItems(newList);
    };


    return (
            <div className="clickSort">
                <input value={filterInput} onChange={(e) => setFilterInput(e.target.value)} /> 
                &nbsp; <button onClick={ doFilter }>Search</button>
            
            {isFirstRender ? <ProductTable list={list} heading={heading} /> : <ProductTable list={items} heading={heading} /> }
            </div>
            );
};