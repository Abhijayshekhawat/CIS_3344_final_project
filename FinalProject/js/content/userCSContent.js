function userCSContent() {
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
    ajax("js/json/users.json", processData, document.getElementById("clicksort"));
    function processData(userList) {
        console.log(userList);
        var newUserList = [];
        for (var i = 0; i < userList.length; i++) {
            newUserList[i] = {};
            newUserList[i].Image = SortableTableUtils.makeImage(userList[i].image, "10rem");
            newUserList[i].Email = SortableTableUtils.makeText(userList[i].userEmail);
            newUserList[i].Birthdate = SortableTableUtils.makeDate(userList[i].birthday);
            newUserList[i].MembershipFee = SortableTableUtils.makeNumber(userList[i].membershipFee, true);
            newUserList[i].Role = SortableTableUtils.makeText(userList[i].userRoleType);
        }
        var csObj2 = MakeClickSort({ title: "User List", objList: newUserList, sortOrderPropName: "Email", sortIcon: "icons/csboth.png", numProps1stMobileCol: 2 });
        csObj2.classList.add("clickSort");
        flexBox.appendChild(csObj2);
    }
    return ele;
}