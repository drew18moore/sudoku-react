import React, { MouseEventHandler } from "react";
import { History } from "../../App";
import "./board.css"

type BoardProps = {
  gridState: number[][],
  solvedGrid: number[][],
  handleClick: (row: number, col: number, val: number) => void,
  selectedTile: number[],
  history: History[]
}

const Board: React.FC<BoardProps> = ({ gridState, solvedGrid, handleClick, selectedTile, history }) => {
  const board = gridState.map((row, i) => {
    let horizontalBorder = i === 2 || i === 5 ? "bottom-border" : i === 3 || i === 6 ? "top-border" : ""
    return row.map((val, j) => {
      // Styling
      let verticalBorder = j === 2 || j === 5 ? "right-border" : j === 3 || j === 6 ? "left-border" : ""
      let selectedTileStyling = i === selectedTile[0] && j === selectedTile[1] ? "selected-tile" : ""
      let isUserInput = val === 0 || history.find(e => e.row === i && e.col === j)
      // If a user inputs an incorrect value, the tile will have a red font color. Otherwise the color is blue
      let userInputStyling = isUserInput ? val !== 0 ? solvedGrid[i][j] === val ? "correct" : "incorrect" : "" : "default-tiles"
      
      return <div 
        onClick={isUserInput ? () => handleClick(i, j, val) : undefined} 
        className={`tile ${verticalBorder} ${horizontalBorder} ${selectedTileStyling} ${userInputStyling}`} 
        id={`${i}-${j}`} 
        key={`${i}-${j}`}>
          {val === 0 ? "" : val}
      </div>
    })
  });

  return <div className="grid">{board}</div>;
};

export default Board;
