import "../index.css";
import React from "react";
import Square from "./Square";

function Board(props) {
  let board = [];
  function renderSquare(i) {
    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        isWinSquare={
          props.winLine ? (props.winLine.includes(i) ? true : false) : false
        }
      />
    );
  }
  for (let i = 0; i < props.size; i++) {
    let boardRow = [];
    for (let j = 0; j < props.size; j++) {
      boardRow.push(renderSquare(i * props.size + j));
    }
    board.push(
      <div key={i} className="board-row">
        {boardRow}
      </div>
    );
  }
  return <div>{board}</div>;
}
export default Board;
