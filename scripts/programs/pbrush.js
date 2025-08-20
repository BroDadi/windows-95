function createPaint()
{
    let html = `
    <div class="content">
        <div class="sidebar">
            <div class="tools">
                <div>
                    <button id="select2"><img src="res/paint/star.png"></img></button>
                    <button id="select"><img src="res/paint/select.png"></img></button>
                    <button id="eraser"><img src="res/paint/eraser.png"></img></button>
                    <button id="bucket"><img src="res/paint/bucket.png"></img></button>
                    <button id="picker"><img src="res/paint/picker.png"></img></button>
                    <button id="zoom"><img src="res/paint/zoom.png"></img></button>
                    <button id="pencil" class="pressed"><img src="res/paint/pencil.png"></img></button>
                    <button id="brush"><img src="res/paint/brush.png"></img></button>
                    <button id="spray"><img src="res/paint/spray.png"></img></button>
                    <button id="text"><img src="res/paint/text.png"></img></button>
                    <button id="line"><img src="res/paint/line.png"></img></button>
                    <button id="curvedline"><img src="res/paint/curvedline.png"></img></button>
                    <button id="rectangle"><img src="res/paint/rectangle.png"></img></button>
                    <button id="customshape"><img src="res/paint/huina.png"></img></button>
                    <button id="circle"><img src="res/paint/circle.png"></img></button>
                    <button id="roundrect"><img src="res/paint/roundrect.png"></img></button>
                </div>
                <div class="options"></div>
            </div>
        </div>
        <div class="draw">
            <svg width="0" height="0" style="position:absolute;z-index:-1;">
                <defs>
                    <filter id="remove-alpha" x="0" y="0" width="100%" height="100%">
                        <feComponentTransfer>
                        <feFuncA type="discrete" tableValues="0 1"></feFuncA>
                        </feComponentTransfer>
                    </filter>
                </defs>
            </svg>
            <canvas id="paintCanvas" oncontextmenu="return false;"></canvas>
        </div>
        <div class="footer">
            <div class="colormenu">
                <div class="colordisplay">
                    <div class="color2"></div>
                    <div class="color1"></div>
                </div>
                <div class="colors">
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                    <div class="color"></div><div class="color"></div>
                </div>
            </div>
        </div>
        <div class="statusbar"></div>
    </div>`;
    let paint = createWindow(
    {
        title: "Untitled - Paint",
        icon: "res/drawing16.png",
        html: html,
        additionalClasses: ["program"],
        menu: [currentLang[10], currentLang[11], currentLang[12], currentLang[13]],
        id: "paint"
    });
    paint.col1 = "#000000";
    paint.col2 = "#ffffff";
    paint.col3 = "";
    paint.currentTool = "pencil";
    paint.brush = "";
    paint.brushsize = 3;
    paint.zoom = 1;
    paint.palette = ["#000000", "#ffffff", "#808080", "#dfdfdf", "#800000", "#ff0000", "#808000", "#ffff00", "#008000", "#00ff00", "#008080", "#00ffff", "#000080", "#0000ff",
        "#800080", "#ff00ff", "#808040", "#ffff80", "#004040", "#00ff80", "#0080ff", "#80ffff", "#004080", "#8080ff", "#4000ff", "#ff0080", "#804000", "#ff8040"
    ];
    zoom = 1;
    initializeCanvas(paint.querySelector("#paintCanvas"), paint);
    paint.querySelectorAll(".tools button").forEach(btn => btn.onclick = function()
    {
        selectTool(btn.id, paint)
    });
    paint.querySelectorAll(".color").forEach(color => color.style.background = paint.palette[indexOfChild(color.parentNode.children, color)]);
    paint.querySelectorAll(".color").forEach(color => color.onmousedown = function(e)
    {
        if (e.buttons == 1)
        {
            paint.col1 = paint.palette[indexOfChild(color.parentNode.children, color)];
            paint.querySelector(".color1").style.background = paint.col1;
        }
        else if (e.buttons == 2)
        {
            paint.col2 = paint.palette[indexOfChild(color.parentNode.children, color)];
            paint.querySelector(".color2").style.background = paint.col2;
        }
    });
}

function selectTool(tool, paint)
{
    paint.querySelectorAll('.tools button').forEach(btn => btn.classList.remove('pressed'));
    paint.querySelector("#" + tool).classList.add('pressed');
    paint.currentTool = tool;
}

function initializeCanvas(canvas, paint)
{
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let painting = false;
    canvas.style.backgroundColor = paint.col2;
    ctx.imageSmoothingEnabled = false;
    let lastx, lasty;

    function startPosition(e)
    {
        painting = true;
        draw(e);
    }

    function endPosition()
    {
        painting = false;
        ctx.beginPath();
        lastx = 0;
        lasty = 0;
    }

    function drawLine(x0, y0, x1, y1, color)
    {
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = (x0 < x1) ? 1 : -1;
        const sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy;

        while (true)
        {
            ctx.fillStyle = color;
            ctx.fillRect(x0, y0, brushsize, brushsize);
            if (x0 === x1 && y0 === y1) break;
            const e2 = 2 * err;
            if (e2 > -dy)
            {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx)
            {
                err += dx;
                y0 += sy;
            }
        }
    }

    function draw(e)
    {
        if (!painting) return;
        let posx = e.clientX - canvas.getBoundingClientRect().left;
        let posy = e.clientY - canvas.getBoundingClientRect().top;
        let col = e.buttons == 1 ? paint.col1 : 2 ? paint.col2 : "";
        if (paint.currentTool == "pencil")
        {
            ctx.fillStyle = col;
            brushsize = 1;
            ctx.fillRect(posx, posy, brushsize, brushsize);
            if (lastx && lasty)
            {
                drawLine(lastx, lasty, posx, posy, col);
            }
            lastx = posx;
            lasty = posy;
        }
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw,
    {
        passive: true,
        capture: true
    });
    canvas.addEventListener('mouseleave', function()
    {
        lastx = 0;
        lasty = 0;
    });
}