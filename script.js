let langs = {
    en: [
        "Start",
        "Programs",
        "Documents",
        "Settings",
        "Search",
        "Help",
        "Run...",
        "Suspend",
        "Shut Down...",
        "Notepad",
        "File",
        "Edit",
        "Search",
        "Help",
        "Shut Down Windows",
        "OK",
        "Cancel",
        "It is now safe to turn off your computer",
        "Yes",
        "No",
        "Are you sure you want to:",
        "Shut down the computer?",
        "Restart the computer?",
        "Restart the computer in MS-DOS mode?",
        "Close all programs and log on as a different user?",
        "Accessories",
        "Autorun",
        "Explorer",
        "MS-DOS Prompt",
        "Control panel",
        "Printers",
        "Taskbar",
        "(None)",
        "Apply",
        "Display Properties",
        "Background",
        "Screen Saver",
        "Appearance",
        "Settings",
        "Browse",
        "Browse...",
    ],
    ru: [
        "Пуск",
        "Программы",
        "Документы",
        "Настройка",
        "Поиск",
        "Справка",
        "Выполнить",
        "Остановка",
        "Завершение работы...",
        "Блокнот",
        "Файл",
        "Правка",
        "Поиск",
        "?",
        "Завершение работы с Windows",
        "ОК",
        "Отмена",
        "Теперь питание компьютера можно отключить",
        "Да",
        "Нет",
        "Сейчас следует:",
        "Выключить компьютер",
        "Перезагрузить компьютер",
        "Перезагрузить компьютер в режиме эмуляции MS-DOS",
        "Войти в систему под другим именем",
        "Стандартные",
        "Автозагрузка",
        "Проводник",
        "Сеанс MS-DOS",
        "Панель управления",
        "Принтеры",
        "Панель задач",
        "(Нет)",
        "Применить",
        "Свойства: Display",
        "Фон",
        "Заставка",
        "Оформление",
        "Параметры",
        "Обзор",
        "Обзор...",
    ],
};

let currentLang = langs[
    Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0]
]
    ? langs[Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0]]
    : langs["en"];

function indexOfChild(obj, element) {
    for (let i = 0; i < obj.length; i++) {
        if (obj[i] === element) {
            return i;
        }
    }
    return -1;
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

function updateTime() {
    let date = new Date();
    let minutes = date.getMinutes();
    if (minutes.toString().length == 1) minutes = "0" + minutes;

    let time = date.getHours() + ":" + minutes;
    document.querySelector("#clock").innerHTML = time;
}

function enableStart() {
    if (document.querySelector("#startmenu")) {
        disableStart();
        return;
    }
    document.querySelector("#start").classList.add("pressed");
    let start = document.createElement("div");
    start.id = "startmenu";
    start.innerHTML = `
    <div id="sidemenu">
        <span id="windowstext">Windows</span>
        <span id="ninetyfive">95</span>
    </div>
    <div id="startoptions">
        <div>
            <button class="dropdown" id="prog"><img src="res/folderprograms.png"></img><span>${currentLang[1]}</span></button>
            <button class="dropdown" id="docs"><img src="res/documents.png"></img><span>${currentLang[2]}</span></button>
            <button class="dropdown" id="sets"><img src="res/settings.png"></img><span>${currentLang[3]}</span></button>
            <button class="dropdown" id="srch"><img src="res/search.png"></img><span>${currentLang[4]}</span></button>
            <button><img src="res/help.png"></img><span>${currentLang[5]}</span></button>
            <button><img src="res/run.png"></img><span>${currentLang[6]}</span></button>
        </div>
        <div id="sep"></div>
        <div>
            <button><img src="res/sleep.png"></img><span>${currentLang[7]}</span></button>
            <button onclick="shutdownOverlay();"><img src="res/shutdown.png"></img><span>${currentLang[8]}</span></button>
        </div>
    </div>
    `;
    document.querySelector("#startbar").append(start);
    for (let i = 0; i < start.querySelectorAll("button").length; i++) {
        let element = start.querySelectorAll("button")[i];
        if (element.classList.contains("dropdown")) {
            element.onmouseover = function () {
                createSubMenu(element);
            };
        } else {
            element.onmouseover = function () {
                removeSubMenus(start);
            };
        }
    }
}

function removeSubMenus(element) {
    for (let i = 0; i < element.querySelectorAll("* .submenu").length; i++) {
        document.querySelector(".submenu").remove();
    }
}

function createSubMenu(elmnt) {
    if (elmnt.querySelector(".submenu")) {
        return;
    }
    document.querySelectorAll(".submenu").forEach((element) => {
        if (!element.contains(elmnt) && !elmnt.contains(element))
            element.remove();
    });
    let subMenu = document.createElement("div");
    subMenu.classList.add("submenu");
    if (elmnt.id == "prog") {
        subMenu.innerHTML = `
        <button class="dropdown" id="inex"><img src="res/folderprograms16.png"></img>Internet Explorer</button>
        <button class="dropdown" id="accs"><img src="res/folderprograms16.png"></img>${currentLang[25]}</button>
        <button class="dropdown" id="atrn"><img src="res/folderprograms16.png"></img>${currentLang[26]}</button>
        <button><img src="res/mail16.png"></img>Microsoft Exchange</button>
        <button><img src="res/netmeeting16.png"></img>Microsoft Netmeeting</button>
        <button><img src="res/explorer16.png"></img>${currentLang[27]}</button>
        <button><img src="res/msdos.png"></img>${currentLang[28]}</button>
        `;
    } else if (elmnt.id == "sets") {
        subMenu.innerHTML = `
        <button><img src="res/controlpanel16.png"></img>${currentLang[29]}</button>
        <button><img src="res/printers16.png"></img>${currentLang[30]}</button>
        <button><img src="res/taskbar.png"></img>${currentLang[31]}</button>
        `;
    } else if (elmnt.id == "inex") {
        subMenu.innerHTML = `
        `;
    } else if (elmnt.id == "accs") {
        subMenu.innerHTML = `
        <button><img src="res/controlpanel16.png"></img>skibidi toilet</button>
        <button><img src="res/printers16.png"></img>skibidi skibidi toilet</button>
        <button><img src="res/controlpanel16.png"></img>skibidi toilet</button>
        <button><img src="res/printers16.png"></img>skibidi skibidi toilet</button>
        <button><img src="res/controlpanel16.png"></img>skibidi toilet</button>
        <button><img src="res/printers16.png"></img>skibidi skibidi toilet</button>
        <button><img src="res/controlpanel16.png"></img>skibidi toilet</button>
        <button><img src="res/printers16.png"></img>skibidi skibidi toilet</button>
        <button><img src="res/controlpanel16.png"></img>skibidi toilet</button>
        <button><img src="res/printers16.png"></img>skibidi skibidi toilet</button>
        <button><img src="res/controlpanel16.png"></img>skibidi toilet</button>
        <button><img src="res/printers16.png"></img>skibidi skibidi toilet</button>
        <button><img src="res/controlpanel16.png"></img>skibidi toilet</button>
        <button><img src="res/printers16.png"></img>skibidi skibidi toilet</button>
        `;
    } else {
        subMenu.innerHTML = `
        <button class="disabled">${currentLang[32]}</button>
        `;
    }
    elmnt.append(subMenu);
    if (subMenu != document.querySelector("#startoptions"))
        sortSubMenu(subMenu);
    for (let i = 0; i < subMenu.querySelectorAll("button").length; i++) {
        let element = subMenu.querySelectorAll("button")[i];
        if (element.classList.contains("dropdown")) {
            element.onmouseover = function () {
                createSubMenu(element);
            };
        } else {
            element.onmouseover = function () {
                removeSubMenus(subMenu);
            };
        }
    }
    let top =
        elmnt.getBoundingClientRect().top -
        document.querySelector("#startmenu").getBoundingClientRect().top -
        4;
    let left = elmnt.clientWidth;
    subMenu.style.top = top + "px";
    subMenu.style.left = left + "px";
    if (
        subMenu.getBoundingClientRect().top + subMenu.clientHeight >
        window.innerHeight
    ) {
        top =
            elmnt.clientHeight *
                (indexOfChild(elmnt.parentNode.children, elmnt) + 1) -
            subMenu.clientHeight;
    }
    if (elmnt.parentNode.parentNode.id == "startoptions") {
        left += 19;
    }
    if (
        subMenu.getBoundingClientRect().left + subMenu.clientWidth >
        window.innerWidth
    ) {
        left = "penis";
        subMenu.style.marginLeft = -subMenu.clientWidth + "px";
    }
    subMenu.style.top = top + "px";
    subMenu.style.left = left + "px";
}

function disableStart() {
    document.querySelector("#start").classList.remove("pressed");
    document.querySelector("#startmenu")?.remove();
}

function createMessageBox(title, desc, buttonarray, icon) {
    let msgbox = document.createElement("div");
    msgbox.innerHTML = `
    <div class="header"><span>${title}</span><div class="windowbuttons"><button class="close" onclick="this.parentNode.parentNode.parentNode.remove()"></button></div></div>
    <div class="desc"><img src="${icon}"></img><span>${desc}</span></div>
    <div class="buttons"></div>
    `;
    msgbox.tabIndex = 0;
    msgbox.classList.add("window");
    document.querySelector("#windows").appendChild(msgbox);
    for (let i = 0; i < buttonarray.length; i++) {
        let button = document.createElement("button");
        button.innerHTML = buttonarray[i];
        msgbox.children[2].appendChild(button);
    }
    if (icon == null) {
        msgbox.children[1].children[0].remove();
    }
    enableDraggable(msgbox);
    msgbox.style.left = "calc(50wv - 0.5em)";
    msgbox.style.top = "calc(50wv - 0.5em)";
    msgbox.style.minWidth = msgbox.clientWidth + "px";
}

function enableDraggable(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    elmnt.children[0].onmousedown = dragMouseDown;
    elmnt.children[0].ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        if (elmnt.classList.contains("maximized")) return;
        elmnt.parentNode.appendChild(elmnt);
        if (e.target.tagName === "BUTTON") {
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
        highlightDisplay(
            document.querySelector("#windowdisplays").children[
                indexOfChild(document.querySelector("#windows").children, elmnt)
            ]
        );
    }

    function dragTouchStart(e) {
        if (e.target.tagName === "BUTTON") {
            return;
        }
        e.preventDefault();
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;
        var preview = createPreviewElement(elmnt);
        document.body.appendChild(preview);
        if (elmnt.parentNode.classList.contains("nodisplay")) return;
        highlightDisplay(
            document.querySelector("#windowdisplays").children[
                indexOfChild(document.querySelector("#windows").children, elmnt)
            ]
        );
    }

    function elementDrag(e) {
        e.preventDefault();
        if (e.clientX && e.clientY) {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
        } else if (e.touches && e.touches[0]) {
            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
        }

        var preview = document.querySelector(".windowpreview");
        preview.style.left = preview.offsetLeft - pos1 + "px";
        preview.style.top = preview.offsetTop - pos2 + "px";
        if (elmnt.parentNode.classList.contains("nodisplay")) return;
        highlightDisplay(
            document.querySelector("#windowdisplays").children[
                indexOfChild(document.querySelector("#windows").children, elmnt)
            ]
        );
    }

    function closeDragElement(e) {
        if (e.touches && e.touches[0]) {
            document.ontouchend = null;
            document.ontouchmove = null;
        } else {
            document.onmouseup = null;
            document.onmousemove = null;
        }

        var preview = document.querySelector(".windowpreview");
        if (preview) {
            elmnt.style.left = preview.offsetLeft + "px";
            elmnt.style.top = preview.offsetTop + "px";
            preview.remove();
            if (elmnt.parentNode.classList.contains("nodisplay")) return;
            highlightDisplay(
                document.querySelector("#windowdisplays").children[
                    indexOfChild(
                        document.querySelector("#windows").children,
                        elmnt
                    )
                ]
            );
        }
    }

    function createPreviewElement(elmnt) {
        var preview = document.createElement("div");
        preview.classList.add("windowpreview");
        preview.style.width = elmnt.offsetWidth - 8 + "px";
        preview.style.height = elmnt.offsetHeight - 8 + "px";
        preview.style.position = "absolute";
        preview.style.left = elmnt.offsetLeft + "px";
        preview.style.top = elmnt.offsetTop + "px";
        return preview;
    }
}

function enableResizable(elmnt) {
    let group = document.createElement("div");
    group.classList.add("resizers");
    let resizerarray = ["nw", "ne", "sw", "se", "n", "s", "w", "e"];
    elmnt.append(group);
    for (let i = 0; i < 8; i++) {
        let resizer = document.createElement("div");
        resizer.classList.add("resizer");
        resizer.classList.add(resizerarray[i]);
        group.append(resizer);

        resizer.addEventListener("mousedown", function (e) {
            e.preventDefault();
            elmnt.parentNode.appendChild(elmnt);
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResize);
            highlightDisplay(
                document.querySelector("#windowdisplays").children[
                    indexOfChild(
                        document.querySelector("#windows").children,
                        elmnt
                    )
                ]
            );
        });

        function resize(e) {
            let preview;
            if (!document.querySelector(".windowpreview")) {
                preview = document.createElement("div");
                preview.classList.add("windowpreview");
                elmnt.append(preview);
            } else {
                preview = document.querySelector(".windowpreview");
            }

            if (resizerarray[i].includes("s")) {
                preview.style.height =
                    e.clientY - elmnt.getBoundingClientRect().top + "px";
            } else if (resizerarray[i].includes("n")) {
                preview.style.top =
                    elmnt.clientTop -
                    (elmnt.getBoundingClientRect().top - e.clientY) +
                    "px";
                preview.style.height =
                    elmnt.getBoundingClientRect().top +
                    elmnt.clientHeight -
                    e.clientY -
                    8 +
                    "px";
            } else {
                preview.style.height = elmnt.clientHeight - 4 + "px";
            }
            if (resizerarray[i].includes("e")) {
                preview.style.width =
                    e.clientX - elmnt.getBoundingClientRect().left + "px";
            } else if (resizerarray[i].includes("w")) {
                preview.style.left =
                    elmnt.clientLeft -
                    (elmnt.getBoundingClientRect().left - e.clientX) +
                    "px";
                preview.style.width =
                    elmnt.getBoundingClientRect().left +
                    elmnt.clientWidth -
                    e.clientX -
                    8 +
                    "px";
            } else {
                preview.style.width = elmnt.clientWidth - 4 + "px";
            }
            highlightDisplay(
                document.querySelector("#windowdisplays").children[
                    indexOfChild(
                        document.querySelector("#windows").children,
                        elmnt
                    )
                ]
            );
        }

        function stopResize() {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResize);
            let preview = document.querySelector(".windowpreview");
            if (preview != null) {
                elmnt.style.left = preview.getBoundingClientRect().left + "px";
                elmnt.style.top = preview.getBoundingClientRect().top + "px";
                elmnt.style.width = preview.clientWidth + "px";
                elmnt.style.height = preview.clientHeight + "px";
                preview.remove();
                highlightDisplay(
                    document.querySelector("#windowdisplays").children[
                        indexOfChild(
                            document.querySelector("#windows").children,
                            elmnt
                        )
                    ]
                );
            }
        }
    }
}

function createShortcut(icon, text, action) {
    let shortcut = document.createElement("div");
    shortcut.classList.add("shortcut");
    shortcut.innerHTML = `
    <img src="${icon}"></img>
    <span>${text}</span>
    `;
    shortcut.onclick = function () {
        deselectShortcuts();
        shortcut.classList.add("selected");
    };
    shortcut.ondblclick = function () {
        action();
    };
    document.querySelector("#desktop").append(shortcut);
    makeShortcutDraggable(shortcut);
}

function makeShortcutDraggable(shortcut) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    shortcut.onmousedown = dragMouseDown;
    shortcut.ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        deselectShortcuts();
        shortcut.style.top = shortcut.getBoundingClientRect().top + "px";
        shortcut.style.left = shortcut.getBoundingClientRect().left + "px";
        shortcut.style.position = "absolute";
        shortcut.classList.add("selected");
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        var preview = createPreviewElement(shortcut);
        document.querySelector("#desktop").appendChild(preview);
    }

    function dragTouchStart(e) {
        e.preventDefault();
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;
        var preview = createPreviewElement(shortcut);
        document.body.appendChild(preview);
    }

    function elementDrag(e) {
        e.preventDefault();
        if (e.clientX && e.clientY) {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
        } else if (e.touches && e.touches[0]) {
            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
        }

        var preview = document.querySelector(".shortcutpreview");
        preview.style.left = preview.offsetLeft - pos1 + "px";
        preview.style.top = preview.offsetTop - pos2 + "px";
    }

    function closeDragElement(e) {
        if (e.touches && e.touches[0]) {
            document.ontouchend = null;
            document.ontouchmove = null;
        } else {
            document.onmouseup = null;
            document.onmousemove = null;
        }

        var preview = document.querySelector(".shortcutpreview");
        if (preview) {
            shortcut.style.left = preview.offsetLeft + "px";
            shortcut.style.top = preview.offsetTop + "px";
            shortcut.classList.add();
            preview.remove();
        }
    }

    function createPreviewElement(elmnt) {
        var preview = elmnt.cloneNode(true);
        preview.classList.add("shortcutpreview");
        preview.style.position = "absolute";
        preview.style.left = elmnt.offsetLeft + "px";
        preview.style.top = elmnt.offsetTop + "px";
        preview.classList.remove("selected");
        return preview;
    }
}

function deselectShortcuts() {
    let shortcuts = document.querySelectorAll(".shortcut");
    for (let i = 0; i < shortcuts.length; i++) {
        shortcuts[i].classList.remove("selected");
    }
}

function createTextEditor() {
    let editor = document.createElement("div");
    editor.classList.add("window");
    editor.classList.add("program");
    editor.tabIndex = 0;
    editor.innerHTML = `
    <div class="header">
        <div>
            <img src="res/notepad16.png"></img>
            <span>${currentLang[9]}</span>
        </div>
        <div class="windowbuttons">
            <div>
                <button class="minimize" onclick="minimize(this.parentNode.parentNode.parentNode.parentNode)"></button>
                <button class="maximize" onclick="maximize(this, this.parentNode.parentNode.parentNode.parentNode)"></button>
            </div>
            <button class="close" onclick="this.parentNode.parentNode.parentNode.remove()"></button>
        </div>
    </div>
    <div class="menu-bar">
        <ul>
            <li tabindex="0">${currentLang[10]}</li>
            <li tabindex="0">${currentLang[11]}</li>
            <li tabindex="0">${currentLang[12]}</li>
            <li tabindex="0">${currentLang[13]}</li>
        </ul>
    </div>
    <textarea class="editor-content"></textarea>
    `;
    editor.children[2].onfocus = function () {
        editor.children[0].style.background = "#000080";
        editor.children[0].style.color = "#ffffff";
    };
    editor.children[2].onblur = function () {
        editor.children[0].style.background = "";
        editor.children[0].style.color = "";
    };
    document.querySelector("#windows").appendChild(editor);
    enableDraggable(editor);
    enableResizable(editor);
    windowDisplays();
    setTimeout(function () {
        highlightDisplay(
            document.querySelector("#windowdisplays").children[
                indexOfChild(
                    document.querySelector("#windows").children,
                    editor
                )
            ]
        );
    }, 1);
}

function maximize(button, elmnt) {
    let header = elmnt.querySelector(".header");
    let headerClone = header.cloneNode(true);
    headerClone.classList.add("clone");
    headerClone.style.width = header.clientWidth + "px";
    headerClone.style.height = header.clientHeight + "px";
    headerClone.style.left = header.getBoundingClientRect().left + "px";
    headerClone.style.top = header.getBoundingClientRect().top + "px";
    document.querySelector("body").append(headerClone);
    highlightDisplay(
        document.querySelector("#windowdisplays").children[
            indexOfChild(document.querySelector("#windows").children, elmnt)
        ]
    );
    setTimeout(function () {
        headerClone.style.top = "0px";
        headerClone.style.left = "0px";
        headerClone.style.width = "100%";
        headerClone.style.height = header.clientHeight + "px";
    }, 1);
    setTimeout(function () {
        elmnt.classList.add("maximized");
        button.classList.remove("maximize");
        button.classList.add("restore");
        button.setAttribute(
            "onclick",
            "restore(this, this.parentNode.parentNode.parentNode.parentNode)"
        );
        highlightDisplay(
            document.querySelector("#windowdisplays").children[
                indexOfChild(document.querySelector("#windows").children, elmnt)
            ]
        );
        headerClone.remove();
    }, 250);
}

function restore(button, elmnt) {
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
    highlightDisplay(
        document.querySelector("#windowdisplays").children[
            indexOfChild(document.querySelector("#windows").children, elmnt)
        ]
    );
    setTimeout(function () {
        headerClone.style.top = top;
        headerClone.style.left = left;
        headerClone.style.width = width;
        headerClone.style.height = header.clientHeight + "px";
    }, 1);
    setTimeout(function () {
        elmnt.classList.remove("maximized");
        button.classList.remove("restore");
        button.classList.add("maximize");
        button.setAttribute(
            "onclick",
            "maximize(this, this.parentNode.parentNode.parentNode.parentNode)"
        );
        highlightDisplay(
            document.querySelector("#windowdisplays").children[
                indexOfChild(document.querySelector("#windows").children, elmnt)
            ]
        );
        headerClone.remove();
    }, 250);
}

function minimize(elmnt) {
    let header = elmnt.querySelector(".header");
    let headerClone = header.cloneNode(true);
    headerClone.classList.add("clone");
    headerClone.style.width = header.clientWidth + "px";
    headerClone.style.height = header.clientHeight + "px";
    headerClone.style.left = header.getBoundingClientRect().left + "px";
    headerClone.style.top = header.getBoundingClientRect().top + "px";
    document.querySelector("body").append(headerClone);
    elmnt.focus();
    let windowDisplay =
        document.querySelector("#windowdisplays").children[
            indexOfChild(document.querySelector("#windows").children, elmnt)
        ];
    setTimeout(function () {
        headerClone.style.top =
            windowDisplay.getBoundingClientRect().top + "px";
        headerClone.style.left =
            windowDisplay.getBoundingClientRect().left + "px";
        headerClone.style.width = windowDisplay.clientWidth + "px";
    }, 1);
    setTimeout(function () {
        elmnt.classList.add("minimized");
        headerClone.remove();
    }, 250);
}

function unminimize(elmnt) {
    if (!elmnt.classList.contains("minimized")) {
        return;
    }
    let header = elmnt.querySelector(".header");
    let headerClone = header.cloneNode(true);
    let windowDisplay =
        document.querySelector("#windowdisplays").children[
            indexOfChild(document.querySelector("#windows").children, elmnt)
        ];
    headerClone.classList.add("clone");
    headerClone.style.height = header.clientHeight + "px";
    headerClone.style.width = windowDisplay.clientWidth + "px";
    headerClone.style.top = windowDisplay.getBoundingClientRect().top + "px";
    headerClone.style.left = windowDisplay.getBoundingClientRect().left + "px";
    document.querySelector("body").append(headerClone);
    setTimeout(function () {
        headerClone.style.left = header.getBoundingClientRect().left + "px";
        headerClone.style.top = header.getBoundingClientRect().top + "px";
        headerClone.style.width = header.clientWidth + "px";
    }, 1);
    setTimeout(function () {
        elmnt.classList.remove("minimized");
        headerClone.remove();
        highlightDisplay(
            document.querySelector("#windowdisplays").children[
                indexOfChild(document.querySelector("#windows").children, elmnt)
            ]
        );
    }, 250);
}

function highlightDisplay(display) {
    let displays = document.querySelector("#windowdisplays");
    for (let i = 0; i < displays.children.length; i++) {
        displays.children[i].classList.remove("pressed");
    }
    display.classList.add("pressed");
    document
        .querySelector("#windows")
        .children[indexOfChild(displays.children, display)].focus();
    unminimize(
        document.querySelector("#windows").children[
            indexOfChild(displays.children, display)
        ]
    );
}

function windowDisplays() {
    let windows = document.querySelector("#windows").children;
    let displays = document.querySelector("#windowdisplays");
    displays.replaceChildren();
    for (let i = 0; i < windows.length; i++) {
        let button = document.createElement("button");
        button.classList.add("windowdisplay");
        let img = "";
        img = windows[i].children[0].children[0].querySelector("img").outerHTML;
        console.log(img);
        button.innerHTML = `${img}<span>${
            windows[i].children[0].querySelector("span").innerHTML
        }</span>`;
        displays.append(button);
        button.setAttribute("onclick", "highlightDisplay(this)");
    }
}

function shutdownOverlay() {
    let bg = document.createElement("div");
    bg.id = "shutdown";
    bg.style.zIndex = 10;
    bg.style.background = 'url("res/shutdowncheckers.png")';
    bg.style.width = "100vw";
    bg.style.height = "100vh";
    bg.style.position = "absolute";
    bg.style.display = "flex";
    bg.style.justifyContent = "center";
    bg.style.alignItems = "center";
    bg.innerHTML = `
    <div class="window system">
        <div class="header" style="background: #000080; color: #fff">
            <div>
                <span>${currentLang[14]}</span>
            </div>
            <div class="windowbuttons">
                <button class="close" onclick="this.parentNode.parentNode.parentNode.parentNode.remove()"></button>
            </div>
        </div>
        <div class="desc">
            <img src="res/shutdownicon.png"></img>
            <div>
                <span>${currentLang[20]}</span>
                <ul class="radiolist">
                    <li><input type="radio" id="item1" name="items" value="item1"><label for="item1">${currentLang[21]}</label></li>
                    <li><input type="radio" id="item2" name="items" value="item2"><label for="item2">${currentLang[22]}</label></li>
                    <li><input type="radio" id="item3" name="items" value="item3"><label for="item3">${currentLang[23]}</label></li>
                    <li><input type="radio" id="item1" name="items" value="item4"><label for="item4">${currentLang[24]}</label></li>
                </ul>
             </div>
        </div>
        <div class="buttons">
            <button onclick="shutdownButton(document.querySelector('#shutdown input:checked').getAttribute('id'));">${currentLang[18]}</button>
            <button onclick="this.parentNode.parentNode.parentNode.remove()">${currentLang[19]}</button>
            <button onclick="this.parentNode.parentNode.parentNode.remove()">${currentLang[5]}</button>
        </div>
    </div>
    `;
    document.querySelector("body").append(bg);
}

function createProperties() {
    let properties = document.createElement("div");
    properties.classList.add("window");
    properties.classList.add("system");
    properties.id = "properties";
    properties.innerHTML = `
				<div class="header"><span>${currentLang[34]}</span><div class="windowbuttons"><button class="close" onclick="this.parentNode.parentNode.parentNode.remove()"></button></div></div>
				<div class="tabMenu">
				    <div class="tabs">
				        <div class="tab">${currentLang[35]}</div>
				        <div class="tab">${currentLang[36]}</div>
				        <div class="tab">${currentLang[37]}</div>
				        <div class="tab">${currentLang[38]}</div>
                    </div>
				    <div class="tabcontent"></div>
				</div>
				<div class="buttons">
				    <button>${currentLang[15]}</button>
				    <button>${currentLang[16]}</button>
				    <button disabled="true">${currentLang[33]}</button>
				</div>
				`;
    document.querySelector("#windows.nodisplay").append(properties);
    enableDraggable(properties);
    makeATabSwitch(Array.from(properties.querySelector(".tabs").children));
}

window.addEventListener("load", function () {
    setInterval(updateTime, 1000);
    document.querySelector("#startbar").addEventListener("click", function (e) {
        if (e.target == this) {
            disableStart();
        }
    });
    createShortcut("res/notepad32.png", "Блокнот", createTextEditor);
    let mutationObserver = new MutationObserver(() => {
        windowDisplays();
    });
    mutationObserver.observe(document.querySelector("#windows"), {
        childList: true,
    });
});

function shutdownButton(choice) {
    if (choice == "item1") {
        document.querySelector("#windows").remove();
        for (
            let i = 0;
            i < document.querySelector("#desktop").children.length;
            i++
        ) {
            document.querySelector("#desktop").children[i].remove();
        }
        document.querySelector("#startbar").remove();
        document.querySelector("#shutdown").remove();
        setTimeout(function () {
            document.querySelector("#desktop").remove();
            document.querySelector("body").style.backgroundColor = "#000";
            let shutdownText = document.createElement("span");
            shutdownText.id = "shutdowntext";
            shutdownText.innerHTML = currentLang[17];
            document.querySelector("body").append(shutdownText);
        }, 2000);
    }
}

function makeATabSwitch(tabs) {
    tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
            tabs.forEach((tab) => {
                tab.classList.remove("selected");
            });
            tab.classList.add("selected");
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const desktop = document.getElementById("desktop");
    let isSelecting = false;
    let startX, startY, endX, endY;
    let selectionBox;

    desktop.addEventListener("mousedown", function (event) {
        if (!event.target.classList.contains("shortcut")) {
            deselectShortcuts();
            isSelecting = true;
            startX = event.clientX;
            startY = event.clientY;
            selectionBox = document.createElement("div");
            selectionBox.className = "selection-box";
            desktop.appendChild(selectionBox);
            selectionBox.style.left = startX + "px";
            selectionBox.style.top = startY + "px";
            selectionBox.style.width = "0px";
            selectionBox.style.height = "0px";
        }
    });

    desktop.addEventListener("mousemove", function (event) {
        if (isSelecting) {
            endX = event.clientX;
            endY = event.clientY;
            selectionBox.style.width = Math.abs(endX - startX) + "px";
            selectionBox.style.height = Math.abs(endY - startY) + "px";
            selectionBox.style.left = Math.min(endX, startX) + "px";
            selectionBox.style.top = Math.min(endY, startY) + "px";
            selectShortcutsInBox();
        }
    });

    document.addEventListener("mouseup", function () {
        if (isSelecting) {
            isSelecting = false;
            if (selectionBox) {
                selectionBox.remove();
                selectionBox = null;
            }
        }
    });

    function selectShortcutsInBox() {
        const shortcuts = document.querySelectorAll(".shortcut");
        shortcuts.forEach((shortcut) => {
            const shortcutRect = shortcut.getBoundingClientRect();
            const boxRect = selectionBox.getBoundingClientRect();

            if (
                shortcutRect.left < boxRect.right &&
                shortcutRect.right > boxRect.left &&
                shortcutRect.top < boxRect.bottom &&
                shortcutRect.bottom > boxRect.top
            ) {
                shortcut.classList.add("selected");
            } else {
                shortcut.classList.remove("selected");
            }
        });
    }

    document.querySelector("#start span").innerText = currentLang[0];
    createProperties();
});
