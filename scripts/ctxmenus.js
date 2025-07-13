function removeSubMenus(element) {
    for (let i = 0; i < element.querySelectorAll("* .submenu").length; i++) {
        element.querySelector("* .submenu").remove();
    }
}

function createSubMenu(elmnt) {
    if (elmnt.querySelector(".submenu")) {
        return;
    }
    document.querySelectorAll(".submenu").forEach((element) => {
        if (!element.contains(elmnt) && !elmnt.contains(element)) element.remove();
    });
    let subMenu = document.createElement("div");
    subMenu.classList.add("submenu");
    if (document.querySelector("#prog").contains(elmnt))
    {
        let path = "";
        let current = elmnt;
        while (document.querySelector("#prog").contains(current))
        {
            if (current.classList.contains("dropdown")) path = current.childNodes[1].textContent.trim() + "\\" + path;
            current = current.parentNode;
        }
        path = `C:\\WINDOWS\\${currentLang[90]}\\${path}`.slice(0,-1);
        let folderChildren = findByPath(path).children;
        for (let i in folderChildren)
        {
            if (folderChildren[i].type == "folder")
            {
                let icon = folderChildren[i].icon ? folderChildren[i].icon + "16.png" : "res/folder16.png";
                let button = document.createElement("button");
                button.classList.add("dropdown");
                button.innerHTML = `<img src=${icon}></img>${folderChildren[i].name}`;
                subMenu.appendChild(button);
            }
            else if (folderChildren[i].type == "shortcut") {
                let icon = folderChildren[i].icon ? folderChildren[i].icon + "16.png" : folderChildren[i].dest.icon + "16.png";
                let button = document.createElement("button");
                button.innerHTML = `<img src=${icon}></img>${folderChildren[i].name}`;
                button.onclick = findByPath(folderChildren[i].dest).action;
                subMenu.appendChild(button);
            }
        }
        if (folderChildren.length == 0)
        {
            subMenu.innerHTML = `<button disabled>${currentLang[32]}</button>`;
        }
    }
    else
    {
        switch (elmnt.id) {
            case "scsort":
                subMenu.innerHTML = ``;
                break;
            default:
                subMenu.innerHTML = `<button disabled>${currentLang[32]}</button>`;
                break;
        }
    }
    elmnt.append(subMenu);
    if (subMenu != document.querySelector("#startoptions")) sortSubMenu(subMenu);
    for (let i = 0; i < subMenu.querySelectorAll("button").length; i++) {
        let element = subMenu.querySelectorAll("button")[i];
        if (element.classList.contains("dropdown")) {
            element.onmouseover = function () {
                createSubMenu(element);
            };
        }
        else {
            element.onmouseover = function () {
                removeSubMenus(subMenu);
            };
        }
    }
    let top = elmnt.getBoundingClientRect().top - elmnt.parentNode.getBoundingClientRect().top - 3;
    let left = elmnt.clientWidth;
    subMenu.style.top = top + "px";
    subMenu.style.left = left + "px";
    if (subMenu.getBoundingClientRect().top + subMenu.clientHeight > window.innerHeight) {
        top -= subMenu.clientHeight - 26;
    }
    if (elmnt.parentNode.parentNode.id == "startoptions") {
        left += 25;
        top += 3;
    }
    if (subMenu.getBoundingClientRect().left + subMenu.clientWidth > window.innerWidth) {
        left = -subMenu.clientWidth;
    }
    subMenu.style.top = top + "px";
    subMenu.style.left = left + "px";
}

function sortSubMenu(subMenu) {
    let buttons = Array.from(subMenu.querySelectorAll("button"));

    buttons.sort((a, b) => {
        const aHasClass = a.classList.contains("dropdown");
        const bHasClass = b.classList.contains("dropdown");

        if (aHasClass !== bHasClass) {
            return aHasClass ? -1 : 1;
        }

        const aText = a.textContent.trim().toLowerCase();
        const bText = b.textContent.trim().toLowerCase();

        if (aText < bText) return -1;
        if (aText > bText) return 1;
        return 0;
    });

    subMenu.innerHTML = "";

    buttons.forEach((button) => {
        subMenu.appendChild(button);
    });
}

function disableContextMenu() {
    document.querySelector("#contextmenu")?.remove();
}