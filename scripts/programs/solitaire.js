function createSolitaire()
{
    let html = `
    <div class="content">
        <div id="top">
            <div id="stack"></div>
            <div id="waste"></div>
            <div class="zalupa"></div>
            <div class="foundation"></div>
            <div class="foundation"></div>
            <div class="foundation"></div>
            <div class="foundation"></div>
        </div>
        <div id="cardstacks">
            <div class="cardstack"></div>
            <div class="cardstack"></div>
            <div class="cardstack"></div>
            <div class="cardstack"></div>
            <div class="cardstack"></div>
            <div class="cardstack"></div>
            <div class="cardstack"></div>
        </div>
        <div id="statusbar">
            <span></span>
            <span></span>
        </div>
    </div>`;

    let solitaire = createWindow(
    {
        title: currentLang[111],
        icon: "res/sol16.png",
        html: html,
        additionalClasses: ["program"],
        menu: [
        { 
            name: currentLang[97],
            children: [
            {
                name: currentLang[113],
                action: deal
            },
            {
                name: "/sep/"
            },
            {
                name: currentLang[114]
            },
            {
                name: currentLang[115],
                action: callBackSelectDialog
            },
            {
                name: currentLang[117],
                action: callSettingsDialog
            },
            {
                name: "/sep/"
            },
            {
                name: currentLang[110],
                action: function() {solitaire.remove()}
            }
            ]
        },
        currentLang[13]
        ],
        id: "sol"
    });

    let deck;

    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
    let cardsToWaste = +localStorage.getItem("solCards") || 3;
    let scoringMode = +localStorage.getItem("solScoring") || 1;
    let timed = localStorage.getItem("solTimed") == null ? true : localStorage.getItem("solTimed") == "true";
    let status = localStorage.getItem("solStatus") == null ? true : localStorage.getItem("solStatus") == "true";
    //let hint = localStorage.getItem("solHint") || false;
    let keep = localStorage.getItem("solKeep") == null ? true : localStorage.getItem("solKeep") == "true";
    let score = 0;
    let time = 0;
    let bonus = 0;
    let wasteCycles = 0;
    let timeInterval;
    function createShuffledDeck()
    {
        deck = [];
        for (let i = 0; i < values.length; i++)
        {
            for (let j = 0; j < suits.length; j++)
            {
                let card = document.createElement("div");
                card.classList.add("card");
                card.value = values[i],
                card.suit = suits[j],
                card.innerHTML = `<img src="res/cards/${i.toString().padStart(2, "0")}-${j.toString().padStart(2, "0")}.png">`,
                card.lastClickTime = 0;
                card.onmousedown = function(event) { cardMouseDown(event, card) };
                deck.push(card);
            }
        }

        deck = deck.map(card => ({ card, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ card }) => card);
    }

    function deal()
    {
        solitaire.querySelectorAll(".cardstack").forEach(function (stack) {stack.replaceChildren()});
        solitaire.querySelectorAll(".foundation").forEach(function (foundation) {foundation.replaceChildren()});
        solitaire.querySelector("#waste").replaceChildren();
        solitaire.querySelector("#stack").replaceChildren();
        if (scoringMode == 1 || !keep) score = 0;
        if (scoringMode == 2) score -= 52;
        time = 0;
        bonus = 0;
        wasteCycles = 0; 

        createShuffledDeck();

        for (let i = 0; i < solitaire.querySelectorAll(".cardstack").length; i++)
        {
            for (let j = 0; j <= i; j++)
            {
                let card = deck.pop();
                if (j == i) card.classList.add("up");
                solitaire.querySelectorAll(".cardstack")[i].appendChild(card);
            }
        }

        for (let i = deck.length; i > 0; i--)
        {
            let card = deck.pop();
            solitaire.querySelector("#stack").appendChild(card);
        }
        updateStatusbar();
    }

    function dealCardsToWaste(num)
    {
        if (solitaire.querySelector("#stack").children.length == 0)
        {
            for (let i = solitaire.querySelector("#waste").children.length - 1; i >= 0; i--)
            {
                if (solitaire.querySelector("#waste").children[0])
                {
                    let card = solitaire.querySelector("#waste").children[0];
                    card.classList.remove("up");
                    card.style.left = null;
                    card.style.top = null;
                    solitaire.querySelector("#stack").appendChild(card);
                }
            }
            if (scoringMode == 1)
            {
                if (wasteCycles == 3 && cardsToWaste == 3)
                {
                    addScore(-20);
                    wasteCycles = 0;
                }
                else if (cardsToWaste == 1)
                {
                    addScore(-100);
                }
                if (cardsToWaste == 3)
                {
                    wasteCycles += 1;
                }
            }
        }
        else
        {
            for (let i = 0; i < solitaire.querySelector("#waste").children.length; i++)
            {
                solitaire.querySelector("#waste").children[i].style.left = null;
                solitaire.querySelector("#waste").children[i].style.top = null;
            }
            for (let i = 0; i < num; i++)
            {
                if (solitaire.querySelector("#stack").children[0])
                {
                    let card = solitaire.querySelector("#stack").children[0];
                    card.classList.add("up");
                    card.style.left = i * 14 + "px";
                    card.style.top = i + "px";
                    solitaire.querySelector("#waste").appendChild(card);
                }
            }
        }
    }

    function cardMouseDown(event, card)
    {
        if (timed && timeInterval == null) startTime();
        if (card.classList.contains("up") && card.parentNode.id != "stack" && (card.parentNode.id != "waste" || !card.nextSibling))
        {
            let now = Date.now();
            if (now - card.lastClickTime < 300)
            {
                cardDoubleClick(card);
                card.lastClickTime = 0;
                return;
            }
            card.lastClickTime = now;
            let origParent = card.parentNode;
            let rect = card.getBoundingClientRect();
            let group = document.createElement("div");
            group.id = "draggedcards";
            group.append(...Array.from(card.parentNode.children).slice(indexOfChild(card.parentNode.children, card)));
            solitaire.querySelector(".content").appendChild(group);

            let relX = event.clientX - rect.left;
            let relY = event.clientY - rect.top;
            group.style.position = "absolute";
            group.style.left = event.clientX - solitaire.querySelector(".content").getBoundingClientRect().left - relX + "px";
            group.style.top = event.clientY - solitaire.querySelector(".content").getBoundingClientRect().top - relY + "px";

            function mouseMove(event)
            {
                group.style.left = event.clientX - solitaire.querySelector(".content").getBoundingClientRect().left - relX + "px";
                group.style.top = event.clientY - solitaire.querySelector(".content").getBoundingClientRect().top - relY + "px";
            }

            function mouseUp()
            {
                let cards = [...group.children];
                let placed = false;
                let elementsBelow = 
                [
                    document.elementFromPoint(card.getBoundingClientRect().left, card.getBoundingClientRect().top),
                    document.elementFromPoint(card.getBoundingClientRect().right, card.getBoundingClientRect().top),
                    document.elementFromPoint(card.getBoundingClientRect().left, card.getBoundingClientRect().bottom),
                    document.elementFromPoint(card.getBoundingClientRect().right, card.getBoundingClientRect().bottom),
                ];
                group.remove();

                for (let i = 0; i < elementsBelow.length; i++)
                {
                    if (elementsBelow[i] && solitaire.contains(elementsBelow[i]))
                    {
                        if (elementsBelow[i].classList.contains("card") && elementsBelow[i].classList.contains("up") && elementsBelow[i].parentNode.id != "waste")
                        {
                            if (checkIfCanPlace(card, elementsBelow[i]))
                            {
                                if (scoringMode == 1)
                                {
                                    if (elementsBelow[i].parentNode.classList.contains("foundation")) addScore(10);
                                    else if (origParent.classList.contains("foundation")) addScore(-15);
                                    else if (origParent.id == "waste") addScore(5);
                                }
                                else if (scoringMode == 2)
                                {
                                    if (elementsBelow[i].parentNode.classList.contains("foundation")) addScore(5);
                                    else if (origParent.classList.contains("foundation")) addScore(-5);
                                }
                                elementsBelow[i].parentNode.append(...cards);
                                placed = true;
                            }
                        }
                        else if (elementsBelow[i].classList.contains("cardstack") && card.value == 13)
                        {
                            if (scoringMode == 1)
                            {
                                if (origParent.id == "waste") addScore(5);
                                else if (origParent.classList.contains("foundation")) addScore(-15);
                            }
                            else if (scoringMode == 2 && origParent.classList.contains("foundation")) addScore(-5);
                            elementsBelow[i].append(...cards);
                            placed = true;
                        }
                        else if (elementsBelow[i].classList.contains("foundation") && cards.length == 1 && card.value == 1)
                        {
                            if (scoringMode == 1) addScore(10);
                            else if (scoringMode == 2) addScore(5);
                            elementsBelow[i].appendChild(card);
                            placed = true;
                        }
                        if (placed)
                        {
                            for (let i = 0; i < cards.length; i++)
                            {
                                cards[i].style.left = null;
                                cards[i].style.top = null;
                            }
                            break;
                        }
                    }
                }

                if (!placed)
                {
                    origParent.append(...cards);
                }

                let foundations = document.querySelectorAll(".foundation");
                if (foundations[0].children.length == 13 && foundations[1].children.length == 13 && foundations[2].children.length == 13 && foundations[3].children.length == 13) win();

                document.removeEventListener("mousemove", mouseMove);
                document.removeEventListener("mouseup", mouseUp);
            }

            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
        }
        else if (card.parentNode.classList.contains("cardstack") && !card.nextSibling)
        {
            card.classList.add("up");
            if (scoringMode == 1) addScore(5);
        }
    }

    function cardDoubleClick(card)
    {
        if (card.nextSibling) return;
        let foundations = solitaire.querySelectorAll(".foundation");
        if (card.value == 1)
        {
            for (let i = 0; i < foundations.length; i++)
            {
                if (foundations[i].children.length == 0)
                {
                    card.style.left = null;
                    card.style.top = null;
                    foundations[i].appendChild(card);
                    if (scoringMode == 1) addScore(10);
                    else if (scoringMode == 2) addScore(5);
                    return;
                }
            };
        }
        else
        {
            for (let i = 0; i < foundations.length; i++)
            {
                let children = foundations[i].children
                if (!children) continue;

                for (let j = 0; j < children.length; j++)
                {
                    if (!children[j].nextSibling && card.value - children[j].value == 1 && card.suit == children[j].suit)
                    {
                        card.style.left = null;
                        card.style.top = null;
                        foundations[i].appendChild(card);
                        if (scoringMode == 1) addScore(10);
                        else if (scoringMode == 2) addScore(5);
                        if (foundations[0].children.length == 13 && foundations[1].children.length == 13 && foundations[2].children.length == 13 && foundations[3].children.length == 13) win();
                        return;
                    }
                }
            };
        }
    }

    function checkIfCanPlace(card1, card2)
    {
        if (card2.nextSibling) return false;
        if (card1.nextSibling && card2.parentNode.classList.contains("foundation")) return false;
        if (card2.parentNode.classList.contains("foundation") && card1.suit == card2.suit && card1.value - card2.value == 1) return true;
        if (card2.parentNode.classList.contains("cardstack") && card2.value - card1.value == 1 && indexOfChild(suits, card1.suit) % 2 != indexOfChild(suits, card2.suit) % 2) return true;
        return false;
    }

    function addScore(num)
    {
        score += num;
        if (score < 0 && scoringMode == 1) score = 0;
        updateStatusbar();
    }

    function win()
    {
        if (scoringMode == 1 && timed)
        {
            bonus = 700000 / time <= 30 ? 30 : time;
            score += bonus;
        }
        stopTime();
        updateStatusbar();
    }

    function startTime()
    {
        timeInterval = setInterval(function()
        {
            time += 1;
            if (time % 10 == 0 && scoringMode == 1)
            {
                addScore(-2);
            }
            updateStatusbar();
        }, 1000);
    }

    function stopTime()
    {
        clearInterval(timeInterval);
        timeInterval = null;
    }

    function updateStatusbar()
    {
        let statusbar = solitaire.querySelector("#statusbar");
        statusbar.style.display = status == true ? "" : "none";
        statusbar.children[0].innerHTML = "";
        statusbar.children[1].innerHTML = "";

        if (timed && scoringMode == 1 && bonus)
        {
            statusbar.children[0].innerHTML = currentLang[120] + bonus;
        }

        if (scoringMode == 1)
        {
            statusbar.children[1].innerHTML += currentLang[118] + score;
        }
        else if (scoringMode == 2)
        {
            if (score >= 0)
            {
                statusbar.children[1].innerHTML += `${currentLang[118]}$${score}`;
            }
            else
            {
                statusbar.children[1].innerHTML += `${currentLang[118]}<span style="color: red">-$${-score}</span>`;
            }
        }

        if (timed)
        {
            statusbar.children[1].innerHTML += " " + currentLang[119] + time;
        }
    }

    function callSettingsDialog()
    {
        html = `
        <div id="radios">
        <div class="groupBox" text="${currentLang[128]}">
            <ul id="cardsToWaste" class="radiolist">
                <li><input type="radio" name="cardsToWaste" id="one" value="one"><label for="one">${currentLang[129]}</label></li>
                <li><input type="radio" name="cardsToWaste" id="three" value="three"><label for="three">${currentLang[130]}</label></li>
            </ul>
        </div>
        <div class="groupBox" text="${currentLang[131]}">
            <ul id="scoringMode" class="radiolist">
                <li><input type="radio" name="scoringMode" id="standard" value="standard"><label for="standard">${currentLang[132]}</label></li>
                <li><input type="radio" name="scoringMode" id="vegas" value="vegas"><label for="vegas">${currentLang[133]}</label></li>
                <li><input type="radio" name="scoringMode" id="none" value="none"><label for="none">${currentLang[134]}</label></li>
            </ul>
        </div>
        </div>
        <div id="checks">
            <div>
                <input type="checkbox" id="timed" value="timed"><label for="timed">${currentLang[135]}</label>
                <input type="checkbox" id="status" value="status"><label for="status">${currentLang[136]}</label>
            </div>
            <div>
                <input type="checkbox" id="hint" value="hint" disabled><label for="hint">${currentLang[137]}</label>
                <input type="checkbox" id="keep" value="keep", disabled><label for="keep">${currentLang[138]}</label>
            </div>
        </div>
        <div id="buttons">
            <button id="ok">${currentLang[15]}</button>
            <button id="cancel">${currentLang[16]}</button>
        </div>
        `

        let dialog = createWindow(
        {
            title: currentLang[127],
            html: html,
            resizable: false,
            minimizable: false,
            maximizable: false,
            hasdisplay: false,
            id: "solsettings",
            parentElement: solitaire
        });

        dialog.querySelector("#none").checked = scoringMode == 0;
        dialog.querySelector("#standard").checked = scoringMode == 1;
        dialog.querySelector("#vegas").checked = scoringMode == 2;
        dialog.querySelector("#one").checked = cardsToWaste == 1;
        dialog.querySelector("#three").checked = cardsToWaste == 3;
        dialog.querySelector("#timed").checked = timed == true;
        dialog.querySelector("#status").checked = status == true;
        // dialog.querySelector("#hint").checked = hint; not yet, i'm a dumbass okay
        dialog.querySelector("#keep").checked = keep;
        if (score == 2) dialog.querySelector("#keep").removeAttribute("disabled");

        let changes = { scoringMode, cardsToWaste, timed, status, hint, keep };

        dialog.addEventListener("change", function(event)
        {
            if (event.target.type == "radio")
            {
                let val;
                switch (event.target.value)
                {
                    case "none":
                        val = 0;
                        break;
                    case "standard":
                    case "one":
                        val = 1;
                        break;
                    case "vegas":
                        val = 2;
                        break;
                    case "three":
                        val = 3;
                        break;
                    default:
                        val = event.target.value;
                }
                changes[event.target.name] = val;
            }
            else if (event.target.type == "checkbox")
            {
                changes[event.target.id] = event.target.checked;
            }
            
            if (dialog.querySelector("#vegas").checked)
            {
                dialog.querySelector("#keep").removeAttribute("disabled");
            }
            else
            {
                dialog.querySelector("#keep").setAttribute("disabled", "");
            }
        });

        dialog.querySelector("#ok").onclick = function()
        {
            let shouldDeal = changes["scoringMode"] != scoringMode || changes["cardsToWaste"] != cardsToWaste || changes["timed"] != timed;
            let shouldUpdateStatus = changes["status"] != status;
            ({ scoringMode, cardsToWaste, timed, status, hint, keep } = changes);
            localStorage.setItem("solScoring", scoringMode);
            localStorage.setItem("solCards", cardsToWaste);
            localStorage.setItem("solTimed", timed);
            localStorage.setItem("solStatus", status);
            localStorage.setItem("solHint", hint);
            localStorage.setItem("solKeep", keep);
            if (shouldDeal) deal();
            if (shouldUpdateStatus) updateStatusbar();
            dialog.close();
        }
        dialog.querySelector("#cancel").onclick = dialog.close;
    }

    function callBackSelectDialog()
    {
        html = `
        <div id="backs"></div>
        <div id="btns">
            <button id="ok">${currentLang[15]}</button>
            <button id="cancel">${currentLang[16]}</button>
        </div>
        `

        let backs =
        [
            "res/cards/00-04.png",
            "res/cards/01-04.png",
            "res/cards/02-04.png",
            "res/cards/03-04.png",
            "res/cards/04-04.png",
            "res/cards/05-04.png",
            "res/cards/06-04.gif",
            "res/cards/09-04.png",
            "res/cards/00-05.png",
            "res/cards/01-05.gif",
            "res/cards/03-05.gif",
            "res/cards/06-05.gif",
        ];

        let pickedBack;

        let dialog = createWindow(
        {
            title: currentLang[116],
            html: html,
            resizable: false,
            minimizable: false,
            maximizable: false,
            hasdisplay: false,
            id: "soldialog",
            parentElement: solitaire
        });

        for (let i = 0; i < backs.length; i++)
        {
            let button = document.createElement("div");
            button.innerHTML = `<img src="${backs[i]}">`;
            button.classList.add("back");
            button.onmousedown = function()
            {
                for (let j = 0; j < dialog.querySelector("#backs").children.length; j++)
                {
                    dialog.querySelector("#backs").children[j].classList.remove("selected");
                }
                button.classList.add("selected");
                pickedBack = backs[i];
            };
            dialog.querySelector("#backs").appendChild(button);
        }

        dialog.querySelector("#ok").onclick = function()
        {
            if (pickedBack) solitaire.querySelector(".content").style.setProperty("--back", `url(${pickedBack})`);
            localStorage.setItem("solBack", pickedBack);
            dialog.close();
        }

        dialog.querySelector("#cancel").onclick = dialog.close;
    }

    solitaire.querySelector("#stack").onmousedown = function() {dealCardsToWaste(cardsToWaste)};
    solitaire.querySelector(".content").style.setProperty("--back", `url(${localStorage.getItem("solBack") || "res/cards/00-04.png"})`);
    deal();
}