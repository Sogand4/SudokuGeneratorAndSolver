const express = require('express');
const bodyParser = require('body-parser');
const sudokuSolver = require('./sudokuLogic/solver.js');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public/js')));

app.get('/', (req, res) => {
    res.send('Hello, this is the Sudoku Solver and Generator app!');
});

app.get('/solveSudoku', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'sudokuSolver.html'));
});

app.get('/generateSudoku', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'sudokuGenerator.html'));
});

app.post('/solveSudoku', (req, res) => {
    const grid = req.body.grid;

    try {
        const solver = new sudokuSolver(grid);
        solver.setSolutionGrid();

        const solution = solver.getGrid();
        res.json({ solution });
    } catch (error) {
        //console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});