import "../index.css";
import Board from "./Board";
import React, { useState } from "react";
const BOARD_SIZE = 3;

function Game(props) {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      lastTurn: -1,
    },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [sortIsAscending, setSortIsAscending] = useState(true);
  const current = history[stepNumber];

  function handleClick(i) {
    const tmpHistory = history.slice(0, stepNumber + 1);
    const current = tmpHistory[tmpHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      tmpHistory.concat([
        {
          squares: squares,
          lastTurn: i,
        },
      ])
    );
    setStepNumber(tmpHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function toggleSort(sortOrder) {
    setSortIsAscending(!sortOrder);
  }
  let moves = history.map((step, move) => {
    const desc = move
      ? "Go to move #" +
        move +
        " " +
        "(" +
        Math.floor(history[move].lastTurn / 3 + 1) +
        "," +
        Math.round((history[move].lastTurn % 3) + 1) +
        ")"
      : "Go to gamestart";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          style={
            move === stepNumber
              ? { fontWeight: "bold" }
              : { fontWeight: "normal" }
          }
        >
          {desc}
        </button>
      </li>
    );
  });
  if (!sortIsAscending) {
    moves = moves.reverse();
  }
  const winner = calculateWinner(current.squares);
  let winLine;
  let status;
  if (winner) {
    status = "Winner: " + winner.winner;
    winLine = Object.values(winner.winResult);
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  if (winner === null && allVisited(current.squares)) {
    status = "Draw";
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board
          size={BOARD_SIZE}
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winLine={winLine}
        />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <button onClick={() => toggleSort(sortIsAscending)}>
          {sortIsAscending ? "Ascending moves" : "Descending moves"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winResult: [a, b, c],
      };
    }
  }
  return null;
}
function allVisited(square) {
  let result = true;
  for (let i = 0; i < square.length; i++) {
    if (square[i] === null) {
      return false;
    }
  }
  return result;
}

export default Game;
