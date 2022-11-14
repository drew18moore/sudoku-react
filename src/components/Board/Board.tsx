import React from "react";
import "./board.css"

interface BoardProps {
  gridValues: number[][];
}

const Board: React.FC<BoardProps> = (props) => {
  const board = props.gridValues.map((row, i) => {
    let horizontalBorder = i === 2 || i === 5 ? "bottom-border" : i === 3 || i === 6 ? "top-border" : ""
    return row.map((val, i) => {
      let verticalBorder = i === 2 || i === 5 ? "right-border" : i === 3 || i === 6 ? "left-border" : ""
      return <div className={`tile ${verticalBorder} ${horizontalBorder}`}>{val === 0 ? "" : val}</div>
    })
  });
  console.log(board);

  return <div className="grid">{board}</div>;
};

export default Board;
