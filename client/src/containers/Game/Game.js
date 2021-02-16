import React, { Component } from 'react';

class Game extends Component {

    state = {
        gameRef: ''
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
                this.setState({ gameRef: param[1] })
            }
        }
    }


    render() {
        let gameLink = "http://localhost:8080/games/color-game/game.html?ref="+this.state.gameRef;
        return (
            <div>
                {/* 
                <h1>{this.state.gameRef}</h1>
                <p>Game with ID: {this.props.match.params.gameId}</p> 
                */}
                <iframe title="game" scrolling='no' src={gameLink} width="400" height="444" frameBorder='1'></iframe>
            </div>
        );
    }
}

export default Game;