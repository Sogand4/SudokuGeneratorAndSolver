public class sudokuSolver {
    public static void main(String[] args) {
        int[][] sudokuGrid = {
            {5, 3, 0, 0, 7, 0, 0, 0, 0},
            {6, 0, 0, 1, 9, 5, 0, 0, 0},
            {0, 9, 8, 0, 0, 0, 0, 6, 0},
            {8, 0, 0, 0, 6, 0, 0, 0, 3},
            {4, 0, 0, 8, 0, 3, 0, 0, 1},
            {7, 0, 0, 0, 2, 0, 0, 0, 6},
            {0, 6, 0, 0, 0, 0, 2, 8, 0},
            {0, 0, 0, 4, 1, 9, 0, 0, 5},
            {0, 0, 0, 0, 8, 0, 0, 7, 9}
        };

        if (solveSudoku(sudokuGrid)) {
            System.out.println("Sudoku solved successfully:");
            printSudoku(sudokuGrid);
        } else {
            System.out.println("No solution exists.");
        }
    }

    // Backtracking algorithm to solve Sudoku
    private static boolean solveSudoku(int[][] grid) {
        // Find an empty cell
        int[] emptyCell = findEmptyCell(grid);
        if (emptyCell == null) {
            // No empty cell found, Sudoku is solved
            return true;
        }

        int row = emptyCell[0];
        int col = emptyCell[1];

        // Try placing digits 1 to 9 in the empty cell
        for (int num = 1; num <= 9; num++) {
            if (isValidPlacement(grid, row, col, num)) {
                // Place the digit if it's a valid move
                grid[row][col] = num;

                // Recursively try to solve the rest of the Sudoku
                if (solveSudoku(grid)) {
                    return true; // Sudoku is solved
                }

                // If placing the digit didn't lead to a solution, backtrack
                grid[row][col] = 0;
            }
        }

        // No valid digit found for the current cell, backtrack
        return false;
    }

    // Check if a number can be placed in a given cell
    private static boolean isValidPlacement(int[][] grid, int row, int col, int num) {
        // Check if 'num' is not present in the current row and column
        for (int i = 0; i < 9; i++) {
            if (grid[row][i] == num || grid[i][col] == num) {
                return false;
            }
        }

        // Check if 'num' is not present in the 3x3 grid
        int startRow = 3 * (row / 3);
        int startCol = 3 * (col / 3);
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (grid[startRow + i][startCol + j] == num) {
                    return false;
                }
            }
        }

        return true;
    }

    // Find the first empty cell in the Sudoku grid
    private static int[] findEmptyCell(int[][] grid) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (grid[row][col] == 0) {
                    return new int[]{row, col};
                }
            }
        }
        return null; // No empty cell found
    }

    // Print the Sudoku grid
    private static void printSudoku(int[][] grid) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                System.out.print(grid[row][col] + " ");
            }
            System.out.println();
        }
    }
}
