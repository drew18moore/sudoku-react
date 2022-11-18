import React, { MouseEventHandler, useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Board from "./components/Board/Board";
import Keypad from "./components/Keypad/Keypad";
import FunctionButtons from "./components/FunctionButtons/FunctionButtons";
import "./app.css"
import axios from "axios";

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
  const [history, setHistory] = useState<number[][]>([])

    useEffect(() => {
      newGame()
    }, [])

  const newGame = () => {
    axios.get("https://sugoku.herokuapp.com/board?difficulty=easy")
      .then(res => {
        console.log(res.data.board)
        setGrid(res.data.board)
      }).catch(err => console.log(err))
  };

  const handleTileClick = (row: number, col: number, val: number) => {
    console.log(`${val} at row: ${row}, col: ${col}`);
    setSelectedTile((prev) => {
      const sameAsPrev = JSON.stringify(prev) === JSON.stringify([row, col])
      return sameAsPrev ? [] : [row, col]
    })
  }

  const handleKeypadClick = (val: number) => {
    const hasSelectedTile: boolean = JSON.stringify(selectedTile) !== JSON.stringify([])
    if (hasSelectedTile) {
      console.log(`${val} at ${selectedTile}`);
      setGrid((prev) => {
        const newGrid = [...prev]
        newGrid[selectedTile[0]][selectedTile[1]] = val
        return newGrid
      })
      setHistory((prev) => {
        let updatedHistory = [...prev]
        updatedHistory.push(selectedTile)
        console.log("Updated history", updatedHistory)
        console.log("HI");
        return updatedHistory
      })
    }
  }

  useEffect(() => {
    console.log(selectedTile);
    console.log(history);
  }, [selectedTile, history])

  return (
    <div className="App">
      <Navbar handleClick={newGame} />
      <div className="container">
        <Board gridState={grid} handleClick={handleTileClick} selectedTile={selectedTile} history={history}/>
        <div className="buttons">
          <FunctionButtons />
          <Keypad handleClick={handleKeypadClick} />
        </div>
        
      </div>
      
    </div>
  );
};

export default App;
