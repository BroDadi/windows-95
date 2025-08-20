let dosCmds = {
    cd: function(args) {}
};

function createMsDos()
{
    let html = `
    <div class="console">
        <div class="output"></div>
        <div class="input">
            <div class="prompt"></div>
            <input type="text" autocomplete="off"></input>
        </div>
    </div>`;
    let dos = createWindow(
    {
        title: currentLang[28],
        icon: "res/msdos16.png",
        html: html,
        additionalClasses: ["program"],
        id: "msdos",
        maxwidth: 652,
        maxheight: 359,
        maximizable: false
    });
    dos.querySelector(".console").onclick = function()
    {
        dos.querySelector("input").focus()
    };
    dos.currentDir = "C:\\WINDOWS";
    let outputText = dos.querySelector(".output");
    outputText.innerText = "\nMicrosoft(R) Windows 95\n       (C) Microsoft Corporation 1981-1996.\n\n";
    let prompt = dos.querySelector(".prompt");
    prompt.innerText = dos.currentDir + ">";
}

function sendCommand(cmd)
{
    let output = cmd.querySelector(".output");
    let prompt = cmd.querySelector(".prompt");
    let input = cmd.querySelector("input");
    output.innerText += "\n" + input.innerText + input.value;
}