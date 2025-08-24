function createProperties()
{
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
    properties.querySelectorAll("select").forEach((select) =>
    {
        sortOther(select);
        select.addEventListener("change", function()
        {
            properties.querySelector(".buttons > button[disabled]")?.removeAttribute("disabled");
            setWallpaper(select.value, properties.querySelector("input:checked + label").innerText, true);
        });
    });
    properties.querySelectorAll("input + label").forEach((input) =>
    {
        input.addEventListener("click", () =>
        {
            properties.querySelector(".buttons > button[disabled]")?.removeAttribute("disabled");
            setWallpaper(properties.querySelector("#wppick").value, input.innerText, true);
        });
    });
    document.querySelector("#windows.nodisplay").append(properties);
    enableDraggable(properties);
    makeATabSwitch(properties.querySelector(".tabs"));
}

function openDialogPlaceholder()
{
    let dialog = document.createElement("div");
    dialog.innerHTML = `
    <div class="header"><span>${currentLang[40]}</span><div class="windowbuttons"><button class="close" onclick="this.parentNode.parentNode.parentNode.remove()"></button></div></div>
    <div class="desc"><span>${currentLang[76]}</span></div>
	<input></input>
    <div class="buttons"><button onclick="setCustomWall(this);">${currentLang[15]}</button></div>
    `;
    dialog.tabIndex = 0;
    dialog.style.zIndex = 100;
    dialog.classList.add("window");
    document.querySelector("#windows.nodisplay").appendChild(dialog);
    enableDraggable(dialog);
    dialog.style.left = "calc(50wv - 0.5em)";
    dialog.style.top = "calc(50wv - 0.5em)";
    dialog.style.minWidth = dialog.clientWidth + "px";
}