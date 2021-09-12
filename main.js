const gameBoard = ( () => {
    let gameBoardArr = [
    'x', 'o', 'x', 
    'o', 'x', 'o', 
    'x', 'o', 'x'
    ];

    let getGameBoard = () => gameBoardArr;

    return {
        getGameBoard,
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