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
                children: [
                {
                    type: "folder",
                    name: currentLang[1],
                    icon: "res/folderprograms",
                    children: [
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
                        children: [
                        {
                            type: "folder",
                            name: currentLang[72],
                            icon: "res/folderprograms",
                            children: [
                            {
                                type: "shortcut",
                                name: currentLang[96],
                                icon: "res/winmine",
                                dest: "C:\\WINDOWS\\winmine"
                            }]
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
                        }, ]
                    },
                    {
                        type: "folder",
                        name: currentLang[26],
                        icon: "res/folderprograms",
                        children: []
                    },
                    {
                        type: "shortcut",
                        name: currentLang[28],
                        icon: "res/msdos",
                        dest: "C:\\WINDOWS\\command"
                    }]
                }],
            },
            {
                type: "file",
                name: "command",
                ext: "com",
                action: function()
                {
                    createMsDos();
                }
            },
            {
                type: "file",
                name: "notepad",
                ext: "exe",
                icon: "res/notepad",
                action: function()
                {
                    createNotepad();
                }
            },
            {
                type: "file",
                name: "calc",
                ext: "exe",
                icon: "res/calc",
                action: function()
                {
                    createCalc();
                }
            },
            {
                type: "file",
                name: "pbrush",
                ext: "exe",
                icon: "res/pbrush",
                action: function()
                {
                    createPaint();
                }
            },
            {
                type: "file",
                name: "winmine",
                ext: "exe",
                icon: "res/pbrush",
                action: function()
                {
                    createMinesweeper();
                }
            },
            ]
        },
        {
            type: "folder",
            name: "Program Files",
            children: []
        }, ],
    },
    {
        type: "file",
        name: "D:",
        icon: "res/D",
    }, ],
};

let PATH = ["C:\\WINDOWS\\System", "C:\\WINDOWS"];

function findByPath(path)
{
    let current = files;
    let pathparts = path.split("\\");
    for (let part of pathparts)
    {
        current = current.children.find(child => child.name.toUpperCase() == part.toUpperCase());
        if (!current)
        {
            console.error(`${part} not found`);
            return null;
        }
    }
    return current;
}