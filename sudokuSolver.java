import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class sudokuSolver extends sudokuUtils {
    private int[][] grid;
    private int solutionCount;

    public sudokuSolver(int[][] grid) {
        this.grid = grid;
        solutionCount = 0;

        if (!gridIsValid()) {
            System.out.println("Starting grid is invalid. Please fix it and try again");
        }
    }

    public void setSolutionGrid() {
        if (solveSudoku()) {
            // solved
        } else {
            System.out.println("No solution exists.");
        }
    }

    public void setSolutionCount(int[][] grid) {
        solveSudokuWithAllSolutions(grid);
    }

    // Checks that the given grid is valid
    private boolean gridIsValid() {
        int[][] reversedGrid = reverseMatrix(grid);

        for (int i = 0; i < 9; i++) {
            if (!isValidLine(grid[i]) || !isValidLine(reversedGrid[i]) || !isValidBox(i)) {
                return false;
            }
        }
        return true;
    }

    private int[][] reverseMatrix(int[][] matrix) {
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
    private boolean isValidLine(int[] line) {
        Set<Integer> numSeen = new HashSet<>();

        for (int i = 0; i < 9; i++) {
            if (line[i] > 9 || line[i] < 0) {
                return false;
            }

            if (numSeen.contains(line[i])) {
                return false;
            } else if (line[i] != 0) {
                numSeen.add(line[i]);
            }
        }
        return true;
    }

    // Checks that the given box contains no duplicates or invalid numbers
    private boolean isValidBox(int boxNum) {
        Set<Integer> numSeen = new HashSet<>();
        int rowIndexStart = 0;
        int colIndexStart = 0;

        // Set indexes to check that all 9 boxes are valid
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

                if (numSeen.contains(grid[i][k] )) {
                    return false;
                } else if (grid[i][k] != 0) {
                    numSeen.add(grid[i][k]);
                }
            }
        }

        return true;
    }


    // DFS with backtracking algorithm to solve Sudoku. Sets grid to the first solution found.
    private boolean solveSudoku() {
        int[] emptyCell = findEmptyCell(grid);
        List<Integer> digits = new ArrayList<>();

        // Found solution if no empty cells remaining
        if (emptyCell == null) {
            return true;
        }

        int row = emptyCell[0];
        int col = emptyCell[1];

        for (int i = 1; i <= 9; i++) {
            digits.add(i);
        }

        // Shuffle the digits randomly
        // Ensures that the generator does not produce the same board when inputting a blank grid
        Collections.shuffle(digits);

        // Try placing digits 1 to 9 in the empty cell
        for (int num : digits) {
            if (isValidPlacement(grid, row, col, num)) {
                grid[row][col] = num;

                if (solveSudoku()) {
                    return true;
                }

                // If placing the digit didn't lead to a solution, backtrack
                grid[row][col] = 0;
            }
        }

        return false;
    }

    // DFS with backtracking algorithm to solve Sudoku. Gets number of all solutions possible.
    private boolean solveSudokuWithAllSolutions(int[][] grid) {
        List<Integer> digits = new ArrayList<>();

        for (int i = 1; i <= 9; i++) {
            digits.add(i);
        }

        Collections.shuffle(digits);

        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (grid[row][col] == 0) {
                    for (int num : digits) {
                        if (isValidPlacement(grid, row, col, num)) {
                            grid[row][col] = num;

                            if (solveSudokuWithAllSolutions(grid)) {
                                solutionCount++;
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
    private boolean isValidPlacement(int[][] grid, int row, int col, int num) {
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

    // Find the first empty cell in the Sudoku grid, traversing by rows
    private static int[] findEmptyCell(int[][] grid) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (grid[row][col] == 0) {
                    return new int[]{row, col};
                }
            }
        }
        return null;
    }

    public int[][] getGrid() {
        return grid;
    }

    public int getSolutionCount() {
        return solutionCount;
    }
}
