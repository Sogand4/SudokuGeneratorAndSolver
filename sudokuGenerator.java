import java.util.Random;

public class sudokuGenerator extends sudokuUtils {
    public static void main(String[] args) {
        int[][] sudokuPuzzle = generateSudokuPuzzle();
        printSudoku(sudokuPuzzle);
    }

    private static int[][] generateSudokuPuzzle() {
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
        return solvedGrid.getGrid();
    }
}
