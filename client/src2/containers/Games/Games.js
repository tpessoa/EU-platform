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
        ],
        quizzes: null,
        wordSearchs: null,
    }

    async componentDidMount() {
        let color_games = [];
        let puzzles = [];
        let quizzes = [];
        let wordSearchs = [];

        let game = {};
        let obj;
        await axios.get('/api/games/allColorGames')
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
        await axios.get('api/games/allPuzzles')
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
        await axios.get('api/games/allQuizzes')
            .then(res => {
                for (let i in res.data) {
                    obj = res.data[i];
                    // console.log(obj);
                    game.id = i;
                    game.title = obj.title;
                    game.ref = obj.ref;

                    quizzes.push(game);
                    game = {};
                }
            });

        await axios.get('api/games/allWordSearchs')
            .then(res => {
                for (let i in res.data) {
                    obj = res.data[i];
                    // console.log(obj);
                    game.id = i;
                    game.title = obj.title;
                    game.ref = obj.ref;

                    wordSearchs.push(game);
                    game = {};
                }
            });
        this.setState({
            color_games: color_games,
            puzzles: puzzles,
            quizzes: quizzes,
            wordSearchs: wordSearchs
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
                    <ListGames
                        gameType={"Quizzes"}
                        gameTypeRef={"quiz"}
                        gameInfo={this.state.quizzes}
                        pageURL={this.props.match.url}
                    />
                     <ListGames
                        gameType={"Sopa de Letras"}
                        gameTypeRef={"wordSearch"}
                        gameInfo={this.state.wordSearchs}
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