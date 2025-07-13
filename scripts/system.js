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

function indexOfChild(obj, element) {
    for (let i = 0; i < obj.length; i++) {
        if (obj[i] === element) {
            return i;
        }
    }
    return -1;
}

// i think this needs improvement this is only used in properties and it's kind of a hardcode
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

// all this down below isn't even shortcuts since it's also used for files but i'm too lazy to change this everywhere okay
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