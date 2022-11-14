import React from "react"
import "./keypad.css"

const Keypad: React.FC = () => {
  let keys = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
    return <div className="key">{num}</div>
  })
  return (
    <div className="keypad">
      {keys}
    </div>
  )
}

export default Keypad