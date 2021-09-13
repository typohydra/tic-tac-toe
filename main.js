const gameBoard = ( () => {
    let player1Score = 0;
    let player2Score = 0;
    let gameBoardArr = [
        '', '', '', 
        '', '', '', 
        '', '', ''
    ];

    const getGameBoard = () => gameBoardArr;

    const updateGameBoard = (position, sign) => {
        gameBoardArr[position] = sign;
        display.moves();
    }

    const activate  = () => {
        const blocks = document.querySelectorAll('.gameboard-block');
        blocks.forEach( block => {
            block.addEventListener('click', () => {
                if(player1.getIsPlayersTurn() === true){
                    player1.makeAMove(block.id) 
                }
                else if(player2.getIsPlayersTurn() === true){
                    player2.makeAMove(block.id)
                }
            });
        })
    }

    const winnerParagraph = document.querySelector('#winner');
    const checkForWinner = (sign) => {
        if( 
        //horizontal win
            gameBoardArr[0] == sign && gameBoardArr[1] == sign && gameBoardArr[2] == sign||
            gameBoardArr[3] == sign && gameBoardArr[4] == sign && gameBoardArr[5] == sign||
            gameBoardArr[6] == sign && gameBoardArr[7] == sign && gameBoardArr[8] == sign||
        //vertical win
            gameBoardArr[0] == sign && gameBoardArr[3] == sign && gameBoardArr[6] == sign||
            gameBoardArr[1] == sign && gameBoardArr[4] == sign && gameBoardArr[7] == sign||
            gameBoardArr[2] == sign && gameBoardArr[5] == sign && gameBoardArr[8] == sign||
        //diagonal win
            gameBoardArr[0] == sign && gameBoardArr[4] == sign && gameBoardArr[8] == sign||
            gameBoardArr[2] == sign && gameBoardArr[4] == sign && gameBoardArr[6] == sign
        ) {
            if(sign === 'x') player1Score++;
            else player2Score++;

            display.score(player1Score, player2Score);

            if(player1Score === 3) {
                winnerParagraph.innerText = 'winner is X';
                player1Score = player2Score = 0;
            }
            else if(player2Score === 3) {
                winnerParagraph.innerText = 'winner is O';
                player1Score = player2Score = 0;
            }

            player1.setIsPlayersTurn(false);
            player2.setIsPlayersTurn(false);
        }
        else { // change turns
            if(sign === 'x') {
                player2.setIsPlayersTurn(true);
                player1.setIsPlayersTurn(false);
            }
            else {
                player1.setIsPlayersTurn(true);
                player2.setIsPlayersTurn(false);
            }
        }
    }    

    const restart = () => {
        const restartBtn = document.querySelector('#restart');
        restartBtn.addEventListener('click', () => {
            gameBoardArr = [
                '', '', '', 
                '', '', '', 
                '', '', ''
            ];
            display.moves(gameBoardArr);
            if(player1Score === 0 && player2Score === 0 ) {
                display.score(0, 0);
                winnerParagraph.innerText = '';
            }
            player1.setIsPlayersTurn(true);
            player2.setIsPlayersTurn(true);
        });
    }

    return {
        getGameBoard,
        updateGameBoard,
        activate,
        checkForWinner,
        restart,
    };
})();

gameBoard.restart();

const display = (() => {
    
    const grid = () => {
        const containerMain = document.querySelector('#main-container');
        const gameboard_div = document.createElement('div');
        gameboard_div.id = 'gameboard';

        for(let i=0; i<3; i++) {
            const row = document.createElement('div');
            row.classList.add('gameboard-block-row');
            gameboard_div.appendChild(row);

            for(let j=0; j<3; j++) {
                const block = document.createElement('div');
                block.classList.add('gameboard-block');
                block.id = `r${i+1}c${j+1}`; // row column
                row.appendChild(block);
            }
        }

        containerMain.appendChild(gameboard_div);
        gameBoard.activate();
    }

    const moves = () => {
        for(let i=0; i<9; i++)
        {
            let row, col;
            if(i <= 2) row = 1;
            else if(i <= 5) row = 2;
            else row = 3;

            if(i == 0 || i == 3 || i == 6) col = 1;
            else if(i == 1 || i == 4 || i == 7) col = 2;
            else col = 3;
        
            const block_div = document.querySelector(`#r${row}c${col}`);
            block_div.innerText = `${gameBoard.getGameBoard()[i]}`;
        }
    }

    const score = (player1Score, player2Score) => {
        const scoreSpan = document.querySelector('#score');
        scoreSpan.innerText = `${player1Score} : ${player2Score}`;
    }

    return {
        grid,
        moves,
        score,
    }
})();

display.grid();
display.score(0, 0);

const Player = (name, sign) => {
    let isPlayersTurn = true;

    const getIsPlayersTurn = () => isPlayersTurn;
    const setIsPlayersTurn = (isTurn) => {isPlayersTurn = isTurn;};

    const makeAMove = (clickedBlockId) => {
        let blockPosInArr = (clickedBlockId[1]-1)*3 + (clickedBlockId[3]-1);
        if(gameBoard.getGameBoard()[blockPosInArr] === '')
        {
            gameBoard.updateGameBoard(blockPosInArr, sign);
            gameBoard.checkForWinner(sign);
            return true;
        }
        return false;
    }
    return {
        name, 
        sign, 
        makeAMove,
        getIsPlayersTurn,
        setIsPlayersTurn,
    };
}

const player1 = Player('player1', 'x');
const player2 = Player('player2', 'o');