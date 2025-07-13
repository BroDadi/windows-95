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

function shutdownButton(choice) {
    if (choice == "sd1") {
        shutdown();
    }
}