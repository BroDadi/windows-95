let startedMinMax = false;
let newWindowTop = 50,
    newWindowLeft = 50;

function enableDraggable(elmnt)
{
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    elmnt.children[0].onmousedown = dragMouseDown;
    elmnt.children[0].ontouchstart = dragTouchStart;

    function dragMouseDown(e)
    {
        elmnt.focus();
        if (elmnt.classList.contains("maximized")) return;
        if (e.target.tagName === "BUTTON")
        {
            return;
        }
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        var preview = createPreviewElement(elmnt);
        document.body.appendChild(preview);
        if (elmnt.parentNode.classList.contains("nodisplay")) return;
        bringToTop(elmnt);
    }

    function dragTouchStart(e)
    {
        if (e.target.tagName === "BUTTON")
        {
            return;
        }
        elmnt.focus();
        e.preventDefault();
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;
        var preview = createPreviewElement(elmnt);
        document.body.appendChild(preview);
        if (elmnt.parentNode.classList.contains("nodisplay")) return;
        bringToTop(elmnt);
    }

    function elementDrag(e)
    {
        elmnt.focus();
        e.preventDefault();
        if (e.clientX && e.clientY)
        {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
        }
        else if (e.touches && e.touches[0])
        {
            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
        }

        var preview = document.querySelector(".windowpreview");
        preview.style.left = preview.offsetLeft - pos1 + "px";
        preview.style.top = preview.offsetTop - pos2 + "px";
        if (elmnt.parentNode.classList.contains("nodisplay")) return;
        highlightDisplay(document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]);
    }

    function closeDragElement(e)
    {
        elmnt.focus();
        if (e.touches && e.touches[0])
        {
            document.ontouchend = null;
            document.ontouchmove = null;
        }
        else
        {
            document.onmouseup = null;
            document.onmousemove = null;
        }

        var preview = document.querySelector(".windowpreview");
        if (preview)
        {
            elmnt.style.left = preview.offsetLeft + "px";
            elmnt.style.top = preview.offsetTop + "px";
            preview.remove();
            if (elmnt.parentNode.classList.contains("nodisplay")) return;
            highlightDisplay(document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]);
        }
    }

    function createPreviewElement(elmnt)
    {
        var preview = document.createElement("div");
        preview.classList.add("windowpreview");
        preview.style.width = elmnt.offsetWidth + "px";
        preview.style.height = elmnt.offsetHeight + "px";
        preview.style.position = "absolute";
        preview.style.left = elmnt.offsetLeft + "px";
        preview.style.top = elmnt.offsetTop + "px";
        return preview;
    }
}

function enableResizable(elmnt, minwidth, minheight, maxwidth, maxheight)
{
    let group = document.createElement("div");
    group.classList.add("resizers");
    let resizerarray = ["nw", "ne", "sw", "se", "n", "s", "w", "e"];
    elmnt.append(group);
    let minWidth = minwidth || 180;
    let minHeight = minheight || 77;
    let maxWidth = maxwidth || Infinity;
    let maxHeight = maxheight || Infinity;
    for (let i = 0; i < 8; i++)
    {
        let resizer = document.createElement("div");
        resizer.classList.add("resizer");
        resizer.classList.add(resizerarray[i]);
        group.append(resizer);

        resizer.addEventListener("mousedown", function(e)
        {
            e.preventDefault();
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResize);
            bringToTop(window);
        });

        function resize(e)
        {
            let preview;
            if (!document.querySelector(".windowpreview"))
            {
                preview = document.createElement("div");
                preview.classList.add("windowpreview");
                elmnt.append(preview);
            }
            else
            {
                preview = document.querySelector(".windowpreview");
            }

            if (resizerarray[i].includes("s"))
            {
                let newHeight = e.clientY - elmnt.getBoundingClientRect().top;
                if (newHeight >= minHeight && newHeight <= maxHeight)
                {
                    preview.style.height = newHeight + "px";
                }
            }
            else if (resizerarray[i].includes("n"))
            {
                let newTop = elmnt.clientTop - (elmnt.getBoundingClientRect().top - e.clientY);
                let newHeight = elmnt.getBoundingClientRect().top + elmnt.clientHeight - e.clientY;
                if (newHeight > minHeight && newHeight < maxHeight)
                {
                    preview.style.top = newTop + "px";
                    preview.style.height = newHeight + "px";
                }
            }
            else
            {
                preview.style.height = elmnt.clientHeight + "px";
            }

            if (resizerarray[i].includes("e"))
            {
                let newWidth = e.clientX - elmnt.getBoundingClientRect().left;
                if (newWidth >= minWidth && newWidth <= maxWidth)
                {
                    preview.style.width = newWidth + "px";
                }
            }
            else if (resizerarray[i].includes("w"))
            {
                let newLeft = elmnt.clientLeft - (elmnt.getBoundingClientRect().left - e.clientX);
                let newWidth = elmnt.getBoundingClientRect().left + elmnt.clientWidth - e.clientX;
                if (newWidth > minWidth && newWidth < maxWidth)
                {
                    preview.style.left = newLeft + "px";
                    preview.style.width = newWidth + "px";
                }
            }
            else
            {
                preview.style.width = elmnt.clientWidth + "px";
            }
        }

        function stopResize()
        {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResize);
            let preview = document.querySelector(".windowpreview");
            if (preview != null)
            {
                elmnt.style.left = preview.getBoundingClientRect().left + "px";
                elmnt.style.top = preview.getBoundingClientRect().top + "px";
                elmnt.style.width = preview.offsetWidth + "px";
                elmnt.style.height = preview.offsetHeight + "px";
                preview.remove();
                highlightDisplay(document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]);
            }
        }
    }
}

function maximize(button, elmnt)
{
    if (startedMinMax) return;
    console.log(startedMinMax)
    startedMinMax = true;
    let header = elmnt.querySelector(".header");
    let headerClone = header.cloneNode(true);
    headerClone.classList.add("clone");
    headerClone.style.width = header.clientWidth + "px";
    headerClone.style.height = header.clientHeight + "px";
    headerClone.style.left = header.getBoundingClientRect().left + "px";
    headerClone.style.top = header.getBoundingClientRect().top + "px";
    document.querySelector("body").append(headerClone);
    highlightDisplay(document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]);
    setTimeout(function()
    {
        headerClone.style.top = "0px";
        headerClone.style.left = "0px";
        headerClone.style.width = "100%";
        headerClone.style.height = header.clientHeight + "px";
    }, 1);
    setTimeout(function()
    {
        elmnt.classList.add("maximized");
        button.classList.remove("maximize");
        button.classList.add("restore");
        button.setAttribute("onclick", "restore(this, this.parentNode.parentNode.parentNode.parentNode)");
        highlightDisplay(document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]);
        headerClone.remove();
        startedMinMax = false;
    }, 250);
}

function restore(button, elmnt)
{
    if (startedMinMax) return;
    startedMinMax = true;
    let header = elmnt.querySelector(".header");
    let headerClone = header.cloneNode(true);
    headerClone.classList.add("clone");
    headerClone.style.width = "100%";
    headerClone.style.height = header.clientHeight + "px";
    headerClone.style.left = "0px";
    headerClone.style.top = "0px";
    document.querySelector("body").append(headerClone);
    elmnt.classList.remove("maximized");
    let left = header.getBoundingClientRect().left + "px";
    let top = header.getBoundingClientRect().top + "px";
    let width = header.clientWidth + "px";
    elmnt.classList.add("maximized");
    highlightDisplay(document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]);
    setTimeout(function()
    {
        headerClone.style.top = top;
        headerClone.style.left = left;
        headerClone.style.width = width;
        headerClone.style.height = header.clientHeight + "px";
    }, 1);
    setTimeout(function()
    {
        elmnt.classList.remove("maximized");
        button.classList.remove("restore");
        button.classList.add("maximize");
        button.setAttribute("onclick", "maximize(this, this.parentNode.parentNode.parentNode.parentNode)");
        highlightDisplay(document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]);
        headerClone.remove();
        startedMinMax = false;
    }, 250);
}

function minimize(elmnt)
{
    if (startedMinMax) return;
    startedMinMax = true;
    let header = elmnt.querySelector(".header");
    let headerClone = header.cloneNode(true);
    headerClone.classList.add("clone");
    headerClone.style.width = header.clientWidth + "px";
    headerClone.style.height = header.clientHeight + "px";
    headerClone.style.left = header.getBoundingClientRect().left + "px";
    headerClone.style.top = header.getBoundingClientRect().top + "px";
    document.querySelector("body").append(headerClone);
    elmnt.focus();
    let windowDisplay = document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)];
    setTimeout(function()
    {
        headerClone.style.top = windowDisplay.getBoundingClientRect().top + "px";
        headerClone.style.left = windowDisplay.getBoundingClientRect().left + "px";
        headerClone.style.width = windowDisplay.clientWidth + "px";
    }, 1);
    setTimeout(function()
    {
        elmnt.classList.add("minimized");
        headerClone.remove();
        startedMinMax = false;
        windowDisplay.classList.remove("pressed");
    }, 250);
}

function unminimize(elmnt)
{
    if (!elmnt || !elmnt.classList.contains("minimized"))
    {
        return;
    }
    let header = elmnt.querySelector(".header");
    let headerClone = header.cloneNode(true);
    let windowDisplay =
        document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)];
    headerClone.classList.add("clone");
    headerClone.style.height = header.clientHeight + "px";
    headerClone.style.width = windowDisplay.clientWidth + "px";
    headerClone.style.top = windowDisplay.getBoundingClientRect().top + "px";
    headerClone.style.left = windowDisplay.getBoundingClientRect().left + "px";
    document.querySelector("body").append(headerClone);
    setTimeout(function()
    {
        headerClone.style.left = header.getBoundingClientRect().left + "px";
        headerClone.style.top = header.getBoundingClientRect().top + "px";
        headerClone.style.width = header.clientWidth + "px";
    }, 1);
    setTimeout(function()
    {
        elmnt.classList.remove("minimized");
        headerClone.remove();
        highlightDisplay(document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]);
    }, 250);
}

function createWindow(
{
    title = "Untitled",
    icon = "",
    html,
    draggable = true,
    resizable = true,
    additionalClasses = [],
    menu,
    id = "",
    minimizable = true,
    maximizable = true,
    closable = true,
    maximizeOnStart = false,
    minwidth = null,
    minheight = null,
    maxwidth = null,
    maxheight = null,
    startWidth = null,
    startHeight = null,
    hasdisplay = true,
    parentElement = null,
})
{
    disableStart();
    let wndw = document.createElement("div");
    wndw.classList.add("window");
    if (additionalClasses) wndw.classList.add(...additionalClasses);
    if (id) wndw.id = id;
    wndw.tabIndex = 0;
    let buttons = document.createElement("div");
    let close;
    wndw.close = function()
    {
        if (parentElement)
        {
            parentElement.querySelector(".blocker").remove();
        }
        wndw.remove();
    }
    if (minimizable)
    {
        let min = document.createElement("button");
        min.classList.add("minimize");
        min.onclick = function()
        {
            minimize(wndw);
        };
        buttons.append(min);
    }
    if (maximizable)
    {
        let max = document.createElement("button");
        max.classList.add("maximize");
        max.onclick = function()
        {
            maximize(max, wndw);
        };
        buttons.append(max);
    }
    if (closable)
    {
        close = document.createElement("button");
        close.classList.add("close");
        close.onclick = wndw.close;
    }

    if ((!startWidth || !startHeight) && resizable)
    {
        wndw.style.width = Math.min(window.innerWidth * 0.75, maxwidth ?? Infinity) + "px";
        wndw.style.height = Math.min(window.innerHeight * 0.75, maxheight ?? Infinity) + "px";
    }
    else
    {
        wndw.style.width = startWidth + "px";
        wndw.style.height = startHeight + "px";
    }

    if (wndw.style.height + newWindowTop > window.innerHeight || wndw.style.width + newWindowTop > window.innerWidth)
    {
        newWindowLeft = 0;
        newWindowTop = 0;
    }

    if (parentElement)
    {
        let blocker = document.createElement("div");
        let ding = new Audio("res/audio/DING.WAV");
        blocker.classList.add("blocker");
        blocker.onmousedown = function()
        {
            ding.play();
            setTimeout(function() {wndw.focus()}, 10);
        }
        parentElement.appendChild(blocker);
    }
    wndw.style.top = newWindowTop + "px";
    wndw.style.left = newWindowLeft + "px";
    newWindowTop += 22;
    newWindowLeft += 22;

    wndw.innerHTML = `
        <div class="header">
            <div>
            </div>
            <div class="windowbuttons"></div>
        </div>
    `;
    if (icon)
    {
        let img = document.createElement("img");
        img.src = icon;
        wndw.querySelector(".header > div").appendChild(img);
    }
    let span = document.createElement("span");
    span.innerText = title;
    wndw.querySelector(".header > div").appendChild(span);

    wndw.querySelector(".windowbuttons").appendChild(buttons);
    if (closable) wndw.querySelector(".windowbuttons").appendChild(close);

    let activeMenuBarItem = null;
    if (menu)
    {
        let menuBar = document.createElement("div");
        menuBar.classList.add("menu-bar");
        wndw.appendChild(menuBar);
        for (let i = 0; i < menu.length; i++)
        {
            let menuItem = document.createElement("button");
            if (typeof(menu[i]) == "string") menuItem.innerText = menu[i];
            else
            {
                menuItem.innerText = menu[i].name;
                menuItem.onclick = function(e)
                {
                    if (activeMenuBarItem == menuItem)
                    {
                        removeSubMenus(menuBar);
                        activeMenuBarItem = null;
                        menuItem.classList.remove("selected");
                        return;
                    }
                    removeSubMenus(menuBar);
                    createSubTopMenu(menuItem, menu[i].children);
                    activeMenuBarItem = menuItem;
                    menuItem.classList.add("selected");
                };
                menuItem.onmouseover = function()
                {
                    if (activeMenuBarItem && activeMenuBarItem != menuItem)
                    {
                        removeSubMenus(menuBar);
                        activeMenuBarItem.classList.remove("selected");
                        createSubTopMenu(menuItem, menu[i].children);
                        activeMenuBarItem = menuItem;
                        menuItem.classList.add("selected");
                    }
                };
            }
            wndw.querySelector(".menu-bar").appendChild(menuItem);
        }
    }

    let contents = document.createElement("div");
    wndw.appendChild(contents);
    contents.outerHTML = html;

    hasdisplay ? document.querySelector("#windows").append(wndw) : document.querySelector("#windows.nodisplay").append(wndw);
    wndw.onfocus = function()
    {
        bringToTop(wndw);
    };
    if (draggable) enableDraggable(wndw);
    if (resizable) enableResizable(wndw, minwidth, minheight, maxwidth, maxheight);
    if (hasdisplay)
    {
        bringToTop(wndw);
    }
    else
    {
        wndw.style.zIndex = 100;
    }
    return wndw;
}

function bringToTop(window)
{
    if (!window.style) return;
    let windows = document.querySelector("#windows").children;
    let highestIndex = 0;
    for (let i = 0; i < windows.length; i++)
    {
        if (windows[i].style.zIndex > highestIndex)
        {
            highestIndex = parseInt(windows[i].style.zIndex);
        }
    }

    if (highestIndex == 0)
    {
        window.style.zIndex = 1;
        return;
    }

    if (window.style.zIndex != highestIndex) window.style.zIndex = highestIndex + 1;
    windowDisplays();
    setTimeout(function()
    {
        highlightDisplay(document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, window)]);
    }, 1);
    balanceZIndexes();
}

function balanceZIndexes()
{
    const windows = document.querySelector("#windows").children;
    const zIndexes = [];

    for (let i = 0; i < windows.length; i++)
    {
        zIndexes.push(parseInt(windows[i].style.zIndex || 0));
    }

    const minZ = Math.min(...zIndexes);

    if (minZ > 1)
    {
        const offset = minZ - 1;
        for (let i = 0; i < windows.length; i++)
        {
            let currentZ = parseInt(windows[i].style.zIndex || 0);
            windows[i].style.zIndex = (currentZ - offset).toString();
        }
    }
}

function createMessageBox(title, desc, buttonarray, onclickarray, icon)
{
    let html = `
    <div class="desc"><img src="${icon}"></img><span>${desc}</span></div>
    <div class="buttons"></div>
    `;
    let msgbox = createWindow(
    {
        title: title,
        html: html,
        hasdisplay: false,
        minimizable: false,
        maximizable: false,
    });
    for (let i = 0; i < buttonarray.length; i++)
    {
        let button = document.createElement("button");
        button.innerHTML = buttonarray[i];
        button.onclick = onclickarray[i] || function()
        {
            msgbox.remove()
        };
        msgbox.children[2].appendChild(button);
    }
    if (icon == null)
    {
        msgbox.children[1].children[0].remove();
    }
    enableDraggable(msgbox);
    msgbox.style.left = window.clientWidth / 2 - msgbox.clientWidth / 2 + "px";
    msgbox.style.top = window.clientHeight / 2 - msgbox.clientHeight / 2 + "px";
    msgbox.style.minWidth = msgbox.clientWidth + "px";
}