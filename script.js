let langs = {
    en: [
        "Start", "Programs", "Documents", "Settings", "Search", "Help", "Run...", "Suspend", "Shut Down...",
        "Notepad", "File", "Edit", "Search", "Help",
        "Shut Down Windows", "OK", "Cancel", "It is now safe to turn off your computer",
        "Yes", "No",
        "Are you sure you want to:", "Shut down the computer?", "Restart the computer?", "Restart the computer in MS-DOS mode?", "Close all programs and log on as a different user?",
        "Accessories", "Autorun", "Explorer", "MS-DOS Prompt", "Control panel", "Printers", "Taskbar", "(None)",
        "Apply", "Display Properties", "Background",
        "Screen Saver", "Appearance", "Settings", "Browse", "Browse...",
        "Pattern", "Wallpaper", "Black Thatch", "Blue Rivets", "Bubbles", "Carved Stone", "Circles", "Clouds", "Forest", "Gold Weave", "Houndstooth", "Metal Links", "Pinstripe", "Red Blocks", "Sandstone", "Setup", "Stitches", "Straw Mat", "Tiles", "Triangles", "Waves",
        "Display:", "Tile", "Center",
        "Arrange Icons", "Line up Icons", "Paste", "Paste Shortcut", "New", "Properties", "Please wait while your computer shuts down.",
        "Games", "Internet Tools", "System Tools", "Multimedia",
        "Enter a URL-address:",
        "My Computer", "Paint", "WordPad", "Calculator", "Character Map", "Dial-Up Networking", "Network Cable Connection", "HyperTerminal", "Imaging", "Online Registration", "Phone Dialer",
        "[?] is not accessible.\n\nThe device is not ready.", "Retry",
        "Start Menu", "Desktop"
    ],
    ru: [
        "Пуск", "Программы", "Документы", "Настройка", "Поиск", "Справка", "Выполнить", "Остановка", "Завершение работы...",
        "Блокнот", "Файл", "Правка", "Поиск", "?",
        "Завершение работы с Windows", "ОК", "Отмена", "Теперь питание компьютера можно отключить",
        "Да", "Нет",
        "Сейчас следует:", "Выключить компьютер", "Перезагрузить компьютер", "Перезагрузить компьютер в режиме эмуляции MS-DOS", "Войти в систему под другим именем",
        "Стандартные", "Автозагрузка", "Проводник", "Сеанс MS-DOS", "Панель управления", "Принтеры", "Панель задач", "(Нет)",
        "Применить", "Свойства: Display", "Фон",
        "Заставка", "Оформление", "Параметры", "Обзор", "Обзор...",
        "Фоновый узор", "Рисунок", "Паркет", "Заклёпки", "Пузырьки", "Орнамент", "Колечки", "Облака", "Лес", "Чешуя", "Клыки", "Кольчуга", "Полоски", "Красные блоки", "Наждак", "Установка", "Стежки", "Циновка", "Плитка", "Треугольники", "Волны",
        "Поместить:", "Размножить", "В центре",
        "Упорядочить значки", "Выстроить значки", "Вставить", "Вставить ярлык", "Создать", "Свойства",
        "Подождите, идёт подготовка к выключению компьютера.",
        "Игры", "Средства Internet", "Служебные программы", "Мультимедиа",
		"Введите URL-адрес:",
        "Мой компьютер", "Графический редактор Paint", "Текстовый редактор WordPad", "Калькулятор", "Таблица символов", "Удалённый доступ к сети", "Прямое соединение", "Программа связи", "Просмотр рисунков", "Интерактивная регистрация", "Номеронабиратель",
        "Нет доступа к '[?]'.\n\nУстройство не готово.", "Повтор",
        "Главное меню", "Рабочий стол"
    ],
};

let col1, col2, col3, currentTool, palette, brush, brushsize, zoom;

let currentLang = langs[Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0]]
    ? langs[Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0]]
    : langs["en"];

let startedMinMax = false;

let files = {
    type: "rootfolder",
    name: currentLang[77],
    icon: "res/mycomputer",
    children: [
        {
            type: "file",
            name: "A:",
            icon: "res/A",
        },
        {
            type: "folder",
            name: "C:",
            icon: "res/C",
            children: [
                {
                    type: "folder",
                    name: "WINDOWS",
                    children: [
                        {
                            type: "folder",
                            name: "System",
                            children: []
                        },
                        {
                            type: "folder",
                            name: currentLang[91],
                            children: [],
                        },
                        {
                            type: "folder",
                            name: currentLang[90],
                            children: 
                            [
                                {
                                    type: "folder",
                                    name: currentLang[1],
                                    icon: "res/folderprograms",
                                    children:
                                    [
                                        {
                                            type: "folder",
                                            name: "Internet Explorer",
                                            icon: "res/folderprograms",
                                            children: []
                                        },
                                        {
                                            type: "folder",
                                            name: currentLang[25],
                                            icon: "res/folderprograms",
                                            children:
                                            [
                                                {
                                                    type: "folder",
                                                    name: currentLang[72],
                                                    icon: "res/folderprograms",
                                                    children: []
                                                },
                                                {
                                                    type: "folder",
                                                    name: currentLang[73],
                                                    icon: "res/folderprograms",
                                                    children: []
                                                },
                                                {
                                                    type: "folder",
                                                    name: currentLang[74],
                                                    icon: "res/folderprograms",
                                                    children: []
                                                },
                                                {
                                                    type: "folder",
                                                    name: currentLang[75],
                                                    icon: "res/folderprograms",
                                                    children: []
                                                },
                                                {
                                                    type: "shortcut",
                                                    name: currentLang[78],
                                                    icon: "res/paint",
                                                    dest: "C:\\WINDOWS\\pbrush"
                                                },
                                                {
                                                    type: "shortcut",
                                                    name: currentLang[9],
                                                    icon: "res/notepadapp",
                                                    dest: "C:\\WINDOWS\\notepad"
                                                },
                                                {
                                                    type: "shortcut",
                                                    name: currentLang[80],
                                                    icon: "res/calc",
                                                    dest: "C:\\WINDOWS\\calc"
                                                },
                                            ]
                                        },
                                        {
                                            type: "folder",
                                            name: currentLang[26],
                                            icon: "res/folderprograms",
                                            children: 
                                            []
                                        },
                                        {
                                            type: "shortcut",
                                            name: currentLang[28],
                                            icon: "res/msdos",
                                            dest: "C:\\WINDOWS\\command"
                                        }
                                    ]
                                }
                            ],
                        },
                        {
                            type: "file",
                            name: "command",
                            ext: "com",
                            action: function() { createMsDos(); }
                        },
                        {
                            type: "file",
                            name: "notepad",
                            ext: "exe",
                            icon: "res/notepad",
                            action: function() { createTextEditor(); }
                        },
                        {
                            type: "file",
                            name: "calc",
                            ext: "exe",
                            icon: "res/calc",
                            action: function() { createCalc(); }
                        },
                        {
                            type: "file",
                            name: "pbrush",
                            ext: "exe",
                            icon: "res/pbrush",
                            action: function() { createPaint(); }
                        },
                    ]
                },
                {
                    type: "folder",
                    name: "Program Files",
                    children: []
                },
            ],
        },
        {
            type: "file",
            name: "D:",
            icon: "res/D",
        },
    ],
};

let newWindowTop = 50, newWindowLeft = 50;

function syncDesktopWithFolder() {
    let desktopElement = document.querySelector("#desktop");
    let desktopFolder = findByPath("C:\\WINDOWS\\" + currentLang[91]);

    desktopElement.innerHTML = "";

    desktopFolder.children.forEach(child => {
        createShortcut(child.icon + "32.png", child.name, child.action, null);
    });
}

function syncFolderWithDesktop() {
    let desktopElement = document.querySelector("#desktop");
    let desktopFolder = findByPath("C:\\WINDOWS\\" + currentLang[91]);

    desktopFolder.children = [];

    Array.from(desktopElement.children).forEach(shortcut => {
        let name = shortcut.querySelector("span").textContent;
        let icon = shortcut.querySelector("img").src;
        let action = shortcut.ondblclick;

        desktopFolder.children.push({
            type: "file",
            name: name,
            icon: icon.replace("32.png", ""),
            action: action,
        });
    });
}

function findByPath(path) {
    let current = files;
    let pathparts = path.split("\\");
    for (let part of pathparts) {
        current = current.children.find(child => child.name === part);
        if (!current) {
            console.error(`${part} not found`);
            return null;
        }
    }
    return current;
}

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

function sortOther(elmnt) {
    let children = Array.from(elmnt.children);

    children.sort((a, b) => {
        const aText = a.textContent.trim().toLowerCase();
        const bText = b.textContent.trim().toLowerCase();

        if (aText < bText) return -1;
        if (aText > bText) return 1;
        return 0;
    });

    elmnt.innerHTML = "";

    children.forEach((child) => {
        elmnt.appendChild(child);
    });
}

function sortShortcuts(elmnt) {
    if (elmnt == null) {
        elmnt = document.querySelector("#desktop");
    }
    let shortcuts = Array.from(elmnt.querySelectorAll(".shortcut"));
    shortcuts.sort((a, b) => {
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

    elmnt.innerHTML = "";
    shortcuts.forEach((shortcut) => {
        elmnt.appendChild(shortcut);
    });

    let left = 0;
    let top = elmnt.classList.contains("expcontent") ? 48 : 0;
    let incrementLeft = 99;
    let incrementTop = 75;
    for (let i = 0; i < elmnt.children.length; i++) {
        let shrtct = elmnt.children[i];
        if (elmnt == document.querySelector("#desktop")) {
            if (top > elmnt.clientHeight - incrementTop) {
                left += incrementLeft;
                top = 0;
            }
        }
        else {
            if (left > elmnt.clientHeight - incrementLeft) {
                top += incrementTop;
                left = 0;
            }
        }
        shrtct.style.left = left + "px";
        shrtct.style.top = top + "px";
        if (elmnt == document.querySelector("#desktop")) {
            top += incrementTop;
        } else {
            left += incrementLeft;
        }
    }
}

function updateTime() {
    let date = new Date();
    let minutes = date.getMinutes();
    if (minutes.toString().length == 1) minutes = "0" + minutes;

    let time = date.getHours() + ":" + minutes;
    if (currentLang == langs["en"]) {
        let ampm;
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        date.getHours() >= 12 ? (ampm = " PM") : (ampm = " AM");
        time = hours + ":" + minutes + ampm;
    }
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
        <div class="sep"></div>
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

function disableStart() {
    document.querySelector("#start").classList.remove("pressed");
    document.querySelector("#startmenu")?.remove();
}

function disableContextMenu() {
    document.querySelector("#contextmenu")?.remove();
}

function createWindow({
    title = untitled,
    icon = "",
    html,
    draggable = true,
    resizable = true,
    additionalClasses = [],
    menu = [],
    id = "",
    minimizable = true,
    maximizable = true,
    maximizeOnStart = false
}) {
    disableStart();
    let wndw = document.createElement("div");
    wndw.classList.add("window");
    if (additionalClasses) wndw.classList.add(...additionalClasses);
    if (id) wndw.id = id;
    wndw.tabIndex = 0;
    let buttons = "";
    if (minimizable) buttons += '<button class="minimize" onclick="minimize(this.parentNode.parentNode.parentNode.parentNode)"></button>';
    if (maximizable) {
        buttons += '<button class="maximize" onclick="maximize(this.parentNode.parentNode.parentNode.parentNode)"></button>';
        wndw.style.width = window.innerWidth * 0.75 + "px";
        wndw.style.height = window.innerHeight * 0.75 + "px";
    }
    if (wndw.style.height + newWindowTop > window.innerHeight || wndw.style.width + newWindowTop > window.innerWidth)
    {
        newWindowLeft = 0;
        newWindowTop = 0;
    }
    wndw.style.top = newWindowTop + "px";
    wndw.style.left = newWindowLeft + "px";
    newWindowTop += 22;
    newWindowLeft += 22;

    wndw.innerHTML = `
        <div class="header">
            <div>
                <img src="${icon}"></img>
                <span>${title}</span>
            </div>
            <div class="windowbuttons">
                <div>
                    ${buttons}
                </div>
                <button class="close" onclick="this.parentNode.parentNode.parentNode.remove()"></button>
            </div>
        </div>
    `;

    if (menu)
    {
        let menuBar = document.createElement("div");
        menuBar.classList.add("menu-bar");
        menuBar.innerHTML = "<ul></ul>";
        wndw.appendChild(menuBar);
        for (let i = 0; i < menu.length; i++)
        {
            let menuItem = document.createElement("li");
            menuItem.innerText = menu[i];
            wndw.querySelector(".menu-bar > ul").appendChild(menuItem);
        }
    }

    let contents = document.createElement("div");
    wndw.appendChild(contents);
    contents.outerHTML = html;

    document.querySelector("#windows").append(wndw);
    wndw.onfocus = function() { bringToTop(wndw); };
    if (draggable) enableDraggable(wndw);
    if (resizable) enableResizable(wndw);
    bringToTop(wndw);
    return wndw;
}

function createMessageBox(title, desc, buttonarray, onclickarray, icon) {
    let msgbox = document.createElement("div");
    msgbox.innerHTML = `
    <div class="header"><span>${title}</span><div class="windowbuttons"><button class="close" onclick="this.parentNode.parentNode.parentNode.remove()"></button></div></div>
    <div class="desc"><img src="${icon}"></img><span>${desc}</span></div>
    <div class="buttons"></div>
    `;
    msgbox.tabIndex = 0;
    msgbox.classList.add("window");
    document.querySelector("#windows.nodisplay").appendChild(msgbox);
    for (let i = 0; i < buttonarray.length; i++) {
        let button = document.createElement("button");
        button.innerHTML = buttonarray[i];
        button.onclick = onclickarray[i] || function() {msgbox.remove()};
        msgbox.children[2].appendChild(button);
    }
    if (icon == null) {
        msgbox.children[1].children[0].remove();
    }
    enableDraggable(msgbox);
    msgbox.style.left = "calc(50vw - 0.5em)";
    msgbox.style.top = "calc(50vw - 0.5em)";
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
        elmnt.focus();
        if (elmnt.classList.contains("maximized")) return;
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
        bringToTop(elmnt);
    }

    function dragTouchStart(e) {
        if (e.target.tagName === "BUTTON") {
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

    function elementDrag(e) {
        elmnt.focus();
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
            document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]
        );
    }

    function closeDragElement(e) {
        elmnt.focus();
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
                document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]
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
    let minWidth = 180;
    let minHeight = 77;
    for (let i = 0; i < 8; i++) {
        let resizer = document.createElement("div");
        resizer.classList.add("resizer");
        resizer.classList.add(resizerarray[i]);
        group.append(resizer);

        resizer.addEventListener("mousedown", function (e) {
            e.preventDefault();
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResize);
            bringToTop(window);
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
                let newHeight = e.clientY - elmnt.getBoundingClientRect().top;
                if (newHeight >= minHeight) {
                    preview.style.height = newHeight + "px";
                }
            } else if (resizerarray[i].includes("n")) {
                let newTop = elmnt.clientTop - (elmnt.getBoundingClientRect().top - e.clientY);
                let newHeight = elmnt.getBoundingClientRect().top + elmnt.clientHeight - e.clientY;
                if (newHeight > minHeight) {
                    preview.style.top = newTop + "px";
                    preview.style.height = newHeight + "px";
                }
            } else {
                preview.style.height = elmnt.clientHeight + "px";
            }

            if (resizerarray[i].includes("e")) {
                let newWidth = e.clientX - elmnt.getBoundingClientRect().left;
                if (newWidth >= minWidth) {
                    preview.style.width = newWidth + "px";
                }
            } else if (resizerarray[i].includes("w")) {
                let newLeft = elmnt.clientLeft - (elmnt.getBoundingClientRect().left - e.clientX);
                let newWidth = elmnt.getBoundingClientRect().left + elmnt.clientWidth - e.clientX;
                if (newWidth > minWidth) {
                    preview.style.left = newLeft + "px";
                    preview.style.width = newWidth + "px";
                }
            } else {
                preview.style.width = elmnt.clientWidth + "px";
            }
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
                highlightDisplay(document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]);
            }
        }
    }
}

function createShortcut(icon, text, action, place) {
    let shortcut = document.createElement("div");
    shortcut.classList.add("shortcut");
    shortcut.innerHTML = `
        <img src="${icon}"></img>
        <span>${text}</span>
    `;
    shortcut.onclick = function (e) {
        if (e.ctrlKey || e.metaKey) {
            shortcut.classList.toggle("selected");
        } else {
            deselectShortcuts();
            shortcut.classList.add("selected");
        }
    };
    shortcut.ondblclick = function () {
        action();
    };
    if (place && place !== document.querySelector("#desktop")) {
        place.querySelector(".expcontent").append(shortcut);
    } 
    else {
        document.querySelector("#desktop").append(shortcut);
        syncFolderWithDesktop();
    }
    if (shortcut.parentNode == document.querySelector("#desktop")) {
        makeShortcutDraggable(shortcut);
    }
}

function makeShortcutDraggable(shortcut) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    shortcut.onmousedown = dragMouseDown;
    shortcut.ontouchstart = dragTouchStart;
    let selectedshortcuts;

    function dragMouseDown(e) {
        selectedshortcuts = document.querySelectorAll(".shortcut.selected");
        if (!shortcut.classList.contains("selected")) {
            deselectShortcuts();
            shortcut.classList.add("selected");
            selectedshortcuts = [shortcut];
        }
        selectedshortcuts.forEach((selectedshortcut) => {
            selectedshortcut.style.top = selectedshortcut.getBoundingClientRect().top - selectedshortcut.parentNode.getBoundingClientRect().top + "px";
            selectedshortcut.style.left = selectedshortcut.getBoundingClientRect().left - selectedshortcut.parentNode.getBoundingClientRect().left; + "px";
            selectedshortcut.style.position = "absolute";
            selectedshortcut.classList.add("selected");
            let preview = createPreviewElement(selectedshortcut);
            document.querySelector("#desktop").appendChild(preview);
        });
        if (e.buttons != 1) return;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
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

        let previews = document.querySelectorAll(".shortcutpreview");
        previews.forEach((preview) => {
            preview.style.left = preview.offsetLeft - pos1 + "px";
            preview.style.top = preview.offsetTop - pos2 + "px";
        });
    }

    function closeDragElement(e) {
        if (e.touches && e.touches[0]) {
            document.ontouchend = null;
            document.ontouchmove = null;
        } else {
            document.onmouseup = null;
            document.onmousemove = null;
        }

        let previews = document.querySelectorAll(".shortcutpreview");

        for (let i = 0; i < previews.length; i++) {
            if (previews[i]) {
                selectedshortcuts[i].style.left = previews[i].offsetLeft + "px";
                selectedshortcuts[i].style.top = previews[i].offsetTop + "px";
                previews[i].remove();
            }
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
    document.querySelectorAll(".shortcut").forEach((shortcut) => shortcut.classList.remove("selected"));
}

function createTextEditor() {
    html = `<textarea class="editor-content"></textarea>`;
    let editor = createWindow({
        title: currentLang[9],
        icon: "res/notepad16.png",
        html: html,
        additionalClasses: ["program"],
        menu: [currentLang[10], currentLang[11], currentLang[12], currentLang[13]],
        id: "notepad"});
}

function createExplorer(directory) {
    let html = `<div class="expcontent"></div>
    <div class="statusbar"><span>bebebe 123 123 test</span></div>`;
    if (!directory) directory = files;
    let icon = directory.icon || "res/folder";
    let explorer = createWindow({
        title: directory.name,
        icon: icon + "16.png",
        html: html,
        additionalClasses: ["program"],
        menu: [currentLang[10], currentLang[11], currentLang[12], currentLang[13]],
        id: "explorer",});
    directory.children.forEach((child) => {
        let type = child.type;
        let action = child.action;
        let icon = child.icon;
        let name = child.name;
        let cont = child.cont;
        let dest = child.dest;
        let ext = child.ext;
        if (type == "folder") {
            action = function(){createExplorer(child)};
            icon = icon ? icon + "32.png" : "res/folder32.png";
        }
        else if (type == "file") {
            if (icon) {
                icon = icon + "32.png";
            }
            else {
                if (ext == "exe") icon = "res/program32.png";
                else if (ext == "txt") icon = "res/notepad32.png";
                else icon = "unknown32.png";
            }
        }
        else if (type == "shortcut") {
            action = findByPath(dest).action;
            icon = icon ? icon : dest.icon;
        }
        createShortcut(icon, name, action, explorer);
    });
    sortShortcuts(explorer.querySelector(".expcontent"));
}

function maximize(button, elmnt) {
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
        button.setAttribute("onclick", "restore(this, this.parentNode.parentNode.parentNode.parentNode)");
        highlightDisplay(
            document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]
        );
        headerClone.remove();
        startedMinMax = false;
    }, 250);
}

function restore(button, elmnt) {
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
        button.setAttribute("onclick", "maximize(this, this.parentNode.parentNode.parentNode.parentNode)");
        highlightDisplay(
            document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]
        );
        headerClone.remove();
        startedMinMax = false;
    }, 250);
}

function minimize(elmnt) {
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
    setTimeout(function () {
        headerClone.style.top = windowDisplay.getBoundingClientRect().top + "px";
        headerClone.style.left = windowDisplay.getBoundingClientRect().left + "px";
        headerClone.style.width = windowDisplay.clientWidth + "px";
    }, 1);
    setTimeout(function () {
        elmnt.classList.add("minimized");
        headerClone.remove();
        startedMinMax = false;
        windowDisplay.classList.remove("pressed");
    }, 250);
}

function unminimize(elmnt) {
    if (!elmnt || !elmnt.classList.contains("minimized")) {
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
    setTimeout(function () {
        headerClone.style.left = header.getBoundingClientRect().left + "px";
        headerClone.style.top = header.getBoundingClientRect().top + "px";
        headerClone.style.width = header.clientWidth + "px";
    }, 1);
    setTimeout(function () {
        elmnt.classList.remove("minimized");
        headerClone.remove();
        highlightDisplay(
            document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]
        );
    }, 250);
}

function highlightDisplay(display) {
    document.querySelectorAll(".windowdisplay").forEach((disp) => {
        disp.classList.remove("pressed");
    })
    display.classList.add("pressed");
    document.querySelector("#windows").children[indexOfChild(document.querySelectorAll(".windowdisplay"), display)].focus();
    unminimize(document.querySelector("#windows").children[indexOfChild(document.querySelectorAll(".windowdisplay"), display)]);
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
        button.innerHTML = `${img}<span>${windows[i].children[0].querySelector("span").innerHTML}</span>`;
        displays.append(button);
        button.setAttribute("onclick", "highlightDisplay(this)");
        Array.from(windows).concat(Array.from(document.querySelector("#windows.nodisplay"))).forEach((window) => {
            Array.from(window.children).forEach((child) => {
                child.onfocus = function () {
                    window.querySelector(".header").style.background = "#000080";
                    window.querySelector(".header span").style.textShadow = "0.5px 0px #fff, 1.5px 0px #fff";
                };
                child.onblur = function () {
                    window.querySelector(".header").style.background = "";
                    window.querySelector(".header span").style.textShadow = "";
                };
            });
        });
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
        <div class="header" style="background: #000080;">
            <div>
                <span style="text-shadow: 0.5px 0px #fff, 1.5px 0px #fff;">${currentLang[14]}</span>
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
                    <li><input type="radio" id="sd1" name="items" value="sd1"><label for="sd1">${currentLang[21]}</label></li>
                    <li><input type="radio" id="sd2" name="items" value="sd2"><label for="sd2">${currentLang[22]}</label></li>
                    <li><input type="radio" id="sd3" name="items" value="sd3"><label for="sd3">${currentLang[23]}</label></li>
                    <li><input type="radio" id="sd4" name="items" value="sd4"><label for="sd4">${currentLang[24]}</label></li>
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
    disableContextMenu();
    let properties = document.createElement("div");
    properties.classList.add("window");
    properties.classList.add("system");
    properties.id = "properties";
    properties.innerHTML = `
    <div class="header"><span>${currentLang[34]}</span><div class="windowbuttons"><button class="close" onclick="this.parentNode.parentNode.parentNode.remove()"></button></div></div>
    <div class="tabMenu">
        <div class="tabs">
            <div id="ppbg" class="tab selected">${currentLang[35]}</div>
            <div id="ppss" class="tab">${currentLang[36]}</div>
            <div id="ppap" class="tab">${currentLang[37]}</div>
            <div id="pppr" class="tab">${currentLang[38]}</div>
        </div>
        <div class="tabcontent">
            <div class="monitor">
                <div class="monitorbg"></div>
                <div class="monitorimg"></div>
            </div>
            <div class="boxcontain">
                <div class="groupBox" text="${currentLang[41]}">
                    <select size="20">
                        <option>${currentLang[32]}</option>
                    </select>
                    <button disabled>deez nuts</button>
                </div>
                <div class="groupBox" text="${currentLang[42]}">
                    <select id="wppick" size="20">
                        <option>${currentLang[32]}</option>
                        <option>${currentLang[43]}</option>
                        <option>${currentLang[44]}</option>
                        <option>${currentLang[45]}</option>
                        <option>${currentLang[46]}</option>
                        <option>${currentLang[47]}</option>
                        <option>${currentLang[48]}</option>
                        <option>${currentLang[49]}</option>
                        <option>${currentLang[50]}</option>
                        <option>${currentLang[51]}</option>
                        <option>${currentLang[52]}</option>
                        <option>${currentLang[53]}</option>
                        <option>${currentLang[54]}</option>
                        <option>${currentLang[55]}</option>
                        <option>${currentLang[56]}</option>
                        <option>${currentLang[57]}</option>
                        <option>${currentLang[58]}</option>
                        <option>${currentLang[59]}</option>
                        <option>${currentLang[60]}</option>
                        <option>${currentLang[61]}</option>
                    </select>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>${currentLang[62]}</span>
                        <button onclick="openDialogPlaceholder();">${currentLang[40]}</button>
                    </div>
                    <div>
                        <ul id="wptile" class="radiolistH">
                            <li><input type="radio" id="item1" name="items" value="item1" checked><label for="item1">${currentLang[63]}</label></li>
                            <li><input type="radio" id="item2" name="items" value="item2"><label for="item2">${currentLang[64]}</label></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="buttons">
        <button onclick="setWallpaper(document.querySelector('#wppick').value, document.querySelector('#wptile input:checked + label').innerText); this.parentNode.parentNode.remove();">${currentLang[15]}</button>
        <button onclick="this.parentNode.parentNode.remove();">${currentLang[16]}</button>
        <button disabled onclick="setWallpaper(document.querySelector('#wppick').value, document.querySelector('#wptile input:checked + label').innerText); this.setAttribute('disabled','')">${currentLang[33]}</button>
    </div>
    `;
    properties.tabIndex = 0;
    properties.querySelectorAll("select").forEach((select) => {
        sortOther(select);
        select.addEventListener("change", function () {
            properties.querySelector(".buttons > button[disabled]")?.removeAttribute("disabled");
            setWallpaper(select.value, properties.querySelector("input:checked + label").innerText, true);
        });
    });
    properties.querySelectorAll("input + label").forEach((input) => {
        input.addEventListener("click", () => {
            properties.querySelector(".buttons > button[disabled]")?.removeAttribute("disabled");
            setWallpaper(properties.querySelector("#wppick").value, input.innerText, true);
        });
    });
    document.querySelector("#windows.nodisplay").append(properties);
    enableDraggable(properties);
    makeATabSwitch(properties.querySelector(".tabs"));
}

function setCustomWall(elmnt) {
    setWallpaper(elmnt.parentNode.parentNode.children[2].value, document.querySelector('#properties input[type="radio"]:checked + label').innerText);
    document.querySelector('#properties').remove();
    elmnt.parentNode.parentNode.remove();
}

function openDialogPlaceholder() {
    let dialog = document.createElement("div");
    dialog.innerHTML = `
    <div class="header"><span>${currentLang[40]}</span><div class="windowbuttons"><button class="close" onclick="this.parentNode.parentNode.parentNode.remove()"></button></div></div>
    <div class="desc"><span>${currentLang[76]}</span></div>
	<input></input>
    <div class="buttons"><button onclick="setCustomWall(this);">${currentLang[15]}</button></div>
    `;
    dialog.tabIndex = 0;
    dialog.classList.add("window");
    document.querySelector("#windows.nodisplay").appendChild(dialog);
    enableDraggable(dialog);
    dialog.style.left = "calc(50wv - 0.5em)";
    dialog.style.top = "calc(50wv - 0.5em)";
    dialog.style.minWidth = dialog.clientWidth + "px";
}

window.addEventListener("load", function () {
    setInterval(updateTime, 1000);
    document.querySelector("#startbar").addEventListener("click", function (e) {
        if (e.target == this) {
            disableStart();
        }
    });
    let mutationObserver = new MutationObserver(() => {
        windowDisplays();
    });
    mutationObserver.observe(document.querySelector("#windows"), {
        childList: true,
    });
});

function shutdownButton(choice) {
    if (choice == "sd1") {
        shutdown();
    }
}

function shutdown() {
    document.querySelector("#windows.nodisplay").replaceChildren();
    document.querySelector("#windows").replaceChildren();
    for (let i = 0; i < document.querySelector("#desktop").children.length; i++) {
        document.querySelector("#desktop").children[i].remove();
    }
    document.querySelector("#startbar").style.display = "none";
    document.querySelector("#shutdown")?.remove();
    let shutdownScreen = document.createElement("div");
    document.body.appendChild(shutdownScreen);
    let shutdownText = document.createElement("span");
    shutdownText.id = "shutdowntext";
    document.querySelector("body").append(shutdownText);
    let audio = new Audio("res/audio/TADA.wav");
    audio.play();
    setTimeout(function () {
        shutdownScreen.style.position = "absolute";
        shutdownScreen.style.background = "url(res/shutdownbg.png)";
        shutdownScreen.style.backgroundSize = "100vw 100vh";
        shutdownScreen.style.width = "100vw";
        shutdownScreen.style.height = "100vh";
        shutdownScreen.zIndex = "999";
        shutdownText.zIndex = "1000";
        shutdownText.innerHTML = currentLang[71];
    }, 2000);
    setTimeout(function () {
        shutdownScreen.remove();
        document.querySelector("#desktop").style.display = "none";
        document.querySelector("#bg").style.display = "none";
        document.querySelector("body").style.backgroundColor = "#000";

        shutdownText.innerHTML = currentLang[17];
    }, 5000);
}

function bootUp() {
    let bootScreen = document.createElement("div");
    bootScreen.style.background = "url(res/startup.gif)";
    bootScreen.style.backgroundSize = "contain";
    bootScreen.style.backgroundColor = "black";
    bootScreen.style.backgroundRepeat = "no-repeat";
    bootScreen.style.backgroundPosition = "center";
    bootScreen.style.width = "100vw";
    bootScreen.style.height = "100vh";
    bootScreen.style.zIndex = "999";
    bootScreen.style.position = "absolute";
    document.querySelector("body").append(bootScreen);
    setTimeout(function() {
        bootScreen.remove();
        let audio = new Audio("res/audio/The Microsoft Sound.wav");
        audio.play();
    }, 2000);
}

function createPaint() {
    let html = `
    <div class="content">
        <div class="sidebar">
            <div class="tools">
                <div>
                    <button id="select2"><img src="res/paint/star.png"></img></button>
                    <button id="select"><img src="res/paint/select.png"></img></button>
                    <button id="eraser"><img src="res/paint/eraser.png"></img></button>
                    <button id="bucket"><img src="res/paint/bucket.png"></img></button>
                    <button id="picker"><img src="res/paint/picker.png"></img></button>
                    <button id="zoom"><img src="res/paint/zoom.png"></img></button>
                    <button id="pencil" class="pressed"><img src="res/paint/pencil.png"></img></button>
                    <button id="brush"><img src="res/paint/brush.png"></img></button>
                    <button id="spray"><img src="res/paint/spray.png"></img></button>
                    <button id="text"><img src="res/paint/text.png"></img></button>
                    <button id="line"><img src="res/paint/line.png"></img></button>
                    <button id="curvedline"><img src="res/paint/curvedline.png"></img></button>
                    <button id="rectangle"><img src="res/paint/rectangle.png"></img></button>
                    <button id="customshape"><img src="res/paint/huina.png"></img></button>
                    <button id="circle"><img src="res/paint/circle.png"></img></button>
                    <button id="roundrect"><img src="res/paint/roundrect.png"></img></button>
                </div>
                <div class="options"></div>
            </div>
        </div>
        <div class="draw">
            <svg width="0" height="0" style="position:absolute;z-index:-1;">
                <defs>
                    <filter id="remove-alpha" x="0" y="0" width="100%" height="100%">
                        <feComponentTransfer>
                        <feFuncA type="discrete" tableValues="0 1"></feFuncA>
                        </feComponentTransfer>
                    </filter>
                </defs>
            </svg>
            <canvas id="paintCanvas" oncontextmenu="return false;"></canvas>
        </div>
        <div class="footer">
            <div class="colormenu">
                <div class="colordisplay">
                    <div class="color2"></div>
                    <div class="color1"></div>
                </div>
                <div class="colors">
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                </div>
            </div>
        </div>
        <div class="statusbar"></div>
    </div>`;
    let paint = createWindow({
        title: "Untitled - Paint",
        icon: "res/drawing16.png",
        html: html,
        additionalClasses: ["program"],
        menu: [currentLang[10], currentLang[11], currentLang[12], currentLang[13]],
        id: "paint"});
    col1 = "#000000";
    col2 = "#ffffff";
    currentTool = "pencil";
    palette = ["#000000", "#ffffff", "#808080", "#dfdfdf", "#800000", "#ff0000", "#808000", "#ffff00", "#008000", "#00ff00", "#008080", "#00ffff", "#000080", "#0000ff",
    "#800080", "#ff00ff", "#808040", "#ffff80", "#004040", "#00ff80", "#0080ff", "#80ffff", "#004080", "#8080ff", "#4000ff", "#ff0080", "#804000", "#ff8040"];
    zoom = 1;
    initializeCanvas(paint.querySelector("#paintCanvas"));
    paint.querySelectorAll(".tools button").forEach(btn => btn.onclick = function() {selectTool(btn.id)});
    paint.querySelectorAll(".color").forEach(color => color.style.background = palette[indexOfChild(color.parentNode.children, color)]);
    paint.querySelectorAll(".color").forEach(color => color.onmousedown = function(e) {
        console.log(e.buttons)
        if (e.buttons == 1) {
            col1 = palette[indexOfChild(color.parentNode.children, color)];
            paint.querySelector(".color1").style.background = col1;
        }
        else if (e.buttons == 2) {
            col2 = palette[indexOfChild(color.parentNode.children, color)];
            paint.querySelector(".color2").style.background = col2;
        }
    });
}

function bringToTop(window)
{
    let windows = document.querySelector("#windows").children;
    let highestIndex = 0;
    for (let i = 0; i < windows.length; i++)
    {
        if (windows[i].style.zIndex > highestIndex)
        {
            highestIndex = parseInt(windows[i].style.zIndex);
        }
    }

    console.log(highestIndex);

    if (highestIndex == 0) {
        window.style.zIndex = 1;
        return;
    }

    if (window.style.zIndex != highestIndex) window.style.zIndex = highestIndex + 1;
    windowDisplays();
    setTimeout(function () {highlightDisplay(document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, window)]);}, 1);
    balanceZIndexes();
}

function balanceZIndexes() {
    const windows = document.querySelector("#windows").children;
    const zIndexes = [];

    for (let i = 0; i < windows.length; i++) {
        zIndexes.push(parseInt(windows[i].style.zIndex || 0));
    }

    const minZ = Math.min(...zIndexes);

    if (minZ > 1) {
        const offset = minZ - 1;
        for (let i = 0; i < windows.length; i++) {
            let currentZ = parseInt(windows[i].style.zIndex || 0);
            windows[i].style.zIndex = (currentZ - offset).toString();
        }
    }
}

function selectTool(tool) {
    document.querySelectorAll('.tools button').forEach(btn => btn.classList.remove('pressed'));
    document.getElementById(tool).classList.add('pressed');
    currentTool = tool;
}

function initializeCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let painting = false;
    canvas.style.backgroundColor = col2;
    ctx.imageSmoothingEnabled = false;
    let lastx, lasty;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
        lastx = 0;
        lasty = 0;
    }

    function drawLine(x0, y0, x1, y1, color) {
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = (x0 < x1) ? 1 : -1;
        const sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            ctx.fillStyle = color;
            ctx.fillRect(x0, y0, brushsize, brushsize);
            if (x0 === x1 && y0 === y1) break;
            const e2 = 2 * err;
            if (e2 > -dy) { err -= dy; x0 += sx; }
            if (e2 < dx) { err += dx; y0 += sy; }
        }
    }

    function draw(e) {
        if (!painting) return;
        let posx = e.clientX - canvas.getBoundingClientRect().left;
        let posy = e.clientY - canvas.getBoundingClientRect().top;
        let col = e.buttons == 1 ? col1 : 2 ? col2 : "";
        if (currentTool == "pencil") {
            ctx.fillStyle = col;
            brushsize = 1;
            ctx.fillRect(posx, posy, brushsize, brushsize);
            if (lastx && lasty) {
                drawLine(lastx, lasty, posx, posy, col);
            }
            lastx = posx;
            lasty = posy;
        }
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw, {passive: true, capture: true});
    canvas.addEventListener('mouseleave', function() { lastx = 0; lasty = 0; });
}

function createCalc() {
    let html = `
    <div class="sep"></div>
    <div class="content">
        <input readonly value="0," class="result"></input>
        <div class="toprow">
            <input readonly class="mem"></input>
            <div>
                <button class="big dkrd">Back</button>
                <button class="big dkrd">CE</button>
                <button class="big dkrd">C</button>            
            </div>
        </div>
        <div class="leftcolumn">
            <button class="red">MC</button>
            <button class="red">MR</button>
            <button class="red">MS</button>
            <button class="red">M+</button>
        </div>
        <div class="btns">
            <button class="blue">7</button><button class="blue">8</button><button class="blue">9</button><button class="red">/</button><button class="dkbl">sqrt</button>
            <button class="blue">4</button><button class="blue">5</button><button class="blue">6</button><button class="red">*</button><button class="dkbl">%</button>
            <button class="blue">1</button><button class="blue">2</button><button class="blue">3</button><button class="red">-</button><button class="dkbl">1/x</button>
            <button class="blue">0</button><button class="blue">+/-</button><button class="blue">,</button><button class="red">+</button><button class="red">=</button>
        </div>
    </div>`;
    let calc = createWindow({
        title: currentLang[80],
        icon: "res/calc16.png",
        html: html,
        maximizable: false,
        additionalClasses: ["program"],
        menu: [currentLang[11], currentLang[12], currentLang[13]],
        id: "calc"});

    let num1 = "", num2 = "", oper = "", memory = 0, currentNum = 1, gotResult = false;

    function updateDisplay(value) {
        calc.querySelector(".result").value = value.toString().replace(".", ",");
        if (!calc.querySelector(".result").value.includes(",")) calc.querySelector(".result").value += ",";
    }

    calc.querySelectorAll(".content button").forEach((button) => {
        button.onclick = function () {
            let text = button.innerText;

            if ("1234567890".includes(text) || text === ",") {
                if (gotResult) {
                    gotResult = false;
                    currentNum = 1;
                    num1 = "";
                    num2 = "";
                    oper = "";
                    updateDisplay(0);
                }

                if (currentNum === 1) {
                    if (text === "," && num1.includes(",")) return;
                    num1 = (num1 + text).replace(/^0+/, '') || "0";
                    if (num1[0] == ",") num1 = 0 + num1;
                    updateDisplay(num1);
                } else {
                    if (text === "," && num2.includes(".")) return;
                    num2 = (num2 + text).replace(/^0+/, '') || "0";
                    if (num2[0] == ",") num2 = 0 + num2;
                    updateDisplay(num2);
                }
            } else if ("+-/*".includes(text) && num1) {
                if (gotResult) {
                    num1 = calc.querySelector(".result").value;
                    num2 = "";
                    gotResult = false;
                }
                currentNum = 2;
                oper = text;
            } else if (text === "=" && num1 && num2 && oper) {
                let result;
                let x = parseFloat(num1.replace(",", "."));
                let y = parseFloat(num2.replace(",", "."));
                switch (oper) {
                    case "+":
                        result = x + y;
                        break;
                    case "-":
                        result = x - y;
                        break;
                    case "*":
                        result = x * y;
                        break;
                    case "/":
                        result = x / y;
                        break;
                }
                updateDisplay(result);
                num1 = result.toString();
                gotResult = true;
            } else if (text === "Back" && !gotResult) {
                if (currentNum === 1 && num1) {
                    num1 = num1.slice(0, -1);
                    updateDisplay(num1 || 0);
                } else if (currentNum === 2 && num2) {
                    num2 = num2.slice(0, -1);
                    updateDisplay(num2 || 0);
                }
            } else if (text === "CE") {
                if (gotResult) {
                    updateDisplay(0);
                } else if (currentNum === 1) {
                    num1 = "";
                    updateDisplay(0);
                } else if (currentNum === 2) {
                    num2 = "";
                    updateDisplay(0);
                }
            } else if (text === "C") {
                gotResult = false;
                currentNum = 1;
                num1 = "";
                num2 = "";
                oper = "";
                updateDisplay(0);
            } else if (text === "MS") {
                memory = parseFloat(calc.querySelector(".result").value.replace(",", "."));
                calc.querySelector(".mem").value = memory === 0 ? "" : "M";
            } else if (text === "M+") {
                memory += parseFloat(calc.querySelector(".result").value.replace(",", "."));
                calc.querySelector(".mem").value = memory === 0 ? "" : "M";
            } else if (text === "MC") {
                memory = 0;
                calc.querySelector(".mem").value = "";
            } else if (text === "MR") {
                if (gotResult || currentNum === 1) {
                    num1 = memory.toString();
                    updateDisplay(num1);
                } else if (currentNum === 2) {
                    num2 = memory.toString();
                    updateDisplay(num2);
                }
                gotResult = true;
            } else if (text === "sqrt") {
                if (currentNum === 1) {
                    num1 = Math.sqrt(parseFloat(num1.replace(",", "."))).toString();
                    updateDisplay(num1);
                } else if (currentNum === 2) {
                    num2 = Math.sqrt(parseFloat(num2.replace(",", "."))).toString();
                    updateDisplay(num2);
                }
            } else if (text === "1/x") {
                if (currentNum === 1) {
                    num1 = (1 / parseFloat(num1.replace(",", "."))).toString();
                    updateDisplay(num1);
                } else if (currentNum === 2) {
                    num2 = (1 / parseFloat(num2.replace(",", "."))).toString();
                    updateDisplay(num2);
                }
            } else if (text === "%") {
                if (num1 && num2 && oper) {
                    let x = parseFloat(num1.replace(",", "."));
                    let y = parseFloat(num2.replace(",", "."));
                    let result = (x * y) / 100;
                    updateDisplay(result);
                    num1 = result.toString();
                    gotResult = true;
                }
            }
        }
    });
}

function createMsDos() {
    let html = `<div class="console"><textarea class="prompt"></textarea></div>`;
    let dos = createWindow({
        title: currentLang[28],
        icon: "res/msdos.png", 
        html: html, 
        additionalClasses: ["program"],
        id: "msdos"});
    dos.innerHTML = `
        <div class="header">
            <div>
                <img src="res/msdos.png"></img>
                <span>${currentLang[28]}</span>
            </div>
            <div class="windowbuttons">
                <div>
                    <button class="minimize" onclick="minimize(this.parentNode.parentNode.parentNode.parentNode)"></button>
                    <button class="maximize" onclick="maximize(this, this.parentNode.parentNode.parentNode.parentNode)"></button>
                </div>
                <button class="close" onclick="this.parentNode.parentNode.parentNode.remove()"></button>
            </div>
        </div>
        
    `;

    const textarea = dos.querySelector(".prompt");
    textarea.value = `
Microsoft<R> Windows 95
    <C>Microsoft Corporation 1981-1996.

C:\WINDOWS>`;
    let savedText = textarea.value;
    let currentDir = files.children[1].children[0];
    dos.addEventListener("focus", function() {
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length,textarea.value.length);
    });
    dos.addEventListener("keydown", function(event) {
        if (event.key == "Backspace") {
            event.preventDefault();
            return;
        }
        if (event.key === "Enter") {
            event.preventDefault();
            const command = textarea.value.trim();
            executeCommand(command, textarea);
            textarea.value += '\nC:\\WINDOWS>';
        }
    });
}

function executeCommand(command, output) {
    let result;
    switch (command) {
        case "help":
            result = "Available commands:\nhelp - Show this help message\nclear - Clear the screen\necho [text] - Display text";
            break;
        case "clear":
            output.textContent = '';
            return;
        default:
            if (command.startsWith("echo ")) {
                result = command.substring(5);
            } else {
                result = `Unknown command: ${command}`;
            }
    }
    output.textContent += `> ${command}\n${result}\n`;
    output.scrollTop = output.scrollHeight;
}

function makeATabSwitch(elmnt) {
    let tabs = Array.from(elmnt.children);
    tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
            tabs.forEach((tab) => {
                tab.classList.remove("selected");
            });
            tab.classList.add("selected");
            switch (tab.id) {
                case "ppbg":
                    elmnt.parentNode.querySelector(".tabcontent").innerHTML = `
                    <div class="monitor">
                        <div class="monitorbg"></div>
                        <div class="monitorimg"></div>
                    </div>
                    <div class="boxcontain">
                        <div class="groupBox" text="${currentLang[41]}">
                            <select size="20">
                                <option>${currentLang[32]}</option>
                            </select>
                            <button disabled>deez nuts</button>
                        </div>
                        <div class="groupBox" text="${currentLang[42]}">
                            <select id="wppick" size="20">
                                <option>${currentLang[32]}</option>
                                <option>${currentLang[43]}</option>
                                <option>${currentLang[44]}</option>
                                <option>${currentLang[45]}</option>
                                <option>${currentLang[46]}</option>
                                <option>${currentLang[47]}</option>
                                <option>${currentLang[48]}</option>
                                <option>${currentLang[49]}</option>
                                <option>${currentLang[50]}</option>
                                <option>${currentLang[51]}</option>
                                <option>${currentLang[52]}</option>
                                <option>${currentLang[53]}</option>
                                <option>${currentLang[54]}</option>
                                <option>${currentLang[55]}</option>
                                <option>${currentLang[56]}</option>
                                <option>${currentLang[57]}</option>
                                <option>${currentLang[58]}</option>
                                <option>${currentLang[59]}</option>
                                <option>${currentLang[60]}</option>
                                <option>${currentLang[61]}</option>
                            </select>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span>${currentLang[62]}</span>
                                <button>${currentLang[40]}</button>
                            </div>
                            <div>
                                <ul id="wptile" class="radiolistH">
                                    <li><input type="radio" id="item1" name="items" value="item1" checked><label for="item1">${currentLang[63]}</label></li>
                                    <li><input type="radio" id="item2" name="items" value="item2"><label for="item2">${currentLang[64]}</label></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    `;
                    elmnt.parentNode.querySelectorAll("select").forEach((select) => {
                        sortOther(select);
                        select.addEventListener("change", function () {
                            elmnt.parentNode.parentNode.querySelector(".buttons > button[disabled]")?.removeAttribute("disabled");
                            setWallpaper(select.value, elmnt.parentNode.querySelector("input:checked + label").innerText, true);
                        });
                    });
                    elmnt.parentNode.querySelectorAll("input + label").forEach((input) => {
                        input.addEventListener("click", () => {
                            elmnt.parentNode.parentNode.querySelector(".buttons > button[disabled]")?.removeAttribute("disabled");
                            setWallpaper(elmnt.parentNode.querySelector("#wppick").value, input.innerText, true);
                        });
                    });
                    break;
            }
        });
    });
}

function setWallpaper(name, way, preview) {
    let names = {};
    names[currentLang[32]] = "";
    names[currentLang[43]] = "res/wallpapers/10.bmp";
    names[currentLang[44]] = "res/wallpapers/1.bmp";
    names[currentLang[45]] = "res/wallpapers/13.bmp";
    names[currentLang[46]] = "res/wallpapers/9.bmp";
    names[currentLang[47]] = "res/wallpapers/3.bmp";
    names[currentLang[48]] = "res/wallpapers/8.bmp";
    names[currentLang[49]] = "res/wallpapers/6.bmp";
    names[currentLang[50]] = "res/wallpapers/18.bmp";
    names[currentLang[51]] = "res/wallpapers/2.bmp";
    names[currentLang[52]] = "res/wallpapers/4.bmp";
    names[currentLang[53]] = "res/wallpapers/12.bmp";
    names[currentLang[54]] = "res/wallpapers/5.bmp";
    names[currentLang[55]] = "res/wallpapers/7.bmp";
    names[currentLang[56]] = "res/wallpapers/16.bmp";
    names[currentLang[57]] = "res/wallpapers/14.bmp";
    names[currentLang[58]] = "res/wallpapers/17.bmp";
    names[currentLang[59]] = "res/wallpapers/11.bmp";
    names[currentLang[60]] = "res/wallpapers/15.bmp";
    names[currentLang[61]] = "res/wallpapers/0.bmp";
	if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(name)) {
		names[name] = name;
	}

    let repeat = way == currentLang[63] ? "repeat" : "center no-repeat";

    if (preview == true) {
        document.querySelector(".monitorimg").style.background = `url(${names[name]}) ${repeat}`;
    } else {
        document.querySelector("#desktop").style.background = `url(${names[name]}) ${repeat}`;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const desktop = document.getElementById("desktop");
    let isSelecting = false;
    let startX, startY, endX, endY;
    let selectionBox;

    document.oncontextmenu = function (e) {
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
        for (let i = 0; i < contextMenu.querySelectorAll("button").length; i++) {
            let element = contextMenu.querySelectorAll("button")[i];
            if (element.classList.contains("dropdown")) {
                element.onmouseover = function () {
                    createSubMenu(element);
                };
            } else {
                element.onmouseover = function () {
                    removeSubMenus(contextMenu);
                };
            }
        }
        document.body.appendChild(contextMenu);
    };

    desktop.addEventListener("mousedown", function (event) {
        if (!event.target.classList.contains("shortcut")) {
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

    function isClearTypeEnabled() {
        var canvas = document.createElement("canvas");
        canvas.width = 35;
        canvas.height = 35;
        var ctx = canvas.getContext("2d");
        ctx.textBaseline = "top";
        ctx.font = "15px Arial";
        ctx.fillText("E", 1, 1);

        var data = ctx.getImageData(1, 1, 32, 32).data;
        var count = 0;

        for (var i = 0; i < data.length; i += 4) {
            if (data[i] !== data[i + 1] || data[i] !== data[i + 2]) {
                count++;
            }
        }

        return count > 0;
    }

    let docElm = document.documentElement;

    isClearTypeEnabled ? docElm.style.setProperty("--font", "MS Sans Serif") : docElm.style.setProperty("--font", "Microsoft Sans Serif");

    document.querySelector("#start span").innerText = currentLang[0];
    bootUp();

    createShortcut("res/mycomputer32.png", currentLang[77], createExplorer);

    let desktopObserver = new MutationObserver(syncFolderWithDesktop);
    desktopObserver.observe(document.querySelector("#desktop"), { childList: true });

    let desktopFolderObserver = new MutationObserver(syncDesktopWithFolder);
    desktopFolderObserver.observe(document.querySelector("#windows"), { childList: true, subtree: true });
});