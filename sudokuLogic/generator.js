const { Random } = require("random-js");
const { SudokuSolver } = require("./solver");

class SudokuGenerator extends SudokuUtils {

    constructor(numCellsRemoved) {
        this.numCellsRemoved = numCellsRemoved;
        const solvedGrid = this.generateSolvedGrid();
        // this.printSudoku(solvedGrid);
        this.sudokuPuzzle = this.generateSudokuPuzzle(solvedGrid);
        //this.printSudoku(sudokuPuzzle);
    }

    generateSolvedGrid() {
        const blankBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        const solvedGrid = new SudokuSolver(blankBoard);
        solvedGrid.setSolutionGrid();
        return solvedGrid.getGrid();
    }

    generateSudokuPuzzle(solvedGrid) {
        let numCellsRemoved = 0;
        const random = new Random();
        const puzzle = this.cloneGrid(solvedGrid);

        while (numCellsRemoved < this.numCellsRemoved) {
            const row = random.integer(0, 8);
            const col = random.integer(0, 8);

            // Skip if the cell is already empty
            if (puzzle[row][col] === 0) {
                continue;
            }

            const temp = puzzle[row][col];
            puzzle[row][col] = 0;
            numCellsRemoved++;

            if (!this.hasUniqueSolution(puzzle)) {
                // Restore the number if removing it resulted in multiple solutions
                puzzle[row][col] = temp;
                numCellsRemoved--;
            }
        }

        return puzzle;
    }

    hasUniqueSolution(grid) {
        const solvedGrid = new SudokuSolver(grid);
        solvedGrid.setSolutionCount(grid);
        return solvedGrid.getSolutionCount() === 1;
    }

    cloneGrid(source) {
        const clone = new Array(source.length);
        for (let i = 0; i < source.length; i++) {
            clone[i] = source[i].slice();
        }
        return clone;
    }

    getPuzzleGrid() {
        return this.sudokuPuzzle;
    }

}

module.exports = SudokuGenerator;