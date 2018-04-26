import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'

class Board extends React.Component {
  renderSquare(i) {
    const highlight = this.props.winResult == null ? false : this.props.winResult.buttons.includes(i)
    return <Square key={'_sq' + i}
      highlight={highlight}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)} />
  }

  renderRow(start) {
    const rownr = (start + 3) / 3
    //console.log("render Row "+rownr);
    var rowSquares = []
    for (var i = start; i < start + 3; i++) {
      rowSquares.push(this.renderSquare(i))
    }
    return (
      <div key={'_row' + rownr} className="board-row">{rowSquares}</div>
    )
  }

  renderBoard() {
    //console.log("render Board");
    var rows = []
    for (var i = 0; i < 9; i += 3) {
      rows.push(this.renderRow(i))
    }
    return (
      <div>{rows}</div>
    )
  }

  render() {
    return (
      <div className="game-board">{this.renderBoard()}</div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        whatClicked: 0,
      }],
      stepNumber: 0,
      xIsNext: true,
      winResult: null,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    const winresult = calculateWinner(squares)
    if (winresult || squares[i]) {
      this.setState({
        winResult: winresult,
      })
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares,
        whatClicked: i + 1,
      }]),
      winResult: calculateWinner(squares),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(step) {
    const history = this.state.history
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      winResult: calculateWinner(history[step].squares)
    })
  }

  render() {
    //console.log("render Game");
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const moves = history.map((step, move) => {
      const desc = move ?
        'Zurück zu Zug #' + move + getCoordinates(this.state.history[move].whatClicked) :
        'Neustart'
      const descStyle = move ? (move === this.state.stepNumber ? 'history highlight' : 'history') : 'startbutton'
      return (
        <li key={'_li' + move}>
          <button className={descStyle} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status
    if (this.state.winResult) {
      status = 'Der Gewinner ist: ' + this.state.winResult.winner
    } else {
      if (current != null && current.squares.includes(null)) {
        status = 'Nächster Spieler: ' + (this.state.xIsNext ? 'X' : 'O')
      } else {
        status = 'Unentschieden'
      }
    }
    const board = <Board
      winResult={this.state.winResult}
      squares={current.squares}
      onClick={(i) => this.handleClick(i)}
    />
    return (
      <div className="game">
        {board}
        <div className="game-info">
          <div className="status">{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    )
  }
}

function Square(props) {
  //console.log("render Square "+props.id+" -->"+props.highlight);
  return (
    <button className={props.highlight ? 'square red' : 'square'} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function getCoordinates(field) {
  let x = field % 3
  let y = Math.floor((field - 1) / 3) % 3
  return ' (' + (y + 1) + ', ' + (x === 0 ? 3 : x) + ')'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const result = { winner: squares[a], buttons: lines[i] }
      return result
    }
  }
  return null
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)