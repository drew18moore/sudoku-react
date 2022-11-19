import React, { MouseEventHandler, useEffect, useState } from "react";
import {Navbar, Board, Keypad, FunctionButtons} from "./components"
import "./app.css"
import axios from "axios";

const App: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>([])

  const [selectedTile, setSelectedTile] = useState<number[]>([])
  const [history, setHistory] = useState<number[][]>([])

    useEffect(() => {
      newGame()
    }, [])

  const newGame = () => {
    axios.get("https://sugoku.herokuapp.com/board?difficulty=easy")
      .then(res => {
        setGrid(res.data.board)
      }).catch(err => console.log(err))
  };

  const handleTileClick = (row: number, col: number, val: number) => {
    setSelectedTile((prev) => {
      const sameAsPrev = JSON.stringify(prev) === JSON.stringify([row, col])
      return sameAsPrev ? [] : [row, col]
    })
  }

  const handleKeypadClick = (val: number) => {
    const hasSelectedTile: boolean = JSON.stringify(selectedTile) !== JSON.stringify([])
    if (hasSelectedTile) {
      setGrid((prev) => {
        const newGrid = [...prev]
        newGrid[selectedTile[0]][selectedTile[1]] = val
        return newGrid
      })
      setHistory((prev) => {
        let updatedHistory = [...prev]
        updatedHistory.push(selectedTile)
        return updatedHistory
      })
    }
  }

  const handleFnBtnClick = (fn: string) => {
    if (JSON.stringify(selectedTile) !== JSON.stringify([])) {
      switch (fn) {
        case "undo": {
          console.log("undo");
          break;
        }
        case "erase": {
          setGrid((prev) => {
            const newGrid = [...prev]
            newGrid[selectedTile[0]][selectedTile[1]] = 0
            return newGrid
          })
          break;
        }
        case "pencil": {
          console.log("pencil");
          break;
        }
        default: {
          console.log("Function specified does not exist");
        }
      }
    }
  }

  // useEffect(() => {
  //   console.log(selectedTile);
  //   console.log(history);
  // }, [selectedTile, history])

  return (
    <div className="App">
      <Navbar handleClick={newGame} />
      <div className="container">
        <Board gridState={grid} handleClick={handleTileClick} selectedTile={selectedTile} history={history}/>
        <div className="buttons">
          <FunctionButtons handleClick={handleFnBtnClick}/>
          <Keypad handleClick={handleKeypadClick} />
        </div>
        
      </div>
      
    </div>
  );
};

export default App;
