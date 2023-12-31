// Helper function to create a 9x9 input grid
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

// Helper function to create a 9x9 output grid
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

// Helper function to extract the values from the input grid
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

// Helper function to update the output grid with solved values
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
function solveSudoku() {
    const inputValues = getInputValues();

    // Call your Sudoku solving logic here
    const solvedValues = solveSudokuLogic(inputValues);

    if (solvedValues) {
        updateOutputGrid(solvedValues);
    } else {
        alert('No solution found for the given input.');
    }
}

// TODO
function solveSudokuLogic(inputValues) {
    
    return inputValues;
}

createInputGrid();
createOutputGrid();
