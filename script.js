var orgCode = [0,0,0,0];
var row;
var cellsColor = [0,0,0,0];
const colors = ['tomato', 'green', 'blue', 'violet', 'black', 'yellow'];
const rows = document.querySelectorAll('.row');
const cells = document.querySelectorAll('.cell');
const results = document.querySelectorAll('.result'); 

function startGame() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].style.removeProperty('background-color');
    }
    for (var i = 0; i < results.length; i++) {
        results[i].innerText = "";
    }
    row = 0;
    prepareRow();
    pickCode();
    document.getElementById("startButton").style.display = 'none';
}

function prepareRow() {
    for (var i = 4 * row; i < 4 * row + 4; i++) {
        cells[i].addEventListener('click', change);
        cells[i].style.cursor = 'pointer';
    }
    for (var i = 0; i < 4; i++) {
        cellsColor[i] = -1;
    }
    document.getElementById("checkButton").style.visibility = 'hidden';
}

function change(circle) {
    var cId = circle.target.id;
    cellsColor[cId % 4] = (cellsColor[cId % 4] + 1) % 6;
    cells[cId].style.backgroundColor = colors[cellsColor[cId % 4]];
    if (cellsColor.indexOf(-1) == -1) showCheck();
}

function pickCode() {
    for (var i = 0; i < 4; i++) {
        orgCode[i] = Math.floor(Math.random() * 6);
    }
    console.log(orgCode);
}

function showCheck() {
    document.getElementById("checkButton").style.visibility = 'visible';
}

function check() {
    var board = cellsColor;
    console.log(board); // DELETE THIS LINE!!!!!!!
    var right = 0;
    var wrong = 0;
    for (var i = 0; i < 4; i++) {
        if (orgCode[i] == board[i]) {
            right++;
            board[i] = -1;
        }
    }
    for (var i = 0; i < 4; i++) {
        if (board[i] == -1) continue;
        var pos = board.indexOf(orgCode[i]);
        if (pos != -1) {
            wrong++;
            board[pos] = -2;
        }
    }
    displayResult(right, wrong);
    cancelRow(row);
    if (right == 4) gameWon();
    else if (row == 9) gameLost();
    else {
        row++;
        prepareRow(row);
    }
}

function gameWon() {
    alert("Congratulatons! You won!");
    startGame();
}

function gameLost() {
    alert("You lost, try again");
    startGame();
}

function displayResult(right, wrong) {
    resultId = 50 + row;
    document.getElementById(resultId).innerText = right + " " + wrong;
}

function cancelRow() {
    for (var i = 4 * row; i < 4 * row + 4; i++) {
        cells[i].removeEventListener('click', change);
        cells[i].style.cursor = 'default';
    }
}