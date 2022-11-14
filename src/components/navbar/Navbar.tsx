import React from "react";
import "./navbar.css";

interface NavbarProps {
  handleClick(): void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <nav>
      <div className="nav-logo">Sudoku</div>
      <ul className="nav-links">
        <li onClick={props.handleClick}>New Game</li>
      </ul>
    </nav>
  );
};

export default Navbar;
