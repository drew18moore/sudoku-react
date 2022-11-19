import React from "react"
import "./functionButtons.css"

interface FnBtnProps {
  handleClick: (fn: string) => void
}

const FunctionButtons: React.FC<FnBtnProps> = ({ handleClick }) => {
  return (
    <div className="function-buttons">
      <div className="fn-btn-wrapper">
        <div onClick={() => handleClick("undo")} className="fn-btn">
          <img src="undo.svg" alt="undo"></img>
        </div>
        Undo
      </div>
      
      <div className="fn-btn-wrapper">
        <div onClick={() => handleClick("erase")} className="fn-btn">
          <img src="eraser.svg" alt="eraser" />
        </div>
        Erase
      </div>
      
      <div className="fn-btn-wrapper">
        <div onClick={() => handleClick("pencil")} className="fn-btn">
          <img src="lead-pencil.svg" alt="pencil" />
        </div>
        Pencil
      </div>
    </div>
  )
}

export default FunctionButtons