import { Board } from "./Board";

export const TicTacToe = () => {
  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <Board board={[]} handleClick={() => ""} />
    </div>
  );
};
