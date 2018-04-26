/*
* All in one TicTacToe application.
* ---------------------------------
*/
import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import Board from './modules/Board.js'
import Game from './modules/Game.js'

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)