//your JS code here. If required.
document.getElementById('submit').addEventListener('click', startGame);

function startGame() {
    const player1 = document.getElementById('player-1').value;
    const player2 = document.getElementById('player-2').value;

    if (player1 && player2) {
        document.getElementById('player-input').style.display = 'none';
        document.getElementById('game-board').style.display = 'block';

        const messageDiv = document.querySelector('.message');
        let currentPlayer = player1;
        messageDiv.textContent = `${currentPlayer}, you're up`;

        const cells = document.querySelectorAll('.cell');
        let board = Array(9).fill(null);
        let gameActive = true;

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                if (cell.textContent === '' && gameActive) {
                    cell.textContent = currentPlayer === player1 ? 'X' : 'O';
                    board[cell.id - 1] = currentPlayer;

                    if (checkWin(board, currentPlayer)) {
                        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
                        gameActive = false;
                    } else if (board.every(cell => cell)) {
                        messageDiv.textContent = `It's a draw!`;
                        gameActive = false;
                    } else {
                        currentPlayer = currentPlayer === player1 ? player2 : player1;
                        messageDiv.textContent = `${currentPlayer}, you're up`;
                    }
                }
            });
        });
    } else {
        alert('Please enter names for both players');
    }
}

function checkWin(board, player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );

}



