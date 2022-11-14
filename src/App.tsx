import React from "react";
import Navbar from "./components/navbar/Navbar";

const App: React.FC = () => {
  const newGame = () => {
    console.log("New Game");
  };

  return (
    <div className="App">
      <Navbar handleClick={newGame} />
    </div>
  );
};

export default App;
