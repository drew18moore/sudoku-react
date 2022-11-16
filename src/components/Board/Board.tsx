import React, { MouseEventHandler } from "react";
import "./board.css"

interface BoardProps {
  gridState: number[][];
  handleClick: (row: number, col: number, val: number) => void
}

const Board: React.FC<BoardProps> = (props) => {
  const board = props.gridState.map((row, i) => {
    let horizontalBorder = i === 2 || i === 5 ? "bottom-border" : i === 3 || i === 6 ? "top-border" : ""
    return row.map((val, j) => {
      let verticalBorder = j === 2 || j === 5 ? "right-border" : j === 3 || j === 6 ? "left-border" : ""
      return <div onClick={() => props.handleClick(i, j, val)} className={`tile ${verticalBorder} ${horizontalBorder}`} key={`${i}-${j}`}>{val === 0 ? "" : val}</div>
    })
  });

  return <div className="grid">{board}</div>;
};

export default Board;
