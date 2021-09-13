const gameBoard = ( () => {
    let gameBoardArr = [
    '', '', '', 
    '', '', '', 
    '', '', ''
    ];

    const getGameBoard = () => gameBoardArr;

    let updateGameBoard = (position, sign) => {
        gameBoardArr[position] = sign;
        display.moves();
    }

    const activate  = () => {
        const blocks = document.querySelectorAll('.gameboard-block');
        blocks.forEach( block => {
            block.addEventListener('click', () => {
                if(player1.getIsPlayersTurn() == true){
                    player1.makeAMove(block.id);
                    player2.setIsPlayersTurn(true);
                }
                else {
                    player2.makeAMove(block.id);
                    player1.setIsPlayersTurn(true);
                }
            })
        })
    }

    return {
        getGameBoard,
        updateGameBoard,
        activate,
    };
})();

const display = ((movesArr) => {

    const grid = () => {
        const body = document.querySelector('body');
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

        body.appendChild(gameboard_div);
        gameBoard.activate();
    }

    const moves = () => {
        for(let i=0; i<movesArr.length; i++)
        {
            let row, col;
            if(i <= 2) row = 1;
            else if(i <= 5) row = 2;
            else row = 3;

            if(i == 0 || i == 3 || i == 6) col = 1;
            else if(i == 1 || i == 4 || i == 7) col = 2;
            else col = 3;
        
            const block_div = document.querySelector(`#r${row}c${col}`);
            block_div.innerText = `${movesArr[i]}`;
        }
    }

    return {
        grid,
        moves,
    }
})(gameBoard.getGameBoard());

display.grid();
display.moves();

const Player = (name, sign) => {
    let isPlayersTurn = true; //if ture x starts else o starts

    const getIsPlayersTurn = () => isPlayersTurn;
    const setIsPlayersTurn = (isTurn) => {isPlayersTurn = isTurn;};

    const makeAMove = (clickedBlockId) => {
        let blockPosInArr = (clickedBlockId[1]-1)*3 + (clickedBlockId[3]-1);
        if(gameBoard.getGameBoard()[blockPosInArr] === '')
        {
            gameBoard.updateGameBoard(blockPosInArr, sign);
            isPlayersTurn = false;
        }
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