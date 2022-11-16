import React, { MouseEventHandler, useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Board from "./components/Board/Board";
import Keypad from "./components/Keypad/Keypad";
import FunctionButtons from "./components/FunctionButtons/FunctionButtons";
import "./app.css"

const App: React.FC = () => {
  const [grid, setGrid] = useState(
    [[0, 9, 7, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]]
  )

  const [selectedTile, setSelectedTile] = useState<number[]>([])

  const newGame = () => {
    console.log(grid);
  };

  const handleTileClick = (row: number, col: number, val: number) => {
    console.log(`${val} at row: ${row}, col: ${col}`);
    setSelectedTile((prev) => {
      const sameAsPrev = JSON.stringify(prev) === JSON.stringify([row, col])
      return sameAsPrev ? [] : [row, col]
    })
  }

  const handleKeypadClick = (val: number) => {
    if (JSON.stringify(selectedTile) !== JSON.stringify([])) {
      console.log(`${val} at ${selectedTile}`);
      setGrid((prev) => {
        const newGrid = [...prev]
        newGrid[selectedTile[0]][selectedTile[1]] = val
        return newGrid
      })
    }
  }

  useEffect(() => {
    console.log(selectedTile);
  }, [selectedTile])

  return (
    <div className="App">
      <Navbar handleClick={newGame} />
      <div className="container">
        <Board gridState={grid} handleClick={handleTileClick} />
        <div className="buttons">
          <FunctionButtons />
          <Keypad handleClick={handleKeypadClick} />
        </div>
        
      </div>
      
    </div>
  );
};

export default App;
