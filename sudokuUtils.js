class sudokuUtils {
    static printSudoku(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                process.stdout.write(grid[row][col] + " ");
            }
            console.log();
        }
    }
}

module.exports = sudokuUtils;