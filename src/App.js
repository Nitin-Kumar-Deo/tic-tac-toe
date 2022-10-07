import { useEffect, useState } from 'react'
import './App.css'
import Square from './components/Square'
import WinnerScreen from './components/WinnerScreen'
import { Patterns } from './Patterns'
import winnerSound from './audio/winner.wav'
import Click from './audio/click.wav'
import Restart from './audio/restart.wav'
function App() {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])

  const [player, setPlayer] = useState('🟡')

  const [result, setResult] = useState({ winner: 'none', state: 'none' })

  const [win, setWin] = useState(false)

  const clickSound = new Audio(Click)
  const gameWinnerSound = new Audio(winnerSound)
  const restartSound = new Audio(Restart)

  function playClick() {
    clickSound.play()
  }
  function playWinner() {
    gameWinnerSound.play()
  }
  function playRestart() {
    restartSound.play()
  }

  useEffect(() => {
    checkWin()
    checkTie()
    if (player == '🟡') setPlayer('❌')
    else setPlayer('🟡')
  }, [board])

  useEffect(() => {
    if (result.state != 'none') {
      setWin(true)
      playWinner()
    }
  }, [result])
  function handleClick(square) {
    playClick()
    setBoard(
      board.map((val, idx) => {
        if (square == idx && val == '') return player
        return val
      })
    )
  }

  function checkWin() {
    Patterns.forEach((currpattern) => {
      const fplayer = board[currpattern[0]]
      if (fplayer == '') return
      let foundWinner = true
      currpattern.forEach((index) => {
        if (board[index] != fplayer) foundWinner = false
      })
      if (foundWinner) {
        setResult({ winner: player, status: 'won' })
      }
    })
  }

  function checkTie() {
    let filled = true
    board.forEach((value) => {
      if (value == '') filled = false
    })
    if (filled) setResult({ winner: 'No One', state: 'Tie' })
  }

  function restartGame() {
    playRestart()
    setBoard(['', '', '', '', '', '', '', '', ''])
    setPlayer('🟡')
    setWin(false)
  }
  return (
    <div className="board">
      <h1 className="title">
        Let's Play <br /> Tic Tac T🟡e
      </h1>
      <div className="row">
        <Square
          chooseSquare={() => {
            handleClick(0)
          }}
          val={board[0]}
        />
        <Square
          chooseSquare={() => {
            handleClick(1)
          }}
          val={board[1]}
        />
        <Square
          chooseSquare={() => {
            handleClick(2)
          }}
          val={board[2]}
        />
      </div>
      <div className="row">
        <Square
          chooseSquare={() => {
            handleClick(3)
          }}
          val={board[3]}
        />
        <Square
          chooseSquare={() => {
            handleClick(4)
          }}
          val={board[4]}
        />
        <Square
          chooseSquare={() => {
            handleClick(5)
          }}
          val={board[5]}
        />
      </div>
      <div className="row">
        <Square
          chooseSquare={() => {
            handleClick(6)
          }}
          val={board[6]}
        />
        <Square
          chooseSquare={() => {
            handleClick(7)
          }}
          val={board[7]}
        />
        <Square
          chooseSquare={() => {
            handleClick(8)
          }}
          val={board[8]}
        />
      </div>
      {win && (
        <WinnerScreen restartGame={restartGame} playerWon={result.winner} />
      )}
    </div>
  )
}

export default App
