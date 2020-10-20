import "../index.css";
import React from "react";

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
      style={props.isWinSquare ? { color: "red" } : { color: "black" }}
    >
      {props.value}
    </button>
  );
}

export default Square;
