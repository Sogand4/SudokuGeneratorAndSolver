const express = require('express');
const path = require('path'); // Add this line to import the path module
const sudokuSolver = require('./sudokuLogic/solver.js');
const SudokuGenerator = require('./sudokuLogic/generator.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'index.html'));
});

router.get('/solveSudoku', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'sudokuSolver.html'));
});

router.get('/generateSudoku', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'sudokuGenerator.html'));
});

router.post('/generateSudoku', (req, res) => {
    const numCellsRemoved = req.body.numCellsRemoved;

    try {
        const puzzle = new SudokuGenerator(numCellsRemoved);
        const board = puzzle.getPuzzleGrid();
        const solvedBoard = puzzle.getSolvedGrid();

        res.json({ board, solvedBoard });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/solveSudoku', (req, res) => {
    const grid = req.body.grid;

    try {
        const solver = new sudokuSolver(grid);
        solver.setSolutionGrid();

        const solution = solver.getGrid();
        res.json({ solution });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
