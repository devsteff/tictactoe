/*
* Square component as a seperate class flile.
*/
import React from 'react'
import "./Square.css";

export default class Square extends React.Component {
    render() {
        //console.log("render Square "+props.id+" -->"+props.highlight);
        return (
            <button className={this.props.highlight ? 'square red' : 'square'} onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}