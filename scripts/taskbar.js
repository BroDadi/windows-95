function highlightDisplay(display)
{
    document.querySelectorAll(".windowdisplay").forEach((disp) =>
    {
        disp.classList.remove("pressed");
    })
    display.classList.add("pressed");
    document.querySelector("#windows").children[indexOfChild(document.querySelectorAll(".windowdisplay"), display)].focus();
    unminimize(document.querySelector("#windows").children[indexOfChild(document.querySelectorAll(".windowdisplay"), display)]);
}

function windowDisplays()
{
    let windows = document.querySelector("#windows").children;
    let displays = document.querySelector("#windowdisplays");
    displays.replaceChildren();
    for (let i = 0; i < windows.length; i++)
    {
        let button = document.createElement("button");
        button.classList.add("windowdisplay");
        let img = "";
        img = windows[i].children[0].children[0].querySelector("img").outerHTML;
        button.innerHTML = `${img}<span>${windows[i].children[0].querySelector("span").innerHTML}</span>`;
        displays.append(button);
        button.setAttribute("onclick", "highlightDisplay(this)");
        Array.from(windows).concat(Array.from(document.querySelector("#windows.nodisplay"))).forEach((window) =>
        {
            Array.from(window.children).forEach((child) =>
            {
                child.onfocus = function()
                {
                    window.querySelector(".header").style.background = "#000080";
                    window.querySelector(".header span").style.textShadow = "0.5px 0px #fff, 1.5px 0px #fff";
                };
                child.onblur = function()
                {
                    window.querySelector(".header").style.background = "";
                    window.querySelector(".header span").style.textShadow = "";
                };
            });
        });
    }
}

function updateTime()
{
    let date = new Date();
    let minutes = date.getMinutes();
    if (minutes.toString().length == 1) minutes = "0" + minutes;

    let time = date.getHours() + ":" + minutes;
    if (currentLang == langs["en"])
    {
        let ampm;
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        date.getHours() >= 12 ? (ampm = " PM") : (ampm = " AM");
        time = hours + ":" + minutes + ampm;
    }
    document.querySelector("#clock").innerHTML = time;
}

function enableStart()
{
    if (document.querySelector("#startmenu"))
    {
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
    for (let i = 0; i < start.querySelectorAll("button").length; i++)
    {
        let element = start.querySelectorAll("button")[i];
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
                removeSubMenus(start);
            };
        }
    }
}

function disableStart()
{
    document.querySelector("#start").classList.remove("pressed");
    document.querySelector("#startmenu")?.remove();
}