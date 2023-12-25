import java.util.HashSet;
import java.util.Set;

public class sudokuSolver {
    public static void main(String[] args) {
        int[][] sudokuGrid = {
            {0, 0, 0, 7, 7, 0, 0, 0, 0},
            {6, 0, 0, 1, 9, 5, 0, 0, 0},
            {0, 9, 8, 0, 0, 0, 0, 6, 0},
            {8, 0, 0, 0, 6, 0, 0, 0, 3},
            {4, 0, 0, 8, 0, 3, 0, 0, 1},
            {7, 0, 0, 0, 2, 0, 0, 0, 6},
            {0, 6, 0, 0, 0, 0, 2, 8, 0},
            {0, 0, 0, 4, 1, 9, 0, 0, 5},
            {0, 0, 0, 0, 8, 0, 0, 7, 9}
        };

        if (gridIsNotValid(sudokuGrid)) {
            System.out.println("Starting grid is invalid. Please fix it and try again");
        } else {
            if (solveSudoku(sudokuGrid)) {
                System.out.println("Sudoku solved successfully:");
                printSudoku(sudokuGrid);
            } else {
                System.out.println("No solution exists.");
            }
        }
    }

    // Checks that the given grid is valid
    private static boolean gridIsNotValid(int[][] grid) {
        int[][] reversedGrid = reverseMatrix(grid);

        for (int i = 0; i < 9; i++) {
            if (!isValidLine(grid[i]) || !isValidLine(reversedGrid[i]) || !isValidBox(grid, i)) {
                return false;
            }
        }
        return true;
    }

    private static int[][] reverseMatrix(int[][] matrix) {
        int numRows = matrix.length;
        int numCols = matrix[0].length;

        int[][] reversedMatrix = new int[numCols][numRows];

        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                reversedMatrix[j][i] = matrix[i][j];
            }
        }

        return reversedMatrix;
    }

    // Checks that the line (either a row or column) contains no duplicates and no invalid numbers
    private static boolean isValidLine(int[] line) {
        Set<Integer> numSeen = new HashSet<>();

        for (int i = 0; i < 9; i++) {
            if (line[i] > 9 || line[i] < 0) {
                return false;
            }

            if (numSeen.contains(i)) {
                return false;
            } else if (line[i] != 0) {
                numSeen.add(line[i]);
            }
        }
        return true;
    }

    // Checks that the given box contains no duplicates or invalid numbers
    private static boolean isValidBox(int[][] grid, int boxNum) {
        Set<Integer> numSeen = new HashSet<>();
        int rowIndexStart = 0;
        int colIndexStart = 0;

        // set indexes to check that all 9 boxes are valid
        if (boxNum == 0 || boxNum == 3 || boxNum == 6) {
            colIndexStart = 0;
        } else if (boxNum == 1 || boxNum == 4 || boxNum == 7) {
            colIndexStart = 3;
        } else {
            colIndexStart = 6;
        }

        if (boxNum == 0 || boxNum == 1 || boxNum == 2) {
            rowIndexStart = 0;
        } else if (boxNum == 3 || boxNum == 4 || boxNum == 5) {
            rowIndexStart = 3;
        } else {
            rowIndexStart = 6;
        }

        for (int i = rowIndexStart; i < rowIndexStart + 3; i++) {
            for (int k = colIndexStart; k < colIndexStart + 3; k++) {
                if (grid[i][k] > 9 || grid[i][k] < 0) {
                    return false;
                }

                if (numSeen.contains(i)) {
                    return false;
                } else if (grid[i][k] != 0) {
                    numSeen.add(grid[i][k]);
                }
            }
        }

        return true;
    }

    // Backtracking algorithm to solve Sudoku. Sets grid to the first solution found
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
