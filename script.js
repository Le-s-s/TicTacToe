const gameModules = (function (){

    // initiates game of tic tac toe
    const gameStart = function(){
        let pTurn = 0;

        const p1Input = document.querySelector('.p1').value.trim();
        const p2Input = document.querySelector('.p2').value.trim();

        if (!p1Input || !p2Input) {
            alert("Both players must enter a name.");
            return;
        }

        let player1 = player(p1Input, "x", "p1")
        let player2 = player(p2Input, "o", "p2")

        const [first,second] = firstMove(player1,player2);
        first.dom.classList.add("turn")
        alert(`${first.name} goes first, with ${first.tile}'s`)
        // Pass players and two closure functions that act as a getter and setter for pTurn.
        // () => pTurn reads the current turn,
        // v => pTurn = v mutates the private pTurn variable owned by TicTacToe.
        // This allows controlled access to private state without globals.
        displayBoard(first, second, () => pTurn, v => pTurn = v);
        
    }

    // creation of player
    const player = function(inputName,tileChoice,domClass){
        let name = inputName;
        let tile = tileChoice;
        let id = crypto.randomUUID();
        const dom = document.querySelector(`.${domClass}`)
        console.log(dom)
        return {name,tile,id,dom};
    }

    // display creation
    const displayBoard = function(p1, p2, getTurn, setTurn){
        const board = Array(9).fill(null);
        const displayBoard = document.querySelector('.gameBoard');
        displayBoard.innerHTML = "";
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

    // general game flow logic
    const gameLogic = function(p1,p2,board,tile,index, getTurn, setTurn){
        const turn = getTurn();
 
        if (board[index] !== null) return;
        if (turn === 0){
            tile.textContent = `${p1.tile}`;
            board[index] = p1.id;
            setTurn(1);
            console.log(`${p2.name}'s turn`);
            p2.dom.classList.add("turn")
            p1.dom.classList.remove("turn")
        }
        else {

            tile.textContent = `${p2.tile}`;
            board[index] = p2.id;
            setTurn(0);
            console.log(`${p1.name}'s turn`);
            p1.dom.classList.add("turn")
            p2.dom.classList.remove("turn")
        }

        const winner = didWin(p1,p2,board);

        if (winner === p1.name || winner === p2.name){ 
            p1.dom.classList.remove("turn")
            p2.dom.classList.remove("turn")
            alert(`${winner} wins!`);
            clearBoard();
        }
        // when board is not empty and no one won, restart.
        if (!board.includes(null) && !winner) {
            p1.dom.classList.remove("turn")
            p2.dom.classList.remove("turn")
            alert("Draw!");
            clearBoard();
        }
        
    };

    // function for deciding turn order
    const firstMove = function(p1,p2){
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

    // win checking function
    const didWin = function(p1,p2,board){
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

    // board clearing function
    const clearBoard = function(){
        document.querySelector('.gameBoard').innerHTML = "";
    }

    return {gameStart,player,displayBoard,gameLogic,firstMove,didWin,clearBoard};
})();

addEventListener("DOMContentLoaded", (event) => { 
    const startButton = document.querySelector('.gameStart');
    const resetButton = document.querySelector('.gameReset');

    startButton.addEventListener("click", () => {
        gameModules.gameStart();
    });

    resetButton.addEventListener("click", () => {
        gameModules.clearBoard();
        gameModules.gameStart();
    });
})

// Todo(if i want to)
// refine further with ai and visual improvements,
// quality of life, all that jazz.