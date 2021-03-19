import React, { useState, useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import "./game.css";

import {
  GameContainer,
  GameWrapper,
  Game,
  FullScreenBtn,
} from "./GameIFrame.elements";

const GameIFrame = () => {
  const [gameLink, setGameLink] = useState(false);
  const handle = useFullScreenHandle();

  useEffect(() => {
    const search_arr = window.location.search.split("=");
    if (search_arr.length > 0) {
      const gameId = search_arr[1];
      const dir = "games";
      const gameType = window.location.pathname.split("/")[3];

      setGameLink(`/api/${dir}/${gameType}/game.html?id=${gameId}`);
    }
  }, [window.location.search]);

  return (
    <>
      <GameContainer>
        <GameWrapper>
          <FullScreen handle={handle} style={{ background: "red" }}>
            <Game
              id="game"
              title="game"
              scrolling="no"
              src={gameLink}
              allowfullscreen="true"
            ></Game>
          </FullScreen>
        </GameWrapper>
        <FullScreenBtn onClick={handle.enter}>Ecrã Inteiro</FullScreenBtn>
      </GameContainer>
    </>
  );
};

export default GameIFrame;
