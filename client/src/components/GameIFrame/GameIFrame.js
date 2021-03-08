import React, { useState, useEffect } from "react";

import {
  GameContainer,
  GameWrapper,
  Game,
  FullScreen,
} from "./GameIFrame.elements";

const GameIFrame = () => {
  const [gameLink, setGameLink] = useState(false);

  useEffect(() => {
    const search_arr = window.location.search.split("=");
    if (search_arr.length > 0) {
      const gameId = search_arr[1];
      const dir = "games";
      const gameType = window.location.pathname.split("/")[3];

      setGameLink(`/api/${dir}/${gameType}/game.html?id=${gameId}`);
    }
  }, [window.location.search]);

  /**
   * FULLSCREEN
   */

  const fullscreenHandler = () => {
    console.log("sdf");

    document
      .getElementById("game")
      .requestFullscreen()
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <GameContainer>
        <GameWrapper>
          <Game
            id="game"
            title="game"
            scrolling="no"
            src={gameLink}
            allowfullscreen="true"
          ></Game>
          <FullScreen onClick={fullscreenHandler}>Ecrã Inteiro</FullScreen>
        </GameWrapper>
      </GameContainer>
    </>
  );
};

export default GameIFrame;
