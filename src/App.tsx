import React, { useState } from "react";
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
  const newGame = () => {
    console.log(grid);
  };

  return (
    <div className="App">
      <Navbar handleClick={newGame} />
      <div className="container">
        <Board gridValues={grid} />
        <div className="buttons">
          <FunctionButtons />
          <Keypad />
        </div>
        
      </div>
      
    </div>
  );
};

export default App;
