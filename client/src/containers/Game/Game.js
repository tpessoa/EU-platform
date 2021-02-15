import React, { Component } from 'react';

class Game extends Component {

    state = {
        gameTitle: ''
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
            if (this.state.gameTitle !== param[1]) {
                this.setState({ gameTitle: param[1] })
            }
        }
    }


    render() {
        let gameLink = "http://localhost:8080/games/color-game/game.html?somedata="+this.state.gameTitle;
        return (
            <div>
                <h1>{this.state.gameTitle}</h1>
                {/* <p>Game with ID: {this.props.match.params.gameId}</p> */}
                <iframe scrolling='no' src={gameLink} width="400" height="444" frameBorder='1'></iframe>
            </div>
        );
    }
}

export default Game;