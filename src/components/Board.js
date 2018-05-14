/*
* Board component as a seperate class flile.
*/
import React from 'react'

function Square(props) {
	//console.log("render Square "+props.id+" -->"+props.highlight);
	return (
		<button className={props.highlight ? 'square red' : 'square'} onClick={props.onClick}>
			{props.value}
		</button>
	)
}

export class Board extends React.Component {
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
export default Board