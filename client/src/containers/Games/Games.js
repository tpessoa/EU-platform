import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

import Game from '../Game/Game';
import ListGames from '../../components/ListGames/ListGames';

class Games extends Component {

    state = {
        color_games: null,
        puzzles: [
            { id: 1, title: 'Puzzle de Teste', ref: 'testPuzzle' }
        ]
    }

    async componentDidMount() {
        let color_games = [];
        let puzzles = [];
        let game = {};
        let obj;
        await axios.get('http://localhost:8080/games/allColorGames')
            .then(res => {
                for (let i in res.data) {
                    obj = res.data[i];
                    // console.log(obj);
                    game.id = i;
                    game.title = obj.title;
                    game.ref = obj.image_ref;

                    color_games.push(game);
                    game = {};
                }
            });
        await axios.get('http://localhost:8080/games/allPuzzles')
            .then(res => {
                for (let i in res.data) {
                    obj = res.data[i];
                    // console.log(obj);
                    game.id = i;
                    game.title = obj.title;
                    game.ref = obj.image_ref;

                    puzzles.push(game);
                    game = {};
                }
            });
        this.setState({
            color_games: color_games,
            puzzles: puzzles
        })
    }

    render() {

        let list;
        if (this.state.color_games) {
            list = (
                <div>
                    <ListGames
                        gameType={"Jogos de Colorir"}
                        gameTypeRef={"color-game"}
                        gameInfo={this.state.color_games}
                        pageURL={this.props.match.url}
                    />
                    <ListGames
                        gameType={"Puzzles"}
                        gameTypeRef={"puzzle"}
                        gameInfo={this.state.puzzles}
                        pageURL={this.props.match.url}
                    />
                </div>
            )

        }
        return (
            <div>
                <section className="Courses">
                    {list}
                </section>
                <Route path={this.props.match.url + "/:gameId"} component={Game} />
            </div>

        );
    }
}

export default Games;