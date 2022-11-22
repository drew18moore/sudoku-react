import React, { MouseEventHandler, useEffect, useState } from "react";
import {Navbar, Board, Keypad, FunctionButtons} from "./components"
import "./app.css"
import axios from "axios";

export type History = {
  prev: Number,
  row: Number,
  col: Number
}

export type SelectedTile = {
  row: number,
  col: number,
  isMutable: boolean
}

const App: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>([])
  const [solvedGrid, setSolvedGrid] = useState<number[][]>([])

  const [selectedTile, setSelectedTile] = useState<SelectedTile>({row: -1, col: -1, isMutable: false})
  const [history, setHistory] = useState<History[]>([])

    useEffect(() => {
      newGame()
    }, [])

  const newGame = () => {
    axios.get("https://sugoku.herokuapp.com/board?difficulty=easy")
      .then(res => {
        const params = new URLSearchParams();
        params.append("board", JSON.stringify(res.data.board));
        axios.post("https://sugoku.herokuapp.com/solve", params)
        .then(resSol => {
          setSolvedGrid(resSol.data.solution);
        })
        setGrid(res.data.board)
      }).then(() => setHistory([]))
      .then(() => setSelectedTile({row: -1, col: -1, isMutable: false}))
      .catch(err => console.log(err))
  };

  const handleTileClick = (row: number, col: number, val: number, isUserInput: boolean) => {
    setSelectedTile((prev) => {
      //const sameAsPrev = JSON.stringify(prev) === JSON.stringify([row, col])
      const sameAsPrev = prev.row === row && prev.col === col
      return sameAsPrev ? {row: -1, col: -1, isMutable: false} : {row: row, col: col, isMutable: isUserInput}
    })
  }

  const handleKeypadClick = async (val: number) => {
    const hasSelectedTile: boolean = selectedTile.row !== -1 && selectedTile.col !== -1
    if (hasSelectedTile && selectedTile.isMutable) {
      await setHistory((prevHistory) => [
        ...prevHistory,
        {prev: grid[selectedTile.row][selectedTile.col], row: selectedTile.row, col: selectedTile.col}
      ])
      await setGrid((prevGrid) => {
        const newGrid = [...prevGrid]
        newGrid[selectedTile.row][selectedTile.col] = val
        return newGrid
      })
      if (JSON.stringify(grid) === JSON.stringify(solvedGrid)) {
        alert("You Win")
      }
    }
  }

  const handleFnBtnClick = (fn: string) => {
    switch (fn) {
      case "undo": {
        alert("Undo is not implemented")
        break;
      }
      case "erase": {
        if (selectedTile.row !== -1 && selectedTile.col !== -1 && selectedTile.isMutable) {
          setGrid((prev) => {
            const newGrid = [...prev]
            newGrid[selectedTile.row][selectedTile.col] = 0
            return newGrid
          })
        }
        break;
      }
      case "pencil": {
        alert("Pencil tool is not implemented");
        break;
      }
      default: {
        console.log("Function specified does not exist");
      }
    }
  }

  useEffect(() => {
    console.log(selectedTile);
  }, [selectedTile])

  return (
    <div className="App">
      <Navbar handleClick={newGame} />
      <div className="container">
        <Board gridState={grid} solvedGrid={solvedGrid} handleClick={handleTileClick} selectedTile={selectedTile} history={history}/>
        <div className="buttons">
          <FunctionButtons handleClick={handleFnBtnClick}/>
          <Keypad handleClick={handleKeypadClick} />
        </div>
        
      </div>
      
    </div>
  );
};

export default App;
