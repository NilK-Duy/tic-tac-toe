
export const getAiMove = (
  board: (string | null)[][],
  player: string,
  checkWinner: (board: (string | null)[][]) => string | null
): [number, number] => {

  const aiMove: [number, number][] = []

  // Check winning move
  board.forEach((row, rowIndex) =>
    row.map((col, colIndex) => {
      if(!board[rowIndex][colIndex]) {
        const clonedBoard = board.map(r => [...r])
        clonedBoard[rowIndex][colIndex] = player
        if(checkWinner(clonedBoard) === player) {
          aiMove.unshift([rowIndex, colIndex])
        }
      }
    }
  ))

  // Opponent moves
  const opponent = player === "X" ? "O" : "X"

  board.some((row, rowIndex) =>
    row.some((col, colIndex) => {
      if(!board[rowIndex][colIndex]) {
        const clonedBoard = board.map(r => [...r])

        clonedBoard[rowIndex][colIndex] = opponent
        if(checkWinner(clonedBoard) === opponent) {
          aiMove.push([rowIndex, colIndex])
          return true
        }
      return false
      }
    }
  ))

  if(aiMove.length > 0) {
    return aiMove[0]
  }

  // Choose the center cell
  if(!board[1][1]) {
    return [1, 1]
  }

  // random move
  const emptyCells: Array<[number, number]> = [];
  board.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) => {
      if(!board[rowIndex][colIndex]) {
        emptyCells.push([rowIndex, colIndex])
      }
    }
  ))

  const randomCell = Math.floor(Math.random() * emptyCells.length)
  return emptyCells[randomCell]
};
