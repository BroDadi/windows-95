function createMinesweeper()
{
    let difficulties = [
        {
            name: currentLang[99],
            width: 8,
            height: 8,
            mines: 10
        },
        {
            name: currentLang[100],
            width: 16,
            height: 16,
            mines: 40
        },
        {
            name: currentLang[101],
            width: 30,
            height: 16,
            mines: 99
        },
    ];

    let html = `
    <div class="content">
        <div class="top">
            <div id="mines" class="counter">
                <img src="res/minesweeper/digits/0.png"><img src="res/minesweeper/digits/1.png"><img src="res/minesweeper/digits/0.png">
            </div>
            <button id="newgame"></button>
            <div id="time" class="counter">
                <img src="res/minesweeper/digits/0.png"><img src="res/minesweeper/digits/0.png"><img src="res/minesweeper/digits/0.png">
            </div>
        </div>
        <div class="field"></div>
    </div>
    `;

    let minesweeper = createWindow(
    {
        title: currentLang[96],
        icon: "res/winmine16.png",
        html: html,
        maximizable: false,
        resizable: false,
        additionalClasses: ["program"],
        menu: [
        { 
            name: currentLang[97],
            children: [
            {
                name: currentLang[98],
                action: function() { createGrid(gridWidth, gridHeight, mineCount) }
            },
            {
                name: "/sep/"
            },
            {
                name: difficulties[0].name,
                action: function() { createGrid(difficulties[0].width, difficulties[0].height, difficulties[0].mines) }
            },
            {
                name: difficulties[1].name,
                action: function() { createGrid(difficulties[1].width, difficulties[1].height, difficulties[1].mines) }
            },
            {
                name: difficulties[2].name,
                action: function() { createGrid(difficulties[2].width, difficulties[2].height, difficulties[2].mines) }
            },
            {
                name: currentLang[102],
                action: callCustomDialog
            }
            ]
        },
        currentLang[13]
        ],
        id: "winmine"
    });
    let gameStarted = false;
    let gameOver = false;
    let cells = [];
    let mineArray = [];
    let time = 0;
    let gridWidth, gridHeight, mineCount, currentMines;
    let field = minesweeper.querySelector(".field");
    let mineCounter = minesweeper.querySelector("#mines");
    let timeCounter = minesweeper.querySelector("#time");

    function elmnt(x, y)
    {
        return field.children[y].children[x];
    }

    function createGrid(width, height, mines)
    {
        gameOver = false;
        gameStarted = false;
        minesweeper.querySelector("#newgame").removeAttribute("class");
        if (width > 30) width = 30;
        if (width < 8) width = 8;
        if (height > 24) height = 24;
        if (height < 8) height = 8;
        gridWidth = width;
        gridHeight = height;

        if (mines > (gridWidth - 1) * (gridHeight - 1)) mines = (gridWidth - 1) * (gridHeight - 1);
        if (mines < 10) mines = 10;
        mineCount = mines;
        currentMines = mineCount;
        field.innerHTML = "";
        cells = [];
        mineArray = [];
        for (let y = 0; y < height; y++)
        {
            let col = document.createElement("div");
            col.classList.add("column");
            let cellarray = [];
            for (let x = 0; x < width; x++)
            {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.x = x;
                cell.y = y;
                cell.onclick = function() { press(x, y) };
                cell.oncontextmenu = function() { mark(x, y) };
                col.appendChild(cell);
                cellarray[x] = 0;
            }
            cells[y] = cellarray;
            field.append(col);
        }
        updateCounter(mineCounter, mineCount);
    }

    function startGame(clickx, clicky)
    {
        gameStarted = true;
        mineArray = [];
        for (let m = 0; m < mineCount; m++)
        {
            let x = Math.floor(Math.random() * gridWidth);
            let y = Math.floor(Math.random() * gridHeight);
            while ((clickx == x && clicky == y) || mineArray.some(mine => mine[0] === x && mine[1] === y))
            {
                x = Math.floor(Math.random() * gridWidth);
                y = Math.floor(Math.random() * gridHeight);
            }
            mineArray[m] = [x, y];
            cells[y][x] = 1;
        }
    }

    function press(x, y)
    {
        if (gameOver) return;
        if (!gameStarted) startGame(x, y);
        if (elmnt(x, y).classList.contains("pressed") || elmnt(x, y).classList.contains("flag")) return;
        if (cells[y][x] == 1) lose(x, y);
        elmnt(x, y).classList.add("pressed");
        elmnt(x, y).classList.remove("questionmark");
        let minesAround = 0;
        let directionsX = [0, 0, -1, -1, -1, 1, 1, 1];
        let directionsY = [1, -1, 0, 1, -1, 0, 1, -1];
        for (let i = 0; i < directionsX.length; i++)
        {
            if (x + directionsX[i] < 0 || x + directionsX[i] >= gridWidth || y + directionsY[i] < 0 || y + directionsY[i] >= gridHeight) continue;
            if (cells[y + directionsY[i]][x + directionsX[i]] == 1)
            {
                minesAround++;
            }
        }
        if (minesAround == 0)
        {
            for (let i = 0; i < directionsX.length; i++)
            {
                if (x + directionsX[i] < 0 || x + directionsX[i] >= gridWidth || y + directionsY[i] < 0 || y + directionsY[i] >= gridHeight) continue;
                press(x + directionsX[i], y + directionsY[i]);
            }
        }
        else
        {
            elmnt(x, y).classList.add("m" + minesAround);
        }
        let remainingCells = 0;
        for (let i = 0; i < gridWidth * gridHeight; i++)
        {
            if (!elmnt(i % gridWidth, Math.floor(i / gridWidth)).classList.contains("pressed"))
            {
                remainingCells++;
            }
        }
        if (remainingCells == mineCount) win();
    }

    function mark(x, y)
    {
        if (gameOver || elmnt(x, y).classList.contains("pressed")) return;
        if (elmnt(x, y).classList.contains("flag"))
        {
            elmnt(x, y).classList.remove("flag");
            elmnt(x, y).classList.add("questionmark");
            currentMines += 1;
        }
        else if (elmnt(x, y).classList.contains("questionmark"))
        {
            elmnt(x, y).classList.remove("questionmark");
        }
        else
        {
            elmnt(x, y).classList.add("flag");
            currentMines -= 1;
        }
        updateCounter(mineCounter, currentMines);
    }

    function lose(x, y)
    {
        for (let i = 0; i < mineArray.length; i++)
        {
            if (!elmnt(mineArray[i][0], mineArray[i][1]).classList.contains("flag")) {
                elmnt(mineArray[i][0], mineArray[i][1]).classList.add("mine");
            }
        }
        elmnt(x, y).classList.add("minepressed");
        gameOver = true;
        gameStarted = false;
        minesweeper.querySelector("#newgame").classList.add("dead");
    }

    function win()
    {
        for (let i = 0; i < mineArray.length; i++)
        {
            elmnt(mineArray[i][0], mineArray[i][1]).classList.add("flag");
        }
        gameOver = true;
        gameStarted = false;
        minesweeper.querySelector("#newgame").classList.add("cool");
    }

    function updateCounter(counter, value)
    {
        if (value >= 0)
        {
            value = value.toString().padStart(3, 0);
            value = value.substring(value.length - 3);
        }
        else
        {
            value = value.toString();
            let middlenum;
            if (value.length < 3) middlenum = 0;
            else middlenum = value[value.length - 2];
            value = "-" + middlenum + value[value.length - 1];
        }
        for (let i = counter.children.length - 1; i >= 0; i--)
        {
            counter.children[i].src = "res/minesweeper/digits/" + value[i] + ".png";
        }
    }

    function callCustomDialog()
    {
        console.log("penis");
        html = `
        <div class="content">
            <div class="left">
                <div class="inputdiv"><span>${currentLang[104]}</span><input id="height"></div>
                <div class="inputdiv"><span>${currentLang[105]}</span><input id="width"></div>
                <div class="inputdiv"><span>${currentLang[106]}</span><input id="mines"></div>
            </div>

            <div class="btns">
                <button id="ok">${currentLang[15]}</button>
                <button id="cancel">${currentLang[16]}</button>
            </div>
        </div>
        `;
        let dialog = createWindow(
        {
            title: currentLang[103],
            html: html,
            resizable: false,
            minimizable: false,
            maximizable: false,
            hasdisplay: false,
            id: "winminedialog"
        });
        let width = dialog.querySelector("#width");
        let height = dialog.querySelector("#height");
        let mines = dialog.querySelector("#mines");
        width.value = gridWidth;
        height.value = gridHeight;
        mines.value = mineCount;
        dialog.querySelector("#ok").onclick = function()
        {
            createGrid(parseInt(width.value), parseInt(height.value), parseInt(mines.value));
            dialog.remove();
        }
        dialog.querySelector("#cancel").onclick = function()
        {
            createGrid(gridWidth, gridHeight, mineCount);
            dialog.remove();
        }
    }

    createGrid(8, 8, 10);
    minesweeper.querySelector("#newgame").onclick = function() { createGrid(gridWidth, gridHeight, mineCount) };
    minesweeper.onmousedown = function() { if (!gameOver) minesweeper.querySelector("#newgame").classList.add("surprised") };
    minesweeper.onmouseup = function() { if (!gameOver) minesweeper.querySelector("#newgame").removeAttribute("class") };
}