import React, { Component } from 'react';

class Game extends Component {

    state = {
        gameRef: '',
        gameTypeRef: '',
        iframe: {
            w: 400,
            h: 600
        }
    }

    componentDidMount() {
        this.parseQueryParams();
    }

    componentDidUpdate() {
        this.parseQueryParams();
    }

    parseQueryParams() {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            if (this.state.gameRef !== param[1]) {
                let gameTypeRef = this.props.location.pathname;
                this.setState({
                    gameRef: param[1],
                    gameTypeRef: gameTypeRef
                })
            }
        }
    }


    render() {
        let gameLink = `/api/${this.state.gameTypeRef}/game.html?ref=${this.state.gameRef}`;
        let iframe; 
        if (this.state.gameTypeRef != '' && this.state.gameTypeRef == '/games/color-game') {
            iframe = (
                <iframe title="game" scrolling='no' src={gameLink} width="400" height="600" frameBorder='1'></iframe>
            )
        }
        else {
            iframe = (
                <iframe title="game" scrolling='no' src={gameLink} width="800" height="600" frameBorder='1'></iframe>
            )
        }
        return (
            <div>
                {/* 
                <h1>{this.state.gameRef}</h1>
                <p>Game with ID: {this.props.match.params.gameId}</p> 
                */}
                {iframe}
            </div>
        );
    }
}

export default Game;