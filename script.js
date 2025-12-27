let pTurn = 0;

function gameLogic (p1,p2,board,tile){
    turn(p1,p2,tile);
    console.log(`turn exited`);
    const winner = didWin(p1,p2,board);
    if (winner === p1.name || winner === p2.name) alert(winner);
    console.log(tile);
    console.log(p1.name,p2.name);
};

function displayBoard(p1,p2){
    const board = [11,12,13,21,22,23,31,32,33];
    const displayBoard = document.querySelector('.gameBoard');
    board.forEach(tiles => {
        let tile = document.createElement("div");
        tile.textContent = `-`;
        tile.classList.add("tile");
        tile.id = tiles;
        tile.addEventListener("click", () => {
            gameLogic(p1,p2,board,tile);
        });
        displayBoard.appendChild(tile);

    });
}

function firstMove(p1,p2){
    let p1Rng = Math.floor(Math.random() * 10);
    let p2Rng = Math.floor(Math.random() * 10);
    if (p1Rng === p2Rng) firstMove(p1,p2);
    if (p1Rng > p2Rng) {
        return [p1,p2];
    }
    else {
        return [p2,p1];
    }
}

function turn(p1,p2,tile){
    if (pTurn === 0){
        tile.textContent = `${p1.tile}`;
        tile.id = `${p1.tile}`;
        pTurn++;
        console.log(`${p1.name} turn`);
    }
    else if (pTurn === 1){
        tile.textContent = `${p2.tile}`;
        tile.id = `${p2.tile}`;
        pTurn--;
        console.log(`${p2.name} turn`);
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
        if (board[a].textContent === p1.tile &&
            board[b].textContent === p1.tile &&
            board[c].textContent === p1.tile) {
                console.log(`${p1.name} has won`)
                return p1.name;
        }
        else if (board[a].textContent === p2.tile &&
            board[b].textContent === p2.tile &&
            board[c].textContent === p2.tile) {
                console.log(`${p2.name} has won`)
                return p2.name;
        }
    
    }
    return false;
}

function player(){
    let name = prompt("What is thine name sire?")
    let tile = prompt("x or o?")
    let id = crypto.randomUUID;
    return {name,tile};
}



function TicTacToe(){
    let player1 = player()
    let player2 = player()
    const [first,second] = firstMove(player1,player2);

    console.log(`${first.name} goes first.`)
    displayBoard(first,second);
    
}

addEventListener("DOMContentLoaded", (event) => { 
    TicTacToe();
})

// create modular gameboard
// the gameboard must accept input from a player
// the player must pick a square
// if they pick a square, that slot is filled with their assigned x or o
// they cannot fill a filled square.