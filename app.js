const express = require('express');
const bodyParser = require('body-parser');
const sudokuSolver = require('./Solver/sudokuSolver.js');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hello, this is the Sudoku Solver and Generator app!');
});

app.get('/solveSudoku', (req, res) => {
    res.sendFile(__dirname + '/Solver/sudokuSolver.html');
});

app.post('/solveSudoku', (req, res) => {
    const grid = req.body.grid;

    try {
        const solver = new sudokuSolver(grid);
        solver.setSolutionGrid();

        const solution = solver.getGrid();
        res.json({ solution });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});