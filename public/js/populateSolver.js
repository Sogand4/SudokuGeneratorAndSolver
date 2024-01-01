// Creates 9x9 input grid
function createInputGrid() {
    const inputGrid = document.getElementById('inputGrid');
    for (let i = 0; i < 9; i++) {
        const row = inputGrid.insertRow(i);
        for (let j = 0; j < 9; j++) {
            const cell = row.insertCell(j);
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            cell.appendChild(input);
        }
    }
}

// Creates 9x9 output grid
function createOutputGrid() {
    const outputGrid = document.getElementById('outputGrid');
    for (let i = 0; i < 9; i++) {
        const row = outputGrid.insertRow(i);
        for (let j = 0; j < 9; j++) {
            const cell = row.insertCell(j);
            cell.classList.add('solved-cell');
        }
    }
}

// Extract the values from the input grid
function getInputValues() {
    const inputGrid = document.getElementById('inputGrid');
    const values = [];
    for (let i = 0; i < 9; i++) {
        const row = inputGrid.rows[i];
        const rowValues = [];
        for (let j = 0; j < 9; j++) {
            const input = row.cells[j].querySelector('input');
            rowValues.push(parseInt(input.value) || 0);
        }
        values.push(rowValues);
    }
    return values;
}

// Update the output grid with solved values
function updateOutputGrid(solvedValues) {
    const outputGrid = document.getElementById('outputGrid');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = outputGrid.rows[i].cells[j];
            cell.textContent = solvedValues[i][j];
        }
    }
}

// Function to solve the Sudoku puzzle
async function solveSudoku() {
    const inputValues = getInputValues();
    try {
        solvedValues = await solveSudokuRequest(inputValues);

        //console.log('Solved Values:', solvedValues);

        if (solvedValues && solvedValues.length > 0) {
            updateOutputGrid(solvedValues);
        } else {
            alert('An error occurred.');
        }
    } catch (error) {
        //console.error('Error:', error);
        alert(error.message);
    }
}

async function solveSudokuRequest(inputValues) {
    var response = null;

    try {
        response = await fetch('http://localhost:3000/solveSudoku', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ grid: inputValues }),
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


createInputGrid();
createOutputGrid();
