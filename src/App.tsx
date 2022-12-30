import React, { MouseEventHandler, useEffect, useState } from "react";
import { Navbar, Board, Keypad, FunctionButtons } from "./components";
import "./app.css";
import axios from "axios";

export type History = {
  prev: Number;
  row: Number;
  col: Number;
};

export type SelectedTile = {
  row: number;
  col: number;
  isMutable: boolean;
};

const App: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>([
    [4, 5, 0, 0, 0, 0, 1, 7, 0],
    [3, 0, 0, 6, 5, 8, 4, 0, 0],
    [0, 6, 9, 7, 1, 0, 0, 0, 0],
    [8, 0, 4, 0, 0, 2, 0, 1, 0],
    [0, 9, 0, 0, 8, 0, 0, 0, 0],
    [0, 2, 7, 0, 0, 1, 0, 5, 3],
    [0, 0, 2, 9, 0, 0, 0, 3, 0],
    [5, 4, 6, 0, 0, 3, 9, 0, 8],
    [9, 0, 3, 0, 2, 6, 0, 4, 7]
  ]);
  const [solvedGrid, setSolvedGrid] = useState<number[][]>([
    [4, 5, 8, 2, 3, 9, 1, 7, 6],
    [3, 7, 1, 6, 5, 8, 4, 9, 2],
    [2, 6, 9, 7, 1, 4, 3, 8, 5],
    [8, 3, 4, 5, 6, 2, 7, 1, 9],
    [1, 9, 5, 3, 8, 7, 2, 6, 4],
    [6, 2, 7, 4, 9, 1, 8, 5, 3],
    [7, 8, 2, 9, 4, 5, 6, 3, 1],
    [5, 4, 6, 1, 7, 3, 9, 2, 8],
    [9, 1, 3, 8, 2, 6, 5, 4, 7]
  ]);

  const [selectedTile, setSelectedTile] = useState<SelectedTile>({
    row: -1,
    col: -1,
    isMutable: false,
  });
  const [history, setHistory] = useState<History[]>([]);

  useEffect(() => {
    // newGame()
  }, []);

  const newGame = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/generate`, {
        headers: {
          "X-RapidAPI-Key": `${import.meta.env.VITE_API_KEY}`,
          "X-RapidAPI-Host": "sudoku-generator1.p.rapidapi.com",
        },
      })
      .then((res) => {
        axios
          .get(`${import.meta.env.VITE_BASE_URL}/solve`, {
            headers: {
              "X-RapidAPI-Key": `${import.meta.env.VITE_API_KEY}`,
              "X-RapidAPI-Host": "sudoku-generator1.p.rapidapi.com",
            },
            params: {
              puzzle: `${res.data.puzzle}`,
            },
          })
          .then((resSol) => {
            let solution = [...resSol.data.solution].map((val) =>
              parseInt(val)
            );
            let newSolution = [];
            while (solution.length) newSolution.push(solution.splice(0, 9));
            setSolvedGrid(newSolution);
            console.log(newSolution);
          });
        let puzzle = [...res.data.puzzle].map((val) =>
          val === "." ? 0 : parseInt(val)
        );
        let newPuzzle = [];
        while (puzzle.length) newPuzzle.push(puzzle.splice(0, 9));
        console.log(newPuzzle);
        setGrid(newPuzzle);
      });
  };

  const handleTileClick = (
    row: number,
    col: number,
    val: number,
    isUserInput: boolean
  ) => {
    setSelectedTile((prev) => {
      //const sameAsPrev = JSON.stringify(prev) === JSON.stringify([row, col])
      const sameAsPrev = prev.row === row && prev.col === col;
      return sameAsPrev
        ? { row: -1, col: -1, isMutable: false }
        : { row: row, col: col, isMutable: isUserInput };
    });
  };

  const handleKeypadClick = async (val: number) => {
    const hasSelectedTile: boolean =
      selectedTile.row !== -1 && selectedTile.col !== -1;
    if (hasSelectedTile && selectedTile.isMutable) {
      await setHistory((prevHistory) => [
        ...prevHistory,
        {
          prev: grid[selectedTile.row][selectedTile.col],
          row: selectedTile.row,
          col: selectedTile.col,
        },
      ]);
      await setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[selectedTile.row][selectedTile.col] = val;
        return newGrid;
      });
      if (JSON.stringify(grid) === JSON.stringify(solvedGrid)) {
        alert("You Win");
      }
    }
  };

  const handleFnBtnClick = (fn: string) => {
    switch (fn) {
      case "undo": {
        alert("Undo is not implemented");
        break;
      }
      case "erase": {
        if (
          selectedTile.row !== -1 &&
          selectedTile.col !== -1 &&
          selectedTile.isMutable
        ) {
          setGrid((prev) => {
            const newGrid = [...prev];
            newGrid[selectedTile.row][selectedTile.col] = 0;
            return newGrid;
          });
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
  };

  useEffect(() => {
    console.log(selectedTile);
  }, [selectedTile]);

  return (
    <div className="App">
      <Navbar handleClick={newGame} />
      <div className="aligner">
        <div className="container">
          <Board
            gridState={grid}
            solvedGrid={solvedGrid}
            handleClick={handleTileClick}
            selectedTile={selectedTile}
            history={history}
          />
          <div className="buttons">
            <FunctionButtons handleClick={handleFnBtnClick} />
            <Keypad handleClick={handleKeypadClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
