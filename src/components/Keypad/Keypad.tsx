import React from "react"
import "./keypad.css"

interface KeypadProps {
  handleClick: (val: number) => void
}

const Keypad: React.FC<KeypadProps> = (props) => {
  let keys = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
    return <div onClick={() => props.handleClick(num)} className="key" key={num}>{num}</div>
  })
  return (
    <div className="keypad">
      {keys}
    </div>
  )
}

export default Keypad