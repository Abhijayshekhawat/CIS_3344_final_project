function MakeNavRouter(params) {
    function MakeLink(linkObj) {
        var aTag = document.createElement("a");
        var linkText = linkObj.linkText || "Missing Link Text";
        aTag.innerHTML = linkText;
        if ('action' in linkObj && 'linkURL' in linkObj) {
            if (!routes[linkObj.linkURL]) {
                aTag.href = linkObj.linkURL;
                routes[linkObj.linkURL] = linkObj.action;
            } else {
                var warningMsg = "!!! >>> Duplicate LinkURL <<< " + linkObj.linkURL + 
                        ". This is an error (unless you want two links to go to the same action).";
                console.log(warningMsg);
            }
        }
        return aTag;
    }
    function MakeLinkOrGroup(obj) {
        var navGroup = document.createElement("div");
        navGroup.classList.add(NavGroupClass);
        if (!obj.header) {
            navGroup.appendChild(MakeLink(obj));
        } else {
            var headerDiv = document.createElement("div");
            headerDiv.innerHTML = obj.header;
            headerDiv.classList.add(MenuHeaderClass);
            navGroup.appendChild(headerDiv);
            var subMenuDiv = document.createElement("div");
            subMenuDiv.classList.add(SubMenuClass);
            subMenuDiv.classList.add(hideClass);
            navGroup.appendChild(subMenuDiv);
            headerDiv.assocSubMenu = subMenuDiv;
            for (var j = 0; j < obj.subMenu.length; j++) {
                subMenuDiv.appendChild(MakeLink(obj.subMenu[j]));
            }
        }
        return navGroup;
    }
    var navId = params.navId;
    if (!navId) {
        alert("Error in MakNavRouter: parameter property 'navId' must be supplied");
        return;
    }
    var navList = params.navList;
    if (!navList) {
        alert("Error in MakNavRouter: parameter property 'navList' must be supplied");
        return;
    }
    var contentId = params.contentId || "content";
    var startLink = params.startLink || "#/home";
    var NavRouterClass = "NavRouter";
    var NavGroupClass = "NavGroup";
    var MenuHeaderClass = "MenuHeader";
    var SubMenuClass = "SubMenu";
    var hideClass = "hide";
    var showClass = "show";
    var routes = [];
    var navRouter = document.createElement("div");
    navRouter.classList.add(NavRouterClass);
    for (var i = 0; i < navList.length; i++) {
        navRouter.appendChild(MakeLinkOrGroup(navList[i]));
    }
    document.getElementById(navId).appendChild(navRouter);
    window.onclick = function (event) {
        function hideSubMenusExcept(ele) {
            var dropContentList = document.getElementsByClassName(SubMenuClass);
            for (var i = 0; i < dropContentList.length; i++) {
                if (ele !== dropContentList[i]) {
                    hide(dropContentList[i]);
                }
            }
        }
        function hide(ele) {
            ele.classList.remove(showClass);
            ele.classList.add(hideClass);
        }
        function show(ele) {
            ele.classList.remove(hideClass);
            ele.classList.add(showClass);
        }
        var clickedEle = event.target;
        var subMenu = clickedEle.assocSubMenu;
        if (subMenu) {
            if (subMenu.classList.contains(showClass)) {
                hide(subMenu);
            } else {
                show(subMenu);
            }
            hideSubMenusExcept(subMenu);
        } else {

            hideSubMenusExcept(null);
        }
    };
    function parsePath(path) {
        var obj = {
            param: "",
            pathPrefix: path
        };
        var n = path.lastIndexOf("/");
        if (n > 1) {
            obj.param = path.substring(n + 1);
            console.log('routParamFw extracted parameter [' + obj.param + '] from path [' + path + ']');
            obj.pathPrefix = path.substring(0, n);
        }
        return obj;
    }
    function inject(what) {
        document.getElementById(contentId).innerHTML = "";
        document.getElementById(contentId).appendChild(what);
    }
    function router() {
        var saveLink = location.hash;
        var pathObj = parsePath(saveLink);
        var path = pathObj.pathPrefix;
        var param = pathObj.param;

        if (!routes[path]) {
            var ele = document.createElement("div");
            ele.innerHTML = "<p>Error: unknown linkURL '" + path + "' was never added to the routing table.</p>";
            inject(ele);
        } else {
            sessionStorage.setItem("NavRouterURL", saveLink);
            if (routes[path] instanceof Function) {
                if (param.length > 0) {
                    var ele = routes[path](param);
                    inject(ele);
                } else {
                    var ele = routes[path]();
                    inject(ele);
                }
            } else {;
                window.open(routes[path], "_blank");
            }
        }
    }
    window.addEventListener('hashchange', router);
    var URL = sessionStorage.getItem("NavRouterURL");
    location.hash = "xxx";
    if (URL) {
        location.hash = URL;
    } else {
        location.hash = startLink;
    }
    console.log("initial location.hash is " + location.hash);
    var navRouter = {};
    navRouter.addRoute = function (linkObj) {
        routes[linkObj.linkURL] = linkObj.action;
    };
    navRouter.printRoutes = function () {
        console.log("Routing table printed on next line");
        for (var key in routes) {
            console.log(key);
        }
    }
    return navRouter;
}