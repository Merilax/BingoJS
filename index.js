let gameEnd = false;

let bingo = new Bingo();

let bola = document.getElementById("bola");
let bingoTable = document.createElement("table");
let cartonListHTML = document.getElementsByClassName("carton");
let cartonList = [];
bingoTable.border = 1;
bola.appendChild(bingoTable);

initGame();

// Roll a number
function roll() {
    // Softlock script when game ends
    if (gameEnd) return;

    let rolled = bingo.roll();

    for (let i = 0; i < cartonListHTML.length; i++) {
        const cartonTable = cartonListHTML.item(i).childNodes.item(0);
        let complete = cartonList[i].setCell(rolled);

        updateTable(cartonTable, rolled);

        // Highlight winner card(s)
        if (complete) {
            cartonListHTML.item(i).style.boxShadow = "0 0 20px #0f0";
            console.log("Bingo! End of game.");
            gameEnd = true;
            haltInterval = true;
        }
    };
}

// Roll every set time
let haltInterval = true;
let intervalId;
function autoroll() {
    haltInterval = !haltInterval;

    const autorollBtn = document.getElementById("autorollBtn");
    haltInterval ?
        autorollBtn.innerText = "Iniciar modo automático" :
        autorollBtn.innerText = "Detener modo automático";

    if (haltInterval) {
        clearInterval(intervalId);
        return;
    };

    intervalId = setInterval(() => {
        roll();
    }, 1000);
}

// Draw tables
function initGame() {
    let x = 1;
    // Draw bingo table
    for (let i = 0; i < 10; i++) {
        let tr = document.createElement("tr");
        bingoTable.appendChild(tr);
        // End after 90 cells
        if (x == 91) {
            break;
        }
        for (let j = 0; j < 10; j++) {
            tr.insertCell();

            tr.cells.item(j).textContent = x;
            x++;
        }
    }

    // Draw card tables 
    for (let h = 0; h < cartonListHTML.length; h++) {
        let carton = new Carton();
        cartonList.push(carton);

        const div = cartonListHTML.item(h);
        let table = document.createElement("table");
        table.border = 1;
        div.appendChild(table);

        // Add rows
        for (let i = 0; i < 3; i++) {
            let tr = document.createElement("tr");
            table.appendChild(tr);
            for (let j = 0; j < 9; j++) {
                tr.insertCell();
            }
            // Fill table cells according to card cells
            for (let j = 0; j < 9; j++) {
                if (carton.cellNum[j][i] == 0) {
                    continue;
                }
                tr.cells.item(Math.floor((carton.cellNum[j][i] - 1) / 10)).textContent = carton.cellNum[j][i];
            }
        }
    }
}

// Darken rolled numbers on all tables
function updateTable(cartonTable, num) {
    for (let i = 0; i < cartonTable.childNodes.length; i++) {
        for (let j = 0; j < cartonTable.childNodes.item(i).childNodes.length; j++) {
            if (cartonTable.childNodes.item(i).childNodes.item(j).innerHTML == num) {
                cartonTable.childNodes.item(i).childNodes.item(j).style.backgroundColor = "#0008";
            }
        }
    }
    for (let i = 0; i < bingoTable.childNodes.length; i++) {
        for (let j = 0; j < bingoTable.childNodes.item(i).childNodes.length; j++) {
            if (bingoTable.childNodes.item(i).childNodes.item(j).innerHTML == num) {
                bingoTable.childNodes.item(i).childNodes.item(j).style.backgroundColor = "#0008";
            }
        }
    }
}