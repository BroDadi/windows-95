function createFileViewer(directory) {
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
            action = function(){createFileViewer(child)};
            icon = icon ? icon + "32.png" : "res/folder32.png";
        }
        else if (type == "file") {
            if (icon) {
                icon = icon + "32.png";
            }
            else {
                if (ext == "exe" || ext == "com") icon = "res/program32.png";
                else if (ext == "txt") icon = "res/notepad32.png";
                else icon = "res/unknown32.png";
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