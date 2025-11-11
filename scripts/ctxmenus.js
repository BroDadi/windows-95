function removeSubMenus(element)
{
    while (element.querySelectorAll("* .submenu").length > 0)
    {
        element.querySelector("* .submenu").remove();
    }
}

function createSubMenu(elmnt)
{
    if (elmnt.querySelector(".submenu")) return;

    document.querySelectorAll(".submenu").forEach((element) =>
    {
        if (!element.contains(elmnt) && !elmnt.contains(element)) element.remove();
    });
    
    let subMenu = document.createElement("div");
    subMenu.classList.add("submenu");
    if (document.querySelector("#prog") && document.querySelector("#prog").contains(elmnt))
    {
        let path = "";
        let current = elmnt;
        while (document.querySelector("#prog").contains(current))
        {
            if (current.classList.contains("dropdown")) path = current.childNodes[1].textContent.trim() + "\\" + path;
            current = current.parentNode;
        }
        path = `C:\\WINDOWS\\${currentLang[90]}\\${path}`.slice(0, -1);
        let folderChildren = findByPath(path).children;
        folderChildren.forEach(function(child)
        {
            if (child.type == "folder")
            {
                let icon = child.icon ? child.icon + "16.png" : "res/folder16.png";
                let button = document.createElement("button");
                button.classList.add("dropdown");
                button.innerHTML = `<img src=${icon}>${child.name}`;
                subMenu.appendChild(button);
            }
            else if (child.type == "shortcut")
            {
                let icon = child.icon ? child.icon + "16.png" : child.dest.icon + "16.png";
                let button = document.createElement("button");
                button.innerHTML = `<img src=${icon}>${child.name}`;
                button.onclick = findByPath(child.dest).action;
                subMenu.appendChild(button);
            }
        });
        if (folderChildren.length == 0)
        {
            subMenu.innerHTML = `<button disabled>${currentLang[32]}</button>`;
        }
    }
    else
    {
        switch (elmnt.id)
        {
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
    subMenu.querySelectorAll("button").forEach(function(button)
    {
        if (button.classList.contains("dropdown"))
        {
            button.onmouseover = function()
            {
                createSubMenu(button);
            };
        }
        else
        {
            button.onmouseover = function()
            {
                removeSubMenus(subMenu);
            };
        }
    });

    let top = elmnt.getBoundingClientRect().top - elmnt.parentNode.getBoundingClientRect().top - 3;
    let left = elmnt.clientWidth;
    
    if (subMenu.getBoundingClientRect().top + subMenu.clientHeight > window.innerHeight)
    {
        top -= subMenu.clientHeight - 26;
    }
    if (subMenu.getBoundingClientRect().left + subMenu.clientWidth > window.innerWidth)
    {
        left = -subMenu.clientWidth;
    }
    if (elmnt.parentNode.parentNode.id == "startoptions")
    {
        left += 25;
        top += 3;
    }
    subMenu.style.top = top + "px";
    subMenu.style.left = left + "px";
}

function sortSubMenu(subMenu)
{
    let buttons = Array.from(subMenu.querySelectorAll("button"));

    buttons.sort(function (a, b)
    {
        const aHasClass = a.classList.contains("dropdown");
        const bHasClass = b.classList.contains("dropdown");

        if (aHasClass !== bHasClass) return aHasClass ? -1 : 1;

        const aText = a.textContent.trim().toLowerCase();
        const bText = b.textContent.trim().toLowerCase();

        return (aText > bText) ? 1 : (aText < bText) ? -1 : 0;
    });

    subMenu.innerHTML = "";

    buttons.forEach(function(button)
    {
        subMenu.appendChild(button);
    });
}

function disableContextMenu()
{
    document.querySelector("#contextmenu")?.remove();
}

function createSubTopMenu(elmnt, subMenuElements)
{
    if (subMenuElements.length == 0) return;
    if (elmnt.querySelector(".submenu")) return;

    document.querySelectorAll(".submenu").forEach((element) =>
    {
        if (!element.contains(elmnt) && !elmnt.contains(element)) element.remove();
    });
    
    let subMenu = document.createElement("div");
    subMenu.classList.add("submenu");

    subMenuElements.forEach(element =>
    {
        if (element.name == "/sep/")
        {
            let sep = document.createElement("div");
            sep.classList.add("sep");
            subMenu.appendChild(sep);
        }
        else
        {
            let button = document.createElement("button");
            button.innerText = `${element.name}`;
            button.onclick = element.action;
            subMenu.appendChild(button);
        }
    });
    let top, left;
    if (elmnt.parentNode.classList.contains("menu-bar"))
    {
        top = elmnt.clientHeight;
        left = elmnt.getBoundingClientRect().left - elmnt.parentNode.getBoundingClientRect().left;
    }
    else
    {
        top = elmnt.getBoundingClientRect().top - elmnt.parentNode.getBoundingClientRect().top - 3;
        left = elmnt.clientWidth;
        if (subMenu.getBoundingClientRect().top + subMenu.clientHeight > window.innerHeight)
        {
            top -= subMenu.clientHeight - 26;
        }
        if (subMenu.getBoundingClientRect().left + subMenu.clientWidth > window.innerWidth)
        {
            left = -subMenu.clientWidth;
        }
    }
    elmnt.append(subMenu);
    subMenu.style.top = top + "px";
    subMenu.style.left = left + "px";
}