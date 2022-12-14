import React, { MouseEventHandler, useEffect, useState } from "react";
import { Navbar, Board, Keypad, FunctionButtons, Modal } from "./components";
import "./app.css";
import axios from "axios";

export type History = {
  prev: number;
  row: number;
  col: number;
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
    [9, 0, 3, 0, 2, 6, 0, 4, 7],
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
    [9, 1, 3, 8, 2, 6, 5, 4, 7],
  ]);

  const [selectedTile, setSelectedTile] = useState<SelectedTile>({
    row: -1,
    col: -1,
    isMutable: false,
  });
  const [history, setHistory] = useState<History[]>([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    newGame()
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
          });
        let puzzle = [...res.data.puzzle].map((val) =>
          val === "." ? 0 : parseInt(val)
        );
        let newPuzzle = [];
        while (puzzle.length) newPuzzle.push(puzzle.splice(0, 9));
        setGrid(newPuzzle);
      })
      .catch(() => {
        setShowModal(true);
      });
  };

  const handleTileClick = (
    row: number,
    col: number,
    val: number,
    isUserInput: boolean
  ) => {
    setSelectedTile((prev) => {
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
      // Undo btn
      case "undo": {
        const updatedHistory = [...history];
        const lastHistory = updatedHistory.pop();

        if (!lastHistory) break;

        let updatedGrid = grid.map((arr) => arr.slice());
        updatedGrid[lastHistory.row][lastHistory.col] = lastHistory.prev;

        setGrid(updatedGrid);
        setHistory(updatedHistory);
        break;
      }
      // Erase btn
      case "erase": {
        if (
          selectedTile.row == -1 ||
          selectedTile.col == -1 ||
          !selectedTile.isMutable
        )
          break;
        if (grid[selectedTile.row][selectedTile.col] == 0) break;

        eraseTile();

        async function eraseTile() {
          await setHistory((prevHistory) => [
            ...prevHistory,
            {
              prev: grid[selectedTile.row][selectedTile.col],
              row: selectedTile.row,
              col: selectedTile.col,
            },
          ]);
          await setGrid((prev) => {
            const newGrid = [...prev];
            newGrid[selectedTile.row][selectedTile.col] = 0;
            return newGrid;
          });
        }

        break;
      }
      // Pencil btn
      case "pencil": {
        alert("Pencil tool is not implemented");
        break;
      }
      default: {
        console.log("Function specified does not exist");
      }
    }
  };

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
      {showModal && (
        <Modal heading="Invalid API Key" setShowModal={setShowModal}>
          <p>
            To generate a new sudoku grid, you must have your own valid API key.
          </p>
          <ol>
            <li>
              Go to{" "}
              <a
                href="https://rapidapi.com/gregor-i/api/sudoku-generator1"
                target="_blank"
              >
                https://rapidapi.com/gregor-i/api/sudoku-generator1
              </a>{" "}
              to register an API key.
            </li>
            <li>Create a .env file in the root directory</li>
            <li>Inside of the .env file, place the following two lines: </li>
            <ol>
              <li>
                VITE_BASE_URL=https://sudoku-generator1.p.rapidapi.com/sudoku
              </li>
              <li>VITE_API_KEY=&lt;YOUR_API_KEY_GOES_HERE&gt;</li>
            </ol>
          </ol>
        </Modal>
      )}
    </div>
  );
};

export default App;
