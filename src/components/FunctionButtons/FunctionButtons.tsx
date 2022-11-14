import React from "react"
import "./functionButtons.css"

const FunctionButtons: React.FC = () => {
  return (
    <div className="function-buttons">
      <div className="fn-btn undo">
        <img src="undo.svg" alt="undo"></img>
      </div>
      <div className="fn-btn erase">
        <img src="eraser.svg" alt="eraser" />
      </div>
      <div className="fn-btn notes">
        <img src="lead-pencil.svg" alt="pencil" />
      </div>
    </div>
  )
}

export default FunctionButtons