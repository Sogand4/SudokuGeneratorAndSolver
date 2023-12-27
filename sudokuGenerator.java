import java.util.Random;

// Generates a sudoku puzzle that has a unique solution
public class sudokuGenerator extends sudokuUtils {
    private static final int NUMCELLSREMOVED = 50;
    public static void main(String[] args) {
        int[][] solvedGrid = generateSolvedGrid();
        //printSudoku(solvedGrid);
        int[][] sudokuPuzzle = generateSudokuPuzzle(solvedGrid);
        printSudoku(sudokuPuzzle);
    }

    private static int[][] generateSolvedGrid() {
        int[][] blankBoard = {
            {0, 0, 0, 0, 0, 0, 0, 0, 0},
            {0, 0, 0, 0, 0, 0, 0, 0, 0},
            {0, 0, 0, 0, 0, 0, 0, 0, 0},
            {0, 0, 0, 0, 0, 0, 0, 0, 0},
            {0, 0, 0, 0, 0, 0, 0, 0, 0},
            {0, 0, 0, 0, 0, 0, 0, 0, 0},
            {0, 0, 0, 0, 0, 0, 0, 0, 0},
            {0, 0, 0, 0, 0, 0, 0, 0, 0},
            {0, 0, 0, 0, 0, 0, 0, 0, 0}
        };

        sudokuSolver solvedGrid = new sudokuSolver(blankBoard);
        solvedGrid.setSolutionGrid();
        return solvedGrid.getGrid();
    }

    private static int[][] generateSudokuPuzzle(int[][] solvedGrid) {
        int numCellsRemoved = 0;
        Random random = new Random();
        int[][] puzzle = cloneGrid(solvedGrid);

        while (numCellsRemoved < NUMCELLSREMOVED) {
            int row = random.nextInt(9);
            int col = random.nextInt(9);

            // Skip if the cell is already empty
            if (puzzle[row][col] == 0) {
                continue;
            }

            int temp = puzzle[row][col];
            puzzle[row][col] = 0;
            numCellsRemoved++;
    
            if (!hasUniqueSolution(puzzle)) {
                // Restore the number if removing it resulted in multiple solutions
                puzzle[row][col] = temp;
                numCellsRemoved--;
            }
        }

        return puzzle;
    }

    private static boolean hasUniqueSolution(int [][] grid) {
        sudokuSolver solvedGrid = new sudokuSolver(grid);
        solvedGrid.setSolutionCount(grid);
        return (solvedGrid.getSolutionCount() == 1);
    }

    private static int[][] cloneGrid(int[][] source) {
        int[][] clone = new int[source.length][source[0].length];
        for (int i = 0; i < source.length; i++) {
            System.arraycopy(source[i], 0, clone[i], 0, source[i].length);
        }
        return clone;
    }
}
