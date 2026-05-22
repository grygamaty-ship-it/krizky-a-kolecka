
// =========================
// POLE
// =========================

let board = ["", "", "", "", "", "", "", "", ""];

// =========================
// PROMĚNNÉ
// =========================

let currentPlayer = "X";
let gameActive = true;

// =========================
// HTML PRVKY
// =========================

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const messageText = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

// =========================
// VÝHERNÍ KOMBINACE
// =========================

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

// =========================
// UDÁLOSTI
// =========================

for(let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", cellClick);
}

restartBtn.addEventListener("click", restartGame);

// =========================
// FUNKCE
// =========================

function cellClick() {

    try {

        // index kliknutého pole
        let index = this.getAttribute("data-index");

        // kontrola aktivní hry
        if(gameActive === false) {
            throw "Hra již skončila!";
        }

        // kontrola obsazeného pole
        if(board[index] !== "") {
            throw "Toto pole je již obsazené!";
        }

        // vložení symbolu
        board[index] = currentPlayer;

        this.textContent = currentPlayer;

        // kontrola výhry
        checkWinner();

        // změna hráče
        changePlayer();

    }
    catch(error) {

        messageText.textContent = error;

    }
    finally {

        console.log("Kliknutí proběhlo.");

    }

}

// =========================
// KONTROLA VÝHRY
// =========================

function checkWinner() {

    let winner = false;

    // FOR SMYČKA
    for(let i = 0; i < winPatterns.length; i++) {

        let pattern = winPatterns[i];

        let a = board[pattern[0]];
        let b = board[pattern[1]];
        let c = board[pattern[2]];

        // IF ELSE
        if(a === "" || b === "" || c === "") {
            continue;
        }

        if(a === b && b === c) {

            winner = true;

            statusText.textContent = "Vyhrál hráč: " + currentPlayer;

            gameActive = false;

        }

    }

    // remíza
    let filled = 0;

    // WHILE SMYČKA
    while(filled < board.length && board[filled] !== "") {
        filled++;
    }

    if(filled === board.length && winner === false) {

        statusText.textContent = "Remíza!";
        gameActive = false;

    }

}

// =========================
// ZMĚNA HRÁČE
// =========================

function changePlayer() {

    // SWITCH
    switch(currentPlayer) {

        case "X":
            currentPlayer = "O";
            break;

        case "O":
            currentPlayer = "X";
            break;

    }

    // změna textu
    if(gameActive === true) {
        statusText.textContent = "Hraje: " + currentPlayer;
    }

}

// =========================
// RESTART HRY
// =========================

function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameActive = true;

    statusText.textContent = "Hraje: X";

    messageText.textContent = "";

    // vyčištění polí
    for(let i = 0; i < cells.length; i++) {

        cells[i].textContent = "";

    }

}


