import React from 'react';
import { Link } from 'react-router-dom';


const listGames = (props) => (
    <div>
        <h1>{props.gameType}</h1>
        {
            props.gameInfo.map(game => {
                return (
                    <Link
                        key={game.id}
                        to={{
                            pathname: props.pageURL + "/" + props.gameTypeRef,
                            search: "?ref=" + game.ref
                        }}>
                        <article >{game.title}</article>
                    </Link>
                )
            })
        }
    </div>
)

export default listGames;