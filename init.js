window.addEventListener("load", function()
{
    setInterval(updateTime, 1000);
    document.querySelector("#startbar").addEventListener("click", function(e)
    {
        if (e.target == this)
        {
            disableStart();
        }
    });
    let mutationObserver = new MutationObserver(() =>
    {
        windowDisplays();
    });
    mutationObserver.observe(document.querySelector("#windows"),
    {
        childList: true,
    });
});

document.addEventListener("DOMContentLoaded", function()
{
    const desktop = document.getElementById("desktop");
    let isSelecting = false;
    let startX, startY, endX, endY;
    let selectionBox;

    document.oncontextmenu = function(e)
    {
        e.preventDefault();
        document.querySelector("#contextmenu")?.remove();
        if (e.target != document.querySelector("#desktop")) return;
        let contextMenu = document.createElement("div");
        contextMenu.id = "contextmenu";
        contextMenu.style.left = e.clientX + "px";
        contextMenu.style.top = e.clientY + "px";
        contextMenu.innerHTML = `
            <button id="scsort" class="dropdown">${currentLang[65]}</button>
            <button>${currentLang[66]}</button>
            <div class="sep"></div>
            <button disabled>${currentLang[67]}</button>
            <button disabled>${currentLang[68]}</button>
            <div class="sep"></div>
            <button id="create" class="dropdown">${currentLang[69]}</button>
            <div class="sep"></div>
            <button onclick="createProperties();">${currentLang[70]}</button>
        `;
        for (let i = 0; i < contextMenu.querySelectorAll("button").length; i++)
        {
            let element = contextMenu.querySelectorAll("button")[i];
            if (element.classList.contains("dropdown"))
            {
                element.onmouseover = function()
                {
                    createSubMenu(element);
                };
            }
            else
            {
                element.onmouseover = function()
                {
                    removeSubMenus(contextMenu);
                };
            }
        }
        document.body.appendChild(contextMenu);
    };

    desktop.addEventListener("mousedown", function(event)
    {
        if (!event.target.classList.contains("shortcut"))
        {
            deselectShortcuts();
            isSelecting = true;
            startX = event.clientX;
            startY = event.clientY;
            selectionBox = document.createElement("div");
            selectionBox.className = "selection-box";
            document.body.appendChild(selectionBox);
            selectionBox.style.left = startX + "px";
            selectionBox.style.top = startY + "px";
            selectionBox.style.width = "0px";
            selectionBox.style.height = "0px";
        }
    });

    desktop.addEventListener("mousemove", function(event)
    {
        if (isSelecting)
        {
            endX = event.clientX;
            endY = event.clientY;
            selectionBox.style.width = Math.abs(endX - startX) + "px";
            selectionBox.style.height = Math.abs(endY - startY) + "px";
            selectionBox.style.left = Math.min(endX, startX) + "px";
            selectionBox.style.top = Math.min(endY, startY) + "px";
            selectShortcutsInBox();
        }
    });

    document.addEventListener("mouseup", function()
    {
        if (isSelecting)
        {
            isSelecting = false;
            if (selectionBox)
            {
                selectionBox.remove();
                selectionBox = null;
            }
        }
    });

    function selectShortcutsInBox()
    {
        const shortcuts = document.querySelectorAll(".shortcut");
        shortcuts.forEach((shortcut) =>
        {
            const shortcutRect = shortcut.getBoundingClientRect();
            const boxRect = selectionBox.getBoundingClientRect();

            if (shortcutRect.left < boxRect.right && shortcutRect.right > boxRect.left && shortcutRect.top < boxRect.bottom && shortcutRect.bottom > boxRect.top)
            {
                shortcut.classList.add("selected");
            }
            else
            {
                shortcut.classList.remove("selected");
            }
        });
    }

    function isClearTypeEnabled()
    {
        var canvas = document.createElement("canvas");
        canvas.width = 35;
        canvas.height = 35;
        var ctx = canvas.getContext("2d");
        ctx.textBaseline = "top";
        ctx.font = "15px Arial";
        ctx.fillText("E", 1, 1);

        var data = ctx.getImageData(1, 1, 32, 32).data;
        var count = 0;

        for (var i = 0; i < data.length; i += 4)
        {
            if (data[i] !== data[i + 1] || data[i] !== data[i + 2])
            {
                count++;
            }
        }

        return count > 0;
    }

    let docElm = document.documentElement;

    isClearTypeEnabled ? docElm.style.setProperty("--font", "MS Sans Serif") : docElm.style.setProperty("--font", "Microsoft Sans Serif");

    document.querySelector("#start span").innerText = currentLang[0];
    bootUp();

    createShortcut("res/mycomputer32.png", currentLang[77], createFileViewer);

    let desktopObserver = new MutationObserver(syncFolderWithDesktop);
    desktopObserver.observe(document.querySelector("#desktop"),
    {
        childList: true
    });

    let desktopFolderObserver = new MutationObserver(syncDesktopWithFolder);
    desktopFolderObserver.observe(document.querySelector("#windows"),
    {
        childList: true,
        subtree: true
    });
});