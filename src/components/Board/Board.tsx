import React, { MouseEventHandler } from "react";
import "./board.css"

interface BoardProps {
  gridState: number[][],
  handleClick: (row: number, col: number, val: number) => void,
  selectedTile: number[],
  history: number[][]
}

const Board: React.FC<BoardProps> = (props) => {
  const board = props.gridState.map((row, i) => {
    let horizontalBorder = i === 2 || i === 5 ? "bottom-border" : i === 3 || i === 6 ? "top-border" : ""
    return row.map((val, j) => {
      let verticalBorder = j === 2 || j === 5 ? "right-border" : j === 3 || j === 6 ? "left-border" : ""
      let selected = i === props.selectedTile[0] && j === props.selectedTile[1] ? "selected-tile" : ""
      let userInput = val === 0 || JSON.stringify(props.history).includes(JSON.stringify([i, j])) ? "user-input" : ""
      
      return <div onClick={userInput ? () => props.handleClick(i, j, val) : undefined} className={`tile ${verticalBorder} ${horizontalBorder} ${selected} ${userInput}`} id={`${i}-${j}`} key={`${i}-${j}`}>{val === 0 ? "" : val}</div>
    })
  });

  return <div className="grid">{board}</div>;
};

export default Board;
