function createNotepad()
{
    html = `<textarea class="notepadcontent"></textarea>`;
    let notepad = createWindow(
    {
        title: currentLang[9],
        icon: "res/notepad16.png",
        html: html,
        additionalClasses: ["program"],
        menu: [currentLang[10], currentLang[11], currentLang[12], currentLang[13]],
        id: "notepad"
    });
}