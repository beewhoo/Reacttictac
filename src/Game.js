import React, { Component } from 'react';
import Board from './Board';
import './Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      step:0,
      xIsNext: true

    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.step +1);

    const current = history[history.length - 1];
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
   //   stepNumber: history.length,
      step: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpBack(choice){
    this.setState({
      step: choice,
      xIsNext: choice % 2 ? false:true
    })
  }



  render() {
    const history = this.state.history;
    const current = history[this.state.step];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Move #" + move : "Restart Game";
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpBack(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status =  'Player ' + winner + '  WINS!';
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
      <h1>Tic-Tac-Toe</h1>

      <div className="game">

        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
      </div>
    );
  }
}

// ========================================


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
