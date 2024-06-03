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
        "Pattern",
        "Wallpaper",
        "Black Thatch",
        "Blue Rivets",
        "Bubbles",
        "Carved Stone",
        "Circles",
        "Clouds",
        "Forest",
        "Gold Weave",
        "Houndstooth",
        "Metal Links",
        "Pinstripe",
        "Red Blocks",
        "Sandstone",
        "Setup",
        "Stitches",
        "Straw Mat",
        "Tiles",
        "Triangles",
        "Waves",
        "Display:",
        "Tile",
        "Center",
        "Arrange Icons",
        "Line up Icons",
        "Paste",
        "Paste Shortcut",
        "New",
        "Properties",
        "Please wait while your computer shuts down.",
        "Games",
        "Internet Tools",
        "System Tools",
        "Multimedia",
		"Enter a URL-address:",
        "My Computer",
        "Paint",
        "WordPad",
        "Calculator",
        "Character Map",
        "Dial-Up Networking",
        "Network Cable Connection",
        "HyperTerminal",
        "Imaging",
        "Online Registration",
        "Phone Dialer",
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
        "Фоновый узор",
        "Рисунок",
        "Паркет",
        "Заклёпки",
        "Пузырьки",
        "Орнамент",
        "Колечки",
        "Облака",
        "Лес",
        "Чешуя",
        "Клыки",
        "Кольчуга",
        "Полоски",
        "Красные блоки",
        "Наждак",
        "Установка",
        "Стежки",
        "Циновка",
        "Плитка",
        "Треугольники",
        "Волны",
        "Поместить:",
        "Размножить",
        "В центре",
        "Упорядочить значки",
        "Выстроить значки",
        "Вставить",
        "Вставить ярлык",
        "Создать",
        "Свойства",
        "Подождите, идёт подготовка к выключению компьютера.",
        "Игры",
        "Средства Internet",
        "Служебные программы",
        "Мультимедиа",
		"Введите URL-адрес:",
        "Мой компьютер",
        "Графический редактор Paint",
        "Текстовый редактор WordPad",
        "Калькулятор",
        "Таблица символов",
        "Удалённый доступ к сети",
        "Прямое соединение",
        "Программа связи",
        "Просмотр рисунков",
        "Интерактивная регистрация",
        "Номеронабиратель",
    ],
};

let col1, col2, col3, currentTool, palette;

let currentLang = langs[Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0]]
    ? langs[Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0]]
    : langs["en"];

let startedMinMax = false;

const fileSystem = {
    root: {
        type: 'folder',
        name: 'C:',
        children: [
            {
                type: 'folder',
                name: 'Program Files',
                children: [
                    { type: 'file', name: 'notepad.exe' },
                ]
            },
        ]
    }
};

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
    let top = 0;
    let incrementLeft = 99;
    let incrementTop = 75;
    for (let i = 0; i < elmnt.children.length; i++) {
        let shrtct = elmnt.children[i];
        if (top > window.innerHeight - incrementTop) {
            left += incrementLeft;
            top = 0;
        }
        shrtct.style.left = left + "px";
        shrtct.style.top = top + "px";
        top += incrementTop;
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
    switch (elmnt.id) {
        case "prog":
            subMenu.innerHTML = `
            <button class="dropdown" id="inex"><img src="res/folderprograms16.png"></img>Internet Explorer</button>
            <button class="dropdown" id="accs"><img src="res/folderprograms16.png"></img>${currentLang[25]}</button>
            <button class="dropdown" id="atrn"><img src="res/folderprograms16.png"></img>${currentLang[26]}</button>
            <button><img src="res/mail16.png"></img>Microsoft Exchange</button>
            <button><img src="res/netmeeting16.png"></img>Microsoft Netmeeting</button>
            <button><img src="res/explorer16.png"></img>${currentLang[27]}</button>
            <button><img src="res/msdos.png"></img>${currentLang[28]}</button>`;
            break;
        case "sets":
            subMenu.innerHTML = `
            <button><img src="res/controlpanel16.png"></img>${currentLang[29]}</button>
            <button><img src="res/printers16.png"></img>${currentLang[30]}</button>
            <button><img src="res/taskbar.png"></img>${currentLang[31]}</button>`;
            break;
        case "inex":
            subMenu.innerHTML = ``;
            break;
        case "accs":
            subMenu.innerHTML = `
			<button class="dropdown" id="games"><img src="res/folderprograms16.png"></img>${currentLang[72]}</button>
			<button class="dropdown" id="tools"><img src="res/folderprograms16.png"></img>${currentLang[73]}</button>
			<button class="dropdown" id="systm"><img src="res/folderprograms16.png"></img>${currentLang[74]}</button>
            <button class="dropdown" id="media"><img src="res/folderprograms16.png"></img>${currentLang[75]}</button>
			<button onclick="createTextEditor(); disableStart();"><img src="res/notepadapp.png"></img>${currentLang[9]}</button>
			<button onclick="createPaint(); disableStart();"><img src="res/paint16.png"></img>${currentLang[78]}</button>
            `;
            break;
        case "scsort":
            subMenu.innerHTML = ``;
            break;
        default:
            subMenu.innerHTML = `<button class="disabled">${currentLang[32]}</button>`;
            break;
    }
    elmnt.append(subMenu);
    if (subMenu != document.querySelector("#startoptions")) sortSubMenu(subMenu);
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

function createMessageBox(title, desc, buttonarray, icon) {
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
        highlightDisplay(
            document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]
        );
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
        highlightDisplay(
            document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]
        );
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
            elmnt.parentNode.appendChild(elmnt);
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResize);
            highlightDisplay(
                document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]
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
                highlightDisplay(
                    document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)]
                );
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
    if (place) {
        place.append(shortcut);
    } 
    else {
        document.querySelector("#desktop").append(shortcut);
    }
    makeShortcutDraggable(shortcut);
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
            selectedshortcut.style.top = selectedshortcut.getBoundingClientRect().top + "px";
            selectedshortcut.style.left = selectedshortcut.getBoundingClientRect().left + "px";
            selectedshortcut.style.position = "absolute";
            selectedshortcut.classList.add("selected");
            let preview = createPreviewElement(selectedshortcut);
            document.querySelector("#desktop").appendChild(preview);
        });
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
    let editor = document.createElement("div");
    editor.id = "notepad";
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
    document.querySelector("#windows").appendChild(editor);
    enableDraggable(editor);
    enableResizable(editor);
    windowDisplays();
    setTimeout(function () {
        highlightDisplay(
            document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, editor)]
        );
    }, 1);
}

function createExplorer(directory) {
    let explorer = document.createElement("div");
    explorer.classList.add("window");
    explorer.classList.add("program");
    explorer.tabIndex = 0;
    explorer.innerHTML = `
    <div class="header">
        <div>
            <img src=""></img>
            <span>${currentLang[77]}</span>
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
    <div class="expcontent"></div>
    <div class="statusbar"><span>bebebe 123 123 test</span></div>
    `;
    document.querySelector("#windows").appendChild(explorer);
    enableDraggable(explorer);
    enableResizable(explorer);
    windowDisplays();
    setTimeout(function () {
        highlightDisplay(
            document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, explorer)]
        );
    }, 1);
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
    let windowDisplay =
        document.querySelector("#windowdisplays").children[indexOfChild(document.querySelector("#windows").children, elmnt)];
    setTimeout(function () {
        headerClone.style.top = windowDisplay.getBoundingClientRect().top + "px";
        headerClone.style.left = windowDisplay.getBoundingClientRect().left + "px";
        headerClone.style.width = windowDisplay.clientWidth + "px";
    }, 1);
    setTimeout(function () {
        elmnt.classList.add("minimized");
        headerClone.remove();
        startedMinMax = false;
    }, 250);
}

function unminimize(elmnt) {
    if (!elmnt.classList.contains("minimized")) {
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
        Array.from(windows)
            .concat(Array.from(document.querySelector("#windows.nodisplay")))
            .forEach((window) => {
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
    bootScreen.style.backgroundSize = "100vw 100vh";
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
    let paint = document.createElement("div");
    paint.classList.add("window");
    paint.classList.add("program");
    paint.id = "paint";
    paint.tabIndex = 0;
    col1 = "#000000";
    col2 = "#ffffff";
    currentTool = "pencil";
    palette = ["#000000", "#ffffff", "#808080", "#dfdfdf", "#800000", "#ff0000", "#808000", "#ffff00", "#008000", "#00ff00", "#008080", "#00ffff", "#000080", "#0000ff",
    "#800080", "#ff00ff", "#808040", "#ffff80", "#004040", "#00ff80", "#0080ff", "#80ffff", "#004080", "#8080ff", "#4000ff", "#ff0080", "#804000", "#ff8040"];
    paint.innerHTML = `
    <div class="header">
        <div>
            <img src="res/drawing16.png"></img>
            <span>Untitled - Paint</span>
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
                    <div class="color1"></div>
                    <div class="color2"></div>
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
    </div>
    `;
    document.querySelector("#windows").append(paint);
    enableDraggable(paint);
    enableResizable(paint);
    initializeCanvas();
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

function selectTool(tool) {
    document.querySelectorAll('.tools button').forEach(btn => btn.classList.remove('pressed'));
    document.getElementById(tool).classList.add('pressed');
    currentTool = tool;
}

function initializeCanvas() {
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');

    let painting = false;
    canvas.style.backgroundColor = col2;
    ctx.filter = "url(#remove-alpha)";

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        if (currentTool == "pencil") {
            ctx.lineWidth = 1;
            ctx.strokeStyle = e.buttons == 1 ? col1 : 2 ? col2 : "";

            ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        }
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
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
});
