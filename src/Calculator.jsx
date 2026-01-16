import { useState } from 'react'
import './Calculator.css'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [mode, setMode] = useState('RAD')

  const handleNumber = (num) => {
    if (input === '' && display === '0') {
      setInput(String(num))
      setDisplay(String(num))
    } else {
      setInput(input + num)
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleOperator = (op) => {
    if (input === '' && result === null) return
    if (input !== '') {
      setResult(parseFloat(input))
      setInput('')
    }
    setDisplay(display + op)
  }

  const handleEquals = () => {
    try {
      const expression = display
      const evalResult = eval(expression)
      setDisplay(String(evalResult))
      setInput(String(evalResult))
      setResult(evalResult)
    } catch {
      setDisplay('Error')
    }
  }

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
      setInput(input.slice(0, -1))
    } else {
      setDisplay('0')
      setInput('')
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setInput('')
    setResult(null)
  }

  const handleModSumSquare = () => {
    const num = input || display
    const numStr = String(Math.abs(parseInt(num)))
    let sum = 0
    for (let digit of numStr) {
      sum += Math.pow(parseInt(digit), 2)
    }
    setDisplay(String(sum))
    setInput(String(sum))
  }

  const handleEvenOdd = () => {
    const num = parseInt(input || display)
    if (isNaN(num)) {
      setDisplay('Invalid')
      return
    }
    const result = num % 2 === 0 ? 'Even' : 'Odd'
    setDisplay(result)
    setInput('')
  }

  const handlePi = () => {
    const piValue = Math.PI
    setDisplay(String(piValue))
    setInput(String(piValue))
  }

  const handleE = () => {
    const eValue = Math.E
    setDisplay(String(eValue))
    setInput(String(eValue))
  }

  const handlePercent = () => {
    const num = parseFloat(input || display)
    if (!isNaN(num)) {
      const percent = num / 100
      setDisplay(String(percent))
      setInput(String(percent))
    }
  }

  const handleParenthesis = (paren) => {
    setDisplay(display + paren)
    setInput(input + paren)
  }

  const handleDivision = () => {
    if (input !== '') {
      setDisplay(display + '/')
    }
  }

  const handleMultiplication = () => {
    if (input !== '') {
      setDisplay(display + '*')
    }
  }

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display-section">
          <div className="mode">{mode}</div>
          <div className="display">{display}</div>
        </div>

        <div className="buttons-section">
          <div className="function-buttons">
            <button className="function-btn mod-btn" onClick={handleModSumSquare}>
              Mod_Sum_square
            </button>
            <button className="function-btn even-btn" onClick={handleEvenOdd}>
              Even_ODD
            </button>
          </div>

          <div className="row">
            <button className="operator-btn" onClick={() => handleParenthesis('(')}>
              (
            </button>
            <button className="operator-btn" onClick={() => handleParenthesis(')')}>
              )
            </button>
            <button className="operator-btn del-btn" onClick={handleDelete}>
              DEL
            </button>
            <button className="operator-btn" onClick={handlePercent}>
              %
            </button>
            <button className="operator-btn ac-btn" onClick={handleClear}>
              AC
            </button>
          </div>

          <div className="row">
            <button className="operator-btn pi-btn">π</button>
            <button className="operator-btn e-btn" onClick={handleE}>
              e
            </button>
            <button className="operator-btn" onClick={handleDivision}>
              ÷
            </button>
          </div>

          <div className="row">
            <button className="number-btn" onClick={() => handleNumber(7)}>
              7
            </button>
            <button className="number-btn" onClick={() => handleNumber(8)}>
              8
            </button>
            <button className="number-btn" onClick={() => handleNumber(9)}>
              9
            </button>
            <button className="operator-btn" onClick={handleMultiplication}>
              x
            </button>
          </div>

          <div className="row">
            <button className="number-btn" onClick={() => handleNumber(4)}>
              4
            </button>
            <button className="number-btn" onClick={() => handleNumber(5)}>
              5
            </button>
            <button className="number-btn" onClick={() => handleNumber(6)}>
              6
            </button>
            <button className="operator-btn" onClick={() => handleOperator('-')}>
              -
            </button>
          </div>

          <div className="row">
            <button className="number-btn" onClick={() => handleNumber(1)}>
              1
            </button>
            <button className="number-btn" onClick={() => handleNumber(2)}>
              2
            </button>
            <button className="number-btn" onClick={() => handleNumber(3)}>
              3
            </button>
            <button className="operator-btn" onClick={() => handleOperator('+')}>
              +
            </button>
          </div>

          <div className="row">
            <button className="ans-btn">Ans</button>
            <button className="number-btn zero-btn" onClick={() => handleNumber(0)}>
              0
            </button>
            <button className="operator-btn" onClick={() => setInput(input + '.')}>
              .
            </button>
            <button className="equals-btn" onClick={handleEquals}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
