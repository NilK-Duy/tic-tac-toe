import { useState } from "react";
import { Board } from "./Board";
import { checkWinner } from "../utils/checkWinner";
import { getAiMove } from "../utils/aiPlayer";

type BoardArray = (string | null)[][];

export const TicTacToe = () => {
  const initalBoard = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null));
  const [board, setBoard] = useState<BoardArray>(initalBoard);

  const [player, setPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [isNoWinner, setIsNoWinner] = useState<boolean>(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);

  const handleOnClick = (row: number, col: number) => {
    if (board[row][col] || winner || !isPlayerTurn) {
      return;
    }

    const updatedPlayerBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) => (rowIndex === row && cellIndex === col ? player : cell))
    );
    setBoard(updatedPlayerBoard);
    const newWinner = checkWinner(updatedPlayerBoard);
    setWinner(newWinner);
    setPlayer("X");

    // No winner
    const hasNullValue = updatedPlayerBoard.some((row) => row.some((cell) => cell === null));
    if (!winner && !hasNullValue) {
      setIsNoWinner(true);
      return;
    }

    // Ai move
    setIsPlayerTurn(false);
    if (!newWinner) {
      const nextPlayer = player === "X" ? "O" : "X";
      const aiMove = getAiMove(updatedPlayerBoard, nextPlayer, checkWinner);

      setTimeout(() => {
        const aiBoard = updatedPlayerBoard.map((row, rowIndex) =>
          row.map((col, colIndex) => (rowIndex === aiMove?.[0] && colIndex === aiMove[1] ? nextPlayer : col))
        );
        setBoard(aiBoard);
        setWinner(checkWinner(aiBoard));
        setIsPlayerTurn(true);
      }, 600);
    }
  };

  const restartGame = () => {
    setBoard(initalBoard);
    setPlayer("X");
    setWinner(null);
    setIsNoWinner(false);
    setIsPlayerTurn(true);
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <Board board={board} handleClick={handleOnClick} />
      {winner && <p>{winner === "X" ? "You win" : "You lose"}</p>}
      {isNoWinner && <p>Draw</p>}
      <button className="reset" type="button" onClick={() => restartGame()}>
        Restart game
      </button>
    </div>
  );
};
