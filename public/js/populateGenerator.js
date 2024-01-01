function generateBoard(difficulty) {
    try {
        repsonse = getBoards(difficulty);

        document.getElementById('boardContainer').innerHTML = formatBoard(response.board);
        document.getElementById('revealSolutionBtn').style.display = 'block';
    } catch(error) {
        alert("An unexpected error occured: " + error.message);
    }
}

async function getBoards(difficulty) {
    let numCellsRemoved;
    var response = null;

    // Set the number of clues based on difficulty
    switch (difficulty) {
        case 'easy':
            numCellsRemoved = 45;
            break;
        case 'medium':
            numCellsRemoved = 55;
            break;
        case 'hard':
            numCellsRemoved = 75;
            break;
        default:
            numCellsRemoved = 45;
    }

    try {
        response = await fetch('http://localhost:3000/generateSudoku', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ numCellsRemoved: numCellsRemoved }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data.solution;
    } catch (error) {
        throw error;
    }
}

function revealSolution() {
    document.getElementById('boardContainer').innerHTML = formatBoard(response.solvedBoard);
    document.getElementById('revealSolutionBtn').style.display = 'none';
}

function formatBoard(board) {
    let html = '<table>';

    for (let i = 0; i < board.length; i++) {
        html += '<tr>';
        for (let j = 0; j < board[i].length; j++) {
            const value = board[i][j];
            const cellContent = value !== 0 ? value : '<input type="text" maxlength="1" />';
            html += `<td>${cellContent}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    return html;
}