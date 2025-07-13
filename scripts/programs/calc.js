function createCalc() {
    let html = `
    <div class="sep"></div>
    <div class="content">
        <input readonly value="0," class="result"></input>
        <div class="toprow">
            <input readonly class="mem"></input>
            <div>
                <button class="big dkrd">Back</button>
                <button class="big dkrd">CE</button>
                <button class="big dkrd">C</button>            
            </div>
        </div>
        <div class="leftcolumn">
            <button class="red">MC</button>
            <button class="red">MR</button>
            <button class="red">MS</button>
            <button class="red">M+</button>
        </div>
        <div class="btns">
            <button class="blue">7</button><button class="blue">8</button><button class="blue">9</button><button class="red">/</button><button class="dkbl">sqrt</button>
            <button class="blue">4</button><button class="blue">5</button><button class="blue">6</button><button class="red">*</button><button class="dkbl">%</button>
            <button class="blue">1</button><button class="blue">2</button><button class="blue">3</button><button class="red">-</button><button class="dkbl">1/x</button>
            <button class="blue">0</button><button class="blue">+/-</button><button class="blue">,</button><button class="red">+</button><button class="red">=</button>
        </div>
    </div>`;
    let calc = createWindow({
        title: currentLang[80],
        icon: "res/calc16.png",
        html: html,
        maximizable: false,
        additionalClasses: ["program"],
        menu: [currentLang[11], currentLang[12], currentLang[13]],
        id: "calc"});

    let num1 = "", num2 = "", oper = "", memory = 0, currentNum = 1, gotResult = false;

    function updateDisplay(value) {
        calc.querySelector(".result").value = value.toString().replace(".", ",");
        if (!calc.querySelector(".result").value.includes(",")) calc.querySelector(".result").value += ",";
    }

    calc.querySelectorAll(".content button").forEach((button) => {
        button.onclick = function () {
            let text = button.innerText;

            if ("1234567890".includes(text) || text === ",") {
                if (gotResult) {
                    gotResult = false;
                    currentNum = 1;
                    num1 = "";
                    num2 = "";
                    oper = "";
                    updateDisplay(0);
                }

                if (currentNum === 1) {
                    if (text === "," && num1.includes(",")) return;
                    num1 = (num1 + text).replace(/^0+/, '') || "0";
                    if (num1[0] == ",") num1 = 0 + num1;
                    updateDisplay(num1);
                } else {
                    if (text === "," && num2.includes(".")) return;
                    num2 = (num2 + text).replace(/^0+/, '') || "0";
                    if (num2[0] == ",") num2 = 0 + num2;
                    updateDisplay(num2);
                }
            } else if ("+-/*".includes(text) && num1) {
                if (gotResult) {
                    num1 = calc.querySelector(".result").value;
                    num2 = "";
                    gotResult = false;
                }
                currentNum = 2;
                oper = text;
            } else if (text === "=" && num1 && num2 && oper) {
                let result;
                let x = parseFloat(num1.replace(",", "."));
                let y = parseFloat(num2.replace(",", "."));
                switch (oper) {
                    case "+":
                        result = x + y;
                        break;
                    case "-":
                        result = x - y;
                        break;
                    case "*":
                        result = x * y;
                        break;
                    case "/":
                        result = x / y;
                        break;
                }
                updateDisplay(result);
                num1 = result.toString();
                gotResult = true;
            } else if (text === "Back" && !gotResult) {
                if (currentNum === 1 && num1) {
                    num1 = num1.slice(0, -1);
                    updateDisplay(num1 || 0);
                } else if (currentNum === 2 && num2) {
                    num2 = num2.slice(0, -1);
                    updateDisplay(num2 || 0);
                }
            } else if (text === "CE") {
                if (gotResult) {
                    updateDisplay(0);
                } else if (currentNum === 1) {
                    num1 = "";
                    updateDisplay(0);
                } else if (currentNum === 2) {
                    num2 = "";
                    updateDisplay(0);
                }
            } else if (text === "C") {
                gotResult = false;
                currentNum = 1;
                num1 = "";
                num2 = "";
                oper = "";
                updateDisplay(0);
            } else if (text === "MS") {
                memory = parseFloat(calc.querySelector(".result").value.replace(",", "."));
                calc.querySelector(".mem").value = memory === 0 ? "" : "M";
            } else if (text === "M+") {
                memory += parseFloat(calc.querySelector(".result").value.replace(",", "."));
                calc.querySelector(".mem").value = memory === 0 ? "" : "M";
            } else if (text === "MC") {
                memory = 0;
                calc.querySelector(".mem").value = "";
            } else if (text === "MR") {
                if (gotResult || currentNum === 1) {
                    num1 = memory.toString();
                    updateDisplay(num1);
                } else if (currentNum === 2) {
                    num2 = memory.toString();
                    updateDisplay(num2);
                }
                gotResult = true;
            } else if (text === "sqrt") {
                if (currentNum === 1) {
                    num1 = Math.sqrt(parseFloat(num1.replace(",", "."))).toString();
                    updateDisplay(num1);
                } else if (currentNum === 2) {
                    num2 = Math.sqrt(parseFloat(num2.replace(",", "."))).toString();
                    updateDisplay(num2);
                }
            } else if (text === "1/x") {
                if (currentNum === 1) {
                    num1 = (1 / parseFloat(num1.replace(",", "."))).toString();
                    updateDisplay(num1);
                } else if (currentNum === 2) {
                    num2 = (1 / parseFloat(num2.replace(",", "."))).toString();
                    updateDisplay(num2);
                }
            } else if (text === "%") {
                if (num1 && num2 && oper) {
                    let x = parseFloat(num1.replace(",", "."));
                    let y = parseFloat(num2.replace(",", "."));
                    let result = (x * y) / 100;
                    updateDisplay(result);
                    num1 = result.toString();
                    gotResult = true;
                }
            }
        }
    });
}