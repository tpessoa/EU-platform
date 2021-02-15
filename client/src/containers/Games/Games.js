import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Game from '../Game/Game'; 

class Games extends Component {

    state = {
        games: [
            { id: 1, title: 'Bandeira de França' },
            { id: 2, title: 'Bandeira de Portugal' },
            { id: 3, title: 'Bandeira da Alemanha' }
        ]
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
                                        search: "?title=" + game.title
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