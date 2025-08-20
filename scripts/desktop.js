function syncDesktopWithFolder()
{
    let desktopElement = document.querySelector("#desktop");
    let desktopFolder = findByPath("C:\\WINDOWS\\" + currentLang[91]);

    desktopElement.innerHTML = "";

    desktopFolder.children.forEach(child =>
    {
        createShortcut(child.icon + "32.png", child.name, child.action, null);
    });
}

function syncFolderWithDesktop()
{
    let desktopElement = document.querySelector("#desktop");
    let desktopFolder = findByPath("C:\\WINDOWS\\" + currentLang[91]);

    desktopFolder.children = [];

    Array.from(desktopElement.children).forEach(shortcut =>
    {
        let name = shortcut.querySelector("span").textContent;
        let icon = shortcut.querySelector("img").src;
        let action = shortcut.ondblclick;

        desktopFolder.children.push(
        {
            type: "file",
            name: name,
            icon: icon.replace("32.png", ""),
            action: action,
        });
    });
}

function setCustomWall(elmnt)
{
    setWallpaper(elmnt.parentNode.parentNode.children[2].value, document.querySelector('#properties input[type="radio"]:checked + label').innerText);
    document.querySelector('#properties').remove();
    elmnt.parentNode.parentNode.remove();
}

function setWallpaper(name, way, preview)
{
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
    if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(name))
    {
        names[name] = name;
    }

    let repeat = way == currentLang[63] ? "repeat" : "center no-repeat";

    if (preview == true)
    {
        document.querySelector(".monitorimg").style.background = `url(${names[name]}) ${repeat}`;
    }
    else
    {
        document.querySelector("#desktop").style.background = `url(${names[name]}) ${repeat}`;
    }
}