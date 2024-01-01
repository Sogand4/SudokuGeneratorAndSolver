const { Random } = require("random-js");
const sudokuSolver = require("./solver");
const sudokuUtils = require('../sudokuUtils');

class SudokuGenerator extends sudokuUtils {

    constructor(numCellsRemoved) {
        super();
        this.numCellsRemoved = numCellsRemoved;
        this.solvedGrid = this.generateSolvedGrid();
        // this.printSudoku(solvedGrid);
        this.sudokuPuzzle = this.generateSudokuPuzzle(this.solvedGrid);
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

        const solver = new sudokuSolver(blankBoard);
        solver.setSolutionGrid();
        return solver.getGrid();
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
        const solvedGrid = new sudokuSolver(grid);
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

    getSolvedGrid() {
        return this.solvedGrid;
    }

}

module.exports = SudokuGenerator;