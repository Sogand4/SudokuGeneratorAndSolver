const sudokuUtils = require('../sudokuUtils');

class sudokuSolver extends sudokuUtils {
    constructor(grid) {
        super();
        this.grid = grid;
        this.solutionCount = 0;

        if (!this.gridIsValid()) {
            throw new Error("Starting grid is invalid. Please fix it and try again");
        }
    }

    setSolutionGrid() {
        if (!this.solveSudoku()) {
            throw new Error("No solution exists");
        }
    }

    setSolutionCount(grid) {
        this.solveSudokuWithAllSolutions(grid);
    }

    // Checks that the given grid is valid
    gridIsValid() {
        const reversedGrid = this.reverseMatrix(this.grid);

        for (let i = 0; i < 9; i++) {
            if (!this.isValidLine(this.grid[i]) || !this.isValidLine(reversedGrid[i]) || !this.isValidBox(i)) {
                return false;
            }
        }
        return true;
    }

    reverseMatrix(matrix) {
        const numRows = matrix.length;
        const numCols = matrix[0].length;

        const reversedMatrix = Array.from({ length: numCols }, () => Array(numRows).fill(0));

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                reversedMatrix[j][i] = matrix[i][j];
            }
        }

        return reversedMatrix;
    }

    // Checks that the line (either a row or column) contains no duplicates and no invalid numbers
    isValidLine(line) {
        const numSeen = new Set();

        for (let i = 0; i < 9; i++) {
            if (line[i] > 9 || line[i] < 0) {
                return false;
            }

            if (numSeen.has(line[i])) {
                return false;
            } else if (line[i] !== 0) {
                numSeen.add(line[i]);
            }
        }
        return true;
    }

    // Checks that the given box contains no duplicates or invalid numbers
    isValidBox(boxNum) {
        const numSeen = new Set();
        let rowIndexStart = 0;
        let colIndexStart = 0;

        // Set indexes to check that all 9 boxes are valid
        if (boxNum === 0 || boxNum === 3 || boxNum === 6) {
            colIndexStart = 0;
        } else if (boxNum === 1 || boxNum === 4 || boxNum === 7) {
            colIndexStart = 3;
        } else {
            colIndexStart = 6;
        }

        if (boxNum === 0 || boxNum === 1 || boxNum === 2) {
            rowIndexStart = 0;
        } else if (boxNum === 3 || boxNum === 4 || boxNum === 5) {
            rowIndexStart = 3;
        } else {
            rowIndexStart = 6;
        }

        for (let i = rowIndexStart; i < rowIndexStart + 3; i++) {
            for (let k = colIndexStart; k < colIndexStart + 3; k++) {
                if (this.grid[i][k] > 9 || this.grid[i][k] < 0) {
                    return false;
                }

                if (numSeen.has(this.grid[i][k])) {
                    return false;
                } else if (this.grid[i][k] !== 0) {
                    numSeen.add(this.grid[i][k]);
                }
            }
        }

        return true;
    }

    // DFS with backtracking algorithm to solve Sudoku. Sets grid to the first solution found.
    solveSudoku() {
        const emptyCell = this.findEmptyCell(this.grid);
        const digits = Array.from({ length: 9 }, (_, i) => i + 1);

        // Found solution if no empty cells remaining
        if (emptyCell === null) {
            return true;
        }

        const row = emptyCell[0];
        const col = emptyCell[1];

        // Shuffle the digits randomly
        // Ensures that the generator does not produce the same board when inputting a blank grid
        this.shuffleArray(digits);

        // Try placing digits 1 to 9 in the empty cell
        for (const num of digits) {
            if (this.isValidPlacement(this.grid, row, col, num)) {
                this.grid[row][col] = num;

                if (this.solveSudoku()) {
                    return true;
                }

                // If placing the digit didn't lead to a solution, backtrack
                this.grid[row][col] = 0;
            }
        }

        return false;
    }

    // DFS with backtracking algorithm to solve Sudoku. Gets the number of all solutions possible.
    solveSudokuWithAllSolutions(grid) {
        const digits = Array.from({ length: 9 }, (_, i) => i + 1);

        this.shuffleArray(digits);

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    for (const num of digits) {
                        if (this.isValidPlacement(grid, row, col, num)) {
                            grid[row][col] = num;

                            if (this.solveSudokuWithAllSolutions(grid)) {
                                this.solutionCount++;
                            }

                            grid[row][col] = 0;
                        }
                    }

                    return false;
                }
            }
        }

        return true;
    }

    // Check if a number can be placed in a given cell
    isValidPlacement(grid, row, col, num) {
        // Check if 'num' is not present in the current row and column
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num || grid[i][col] === num) {
                return false;
            }
        }

        // Check if 'num' is not present in the 3x3 grid
        const startRow = 3 * Math.floor(row / 3);
        const startCol = 3 * Math.floor(col / 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    // Find the first empty cell in the Sudoku grid, traversing by rows
    findEmptyCell(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    getGrid() {
        return this.grid;
    }

    getSolutionCount() {
        return this.solutionCount;
    }
}

module.exports = sudokuSolver;