import React from "react"
import "./functionButtons.css"

const FunctionButtons: React.FC = () => {
  return (
    <div className="function-buttons">
      <div className="fn-btn-wrapper">
        <div className="fn-btn">
          <img src="undo.svg" alt="undo"></img>
        </div>
        Undo
      </div>
      
      <div className="fn-btn-wrapper">
        <div className="fn-btn">
          <img src="eraser.svg" alt="eraser" />
        </div>
        Erase
      </div>
      
      <div className="fn-btn-wrapper">
        <div className="fn-btn">
          <img src="lead-pencil.svg" alt="pencil" />
        </div>
        Pencil
      </div>
    </div>
  )
}

export default FunctionButtons