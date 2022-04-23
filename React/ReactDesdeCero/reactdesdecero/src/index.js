import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Componente de función (Componente simples que solo contienen método render y nmo tiene estado propio)
function Square(props){
  return (
    <button className={"square " + (props.isWinning ? " winnerStyle" : null)}
            onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  
  renderSquare(i) {
    return <Square 
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}      
      isWinning={this.props.lineWinner.includes(i)}
       />;
  }

  generateRow = (index, max) => {
    let rows = []
    for(index; index < max; index++){
      rows.push(
        this.renderSquare(index)
      )
    }
    return rows;
  }

  generateBoard = (columns, rows) =>  {
    let board = []
    for (let i = 0; i < columns * rows; i++){
      if (i % columns === 0){
        board.push(
          <div className="board-row" key={i+'_'+columns}>
            {this.generateRow(i, i + columns)}
          </div>
        )
      }
    }
    return board;
  }

  render() {
    
    return (
      <div>
        {this.generateBoard(3,3)}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history : [{
        squares: Array(9).fill(null),
        newPostion: { col: 0,row:0 } ,
      }], 
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1]
    const squares = current.squares.slice();
    const calcWinner = calculateWinner(squares)
    if(calcWinner.winner || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares,
        newPostion: calculatePositionXY(i),
        active: false,
      }]),
      reverseHistory: false,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }
  orderHistory(){
    this.setState({
      reverseHistory : !this.state.reverseHistory
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winneCalc = calculateWinner(current.squares);
    const winner = winneCalc !== null ? winneCalc.winner : null;

    const moves = history.map((step, move) => {
      const desc = move ? 
      'Go to move #' + move :
      'Go to game start';
      
      let inputStyle;
      move === this.state.stepNumber ? inputStyle = 'active' : inputStyle = 'normal';
      
      return (
        <li key={move}>
          <button 
            className={inputStyle}            
            onClick={() => this.jumpTo(move)}>{desc}
            </button>
          <span className={inputStyle} >
           {move ? ' Columna:' + step.newPostion.col + ' Fila:' + step.newPostion.row : '' }
          </span>
        </li>
      )
    })

    moves.sort((a, b) => {
      if(this.state.reverseHistory){        
        return a.key + b.key;
      }else{
        return a.key - b.key;
      }
    });
    

    let status;
    if(winner){
      status = 'Winner: ' + winner;
    }else{
      if (!current.squares.includes(null)){
        status = (
          <div>
            <h2>Draw!</h2>
          </div>
        )
      }else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}    
            lineWinner={winneCalc.lineWinner}  
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button
            onClick={(i) => this.orderHistory()}      
          >
            Ordenar
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


//FUNCIÓN DE APOYO
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
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      let winnerSquares = {
        winner: squares[a],
        lineWinner : lines[i]
      }
      return winnerSquares;
    }
  }
  let nullWinner = {
    winner: null,
    lineWinner : []
  };
  return nullWinner;
}

//FUNCIÓN DE APOYO
function calculatePositionXY(elem) {
  const objPosition = {
    0: { col: 1, row:1 },
    1: { col: 2, row:1 },
    2: { col: 3, row:1 },
    3: { col: 1, row:2 },
    4: { col: 2, row:2 },
    5: { col: 3, row:2 },
    6: { col: 1, row:3 },
    7: { col: 2, row:3 },
    8: { col: 3, row:3 }
  }
  
  return objPosition[elem];
}