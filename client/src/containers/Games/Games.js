import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

import Game from '../Game/Game';

class Games extends Component {

    state = {
        games: [
            { id: 1, title: 'Bandeira de França', ref: 'flagFR' }
        ]
    }

    componentDidMount() {
        let games = [];
        let game = {};
        let obj;
        axios.get('http://localhost:8080/games/allColorGames')
            .then(res => {
                for (let i in res.data) {
                    obj = res.data[i];
                    // console.log(obj);
                    game.id = i;
                    game.title = obj.title;
                    game.ref = obj.image_ref;

                    games.push(game);
                    game = {};
                }
                this.setState({ games: games })
            })
    }

    render() {
        return (
            <div>
                <h1>Jogos de Colorir</h1>
                <section className="Courses">
                    {
                        this.state.games.map(game => {
                            return (
                                <Link
                                    key={game.id}
                                    to={{
                                        pathname: this.props.match.url + "/" + game.id,
                                        search: "?ref=" + game.ref
                                    }}>
                                    <article >{game.title}</article>
                                </Link>
                            )
                        })
                    }
                </section>
                <Route path={this.props.match.url + "/:gameId"} component={Game} />
            </div>

        );
    }
}

export default Games;