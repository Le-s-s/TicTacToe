function gameLogic (p1,p2,board,tile,index, getTurn, setTurn){
    const turn = getTurn();
    if (board[index] !== null) return;
    if (turn === 0){
        tile.textContent = `${p1.tile}`;
        board[index] = p1.id;
        setTurn(1);
        console.log(`${p1.name} turn`);
    }
    else {
        tile.textContent = `${p2.tile}`;
        board[index] = p2.id;
        setTurn(0);
        console.log(`${p2.name} turn`);
    }
    const winner = didWin(p1,p2,board);
    if (winner === p1.name || winner === p2.name){ 
        alert(`${winner} wins, new game beginning.`);
        let game = document.querySelector('.gameBoard');
        game.innerHTML = ""
        TicTacToe()
    }
    // when board is not empty and no one won, restart.
    if (!board.includes(null) && !winner) {
    alert("Draw! New game beginning.");
    document.querySelector('.gameBoard').innerHTML = "";
    TicTacToe();
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

function player(){
    let name = prompt("What is thine name sire?")
    let tile = prompt("x or o?")
    let id = crypto.randomUUID();
    return {name,tile,id};
}



function TicTacToe(){
    let pTurn = 0;

    let player1 = player()
    let player2 = player()
    const [first,second] = firstMove(player1,player2);

    console.log(`${first.name} goes first.`)
    // Pass players and two closure functions that act as a getter and setter for pTurn.
    // () => pTurn reads the current turn,
    // v => pTurn = v mutates the private pTurn variable owned by TicTacToe.
    // This allows controlled access to private state without globals.
    displayBoard(first, second, () => pTurn, v => pTurn = v);
    
}

addEventListener("DOMContentLoaded", (event) => { 
    TicTacToe();
})

// Todo(if i want to)
// refine further with ai and visual improvements,
// quality of life, all that jazz.