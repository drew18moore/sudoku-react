import React from "react";
import "./navbar.css";

type NavbarProps = {
  handleClick(): void;
}

const Navbar: React.FC<NavbarProps> = ({ handleClick }) => {
  return (
    <nav>
      <div className="nav-logo">Sudoku</div>
      <ul className="nav-links">
        <li onClick={handleClick}>New Game</li>
      </ul>
    </nav>
  );
};

export default Navbar;
