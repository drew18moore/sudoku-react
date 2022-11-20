import React from "react"
import "./keypad.css"

type KeypadProps = {
  handleClick: (val: number) => void
}

const Keypad: React.FC<KeypadProps> = ({ handleClick }) => {
  let keys = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
    return <div onClick={() => handleClick(num)} className="key" key={num}>{num}</div>
  })
  return (
    <div className="keypad">
      {keys}
    </div>
  )
}

export default Keypad