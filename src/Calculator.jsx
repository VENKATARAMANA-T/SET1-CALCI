import { useState } from 'react'
import './Calculator.css'

function Calculator() {
  const [display, setDisplay] = useState('')
  const [isResult, setIsResult] = useState(false) // Track if we just showed a result
  const [mode, setMode] = useState('RAD') // Kept for UI consistency, though not used in logic yet

  // Helper to insert values into the expression string
  const insert = (val) => {
    if (isResult) {
      // If we just showed a result:
      // - If user types an operator, append it to the result.
      // - If user types a number/constant, start a fresh expression.
      const isOperator = ['+', '-', '*', '/', 'x', '%'].includes(val)
      
      if (isOperator) {
        setDisplay(display + val)
        setIsResult(false)
      } else {
        setDisplay(String(val))
        setIsResult(false)
      }
    } else {
      setDisplay(display + val)
    }
  }

  const handleNumber = (num) => {
    insert(String(num))
  }

  const handleOperator = (op) => {
    // Prevent starting with an operator (except minus)
    if (display === '' && op !== '-') return
    insert(op)
  }

  // Unified evaluation function used by Equals, Mod_Sum, and Even_ODD
  const evaluateExpression = () => {
    try {
      if (!display) return 0
      
      // Replace visual symbols with JS operators
      let expr = display
        .replaceAll('x', '*')
        .replaceAll('÷', '/')
        .replaceAll('π', 'Math.PI')
        .replaceAll('e', 'Math.E')
      
      // Use new Function for safer evaluation than eval()
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${expr}`)()
      return result
    } catch (err) {
      return 'Error'
    }
  }

  const handleEquals = () => {
    const result = evaluateExpression()
    if (result === 'Error') {
      setDisplay('Error')
      setIsResult(true)
    } else {
      // Format to avoid long decimals
      const final = String(Math.round(result * 100000000) / 100000000)
      setDisplay(final)
      setIsResult(true)
    }
  }

  const handleDelete = () => {
    if (isResult) {
      setDisplay('')
      setIsResult(false)
    } else {
      setDisplay(display.length > 0 ? display.slice(0, -1) : '')
    }
  }

  const handleClear = () => {
    setDisplay('')
    setIsResult(false)
  }

  const handleModSumSquare = () => {
    // 1. Calculate current expression first (e.g., if user typed "5+5", we need 10)
    const val = evaluateExpression()
    
    if (val === 'Error' || typeof val !== 'number') {
      setDisplay('Error')
      setIsResult(true)
      return
    }

    // 2. Logic: Sum of squares of digits
    const numStr = String(Math.abs(Math.floor(val))) // absolute integer
    let sum = 0
    for (let digit of numStr) {
      sum += Math.pow(parseInt(digit), 2)
    }
    
    setDisplay(String(sum))
    setIsResult(true)
  }

  const handleEvenOdd = () => {
    // 1. Calculate current expression first
    const val = evaluateExpression()
    
    if (val === 'Error' || typeof val !== 'number') {
      setDisplay('Error')
      setIsResult(true)
      return
    }

    // 2. Check Even/Odd
    const result = Math.floor(val) % 2 === 0 ? 'Even' : 'Odd'
    setDisplay(result)
    setIsResult(true)
  }

  // Scientific constants just append symbol to string
  const handlePi = () => insert('π')
  const handleE = () => insert('e')
  
  // Percent just appends symbol (handled in evaluate if needed, or simplistic /100 here)
  // For simple string calc, usually % acts as modulo in JS, or /100. 
  // Let's treat it as modulo operator '%' for this structure, or strictly append it.
  const handlePercent = () => insert('%')

  const handleParenthesis = (paren) => insert(paren)

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display-section">
          <div className="mode">{mode}</div>
          {/* Display shows full expression now */}
          <div className="display">{display || '0'}</div>
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
            <button className="operator-btn pi-btn" onClick={handlePi}>π</button>
            <button className="operator-btn e-btn" onClick={handleE}>
              e
            </button>
            <button className="operator-btn" onClick={() => handleOperator('/')}>
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
            <button className="operator-btn" onClick={() => handleOperator('x')}>
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
            <button className="ans-btn" onClick={() => insert('Ans')}>Ans</button>
            <button className="number-btn zero-btn" onClick={() => handleNumber(0)}>
              0
            </button>
            <button className="operator-btn" onClick={() => insert('.')}>
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