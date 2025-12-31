function gameLogic (p1,p2,board,tile,index, getTurn, setTurn){
    const turn = getTurn();
    if (board[index] !== null) return;
    if (turn === 0){
        tile.textContent = `${p1.tile}`;
        board[index] = p1.id;
        setTurn(1);
        alert(`${p1.name} turn`);
    }
    else {
        tile.textContent = `${p2.tile}`;
        board[index] = p2.id;
        setTurn(0);
        alert(`${p2.name} turn`);
    }
    const winner = didWin(p1,p2,board);
    if (winner === p1.name || winner === p2.name){ 
        alert(`${winner} wins!`);
        clearBoard();
    }
    // when board is not empty and no one won, restart.
    if (!board.includes(null) && !winner) {
    alert("Draw!");
    clearBoard();
    }
    
};

function displayBoard(p1, p2, getTurn, setTurn){
    const board = Array(9).fill(null);
    const displayBoard = document.querySelector('.gameBoard');
    board.forEach((_,index) => {
        let tile = document.createElement("div");
        tile.textContent = `-`;
        tile.classList.add("tile");

        tile.addEventListener("click", () => {
            gameLogic(p1,p2,board,tile,index, getTurn, setTurn);
        });
        displayBoard.appendChild(tile);

    });
}

function firstMove(p1,p2){
    let p1Rng = Math.floor(Math.random() * 10);
    let p2Rng = Math.floor(Math.random() * 10);
    if (p1Rng === p2Rng) return firstMove(p1,p2);
    if (p1Rng > p2Rng) {
        return [p1,p2];
    }
    else {
        return [p2,p1];
    }
}

function didWin(p1,p2,board){
    console.log(`win entered`);
    const winCon = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // columns
        [0,4,8], [2,4,6]           // diagonals
    ];

    for (let condition of winCon){
        let [a,b,c] = condition;
        if (board[a] === p1.id &&
            board[b] === p1.id &&
            board[c] === p1.id) {
                console.log(`${p1.name} has won`)
                return p1.name;
        }
        else if (board[a] === p2.id &&
            board[b] === p2.id &&
            board[c] === p2.id) {
                console.log(`${p2.name} has won`)
                return p2.name;
        }
    
    }
    return false;
}

function player(inputName,tileChoice){
    let name = inputName;
    let tile = tileChoice;
    let id = crypto.randomUUID();
    return {name,tile,id};
}



function TicTacToe(){
    let pTurn = 0;

    const p1Input = document.querySelector('.p1').value.trim();
    const p2Input = document.querySelector('.p2').value.trim();

    if (!p1Input || !p2Input) {
        alert("Both players must enter a name.");
        return;
    }

    let player1 = player(p1Input, "x")
    let player2 = player(p2Input, "o")

    const [first,second] = firstMove(player1,player2);

    alert(`${first.name} goes first.`)
    // Pass players and two closure functions that act as a getter and setter for pTurn.
    // () => pTurn reads the current turn,
    // v => pTurn = v mutates the private pTurn variable owned by TicTacToe.
    // This allows controlled access to private state without globals.
    displayBoard(first, second, () => pTurn, v => pTurn = v);
    
}

addEventListener("DOMContentLoaded", (event) => { 
    const startButton = document.querySelector('.gameStart');
    const resetButton = document.querySelector('.gameReset');

    startButton.addEventListener("click", () => {
        TicTacToe();
    });

    resetButton.addEventListener("click", () => {
        clearBoard();
    });
})

function clearBoard(){
    document.querySelector('.gameBoard').innerHTML = "";
}

// Todo(if i want to)
// refine further with ai and visual improvements,
// quality of life, all that jazz.