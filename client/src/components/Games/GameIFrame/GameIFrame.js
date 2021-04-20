import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import InteractiveMap from "../InteractiveMap";
import CrossWords from "../CrossWords";

import "./game.css";

import {
  GameContainer,
  GameWrapper,
  Game,
  FullScreenBtn,
} from "./GameIFrame.elements";

const GameIFrame = () => {
  const { game } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const gameId = query.get("id");
  const dir = "games";

  const [gameLink, setGameLink] = useState(null);
  const handle = useFullScreenHandle();

  useEffect(() => {
    setGameLink(`/api/${dir}/${game}/game.html?id=${gameId}`);
  }, [gameId || game]);

  // console.log(gameLink);

  if (game === "interactiveMaps") {
    return <InteractiveMap />;
  } else if (game === "crossWords") {
    return <CrossWords />;
  }

  let displayGame = "";
  if (gameLink) {
    displayGame = (
      <Game
        id="game"
        title="game"
        scrolling="no"
        src={gameLink}
        allowfullscreen="true"
      ></Game>
    );
  }

  return (
    <>
      <GameContainer>
        <GameWrapper>
          <FullScreen handle={handle}>{displayGame}</FullScreen>
        </GameWrapper>
        <FullScreenBtn onClick={handle.enter}>Ecrã Inteiro</FullScreenBtn>
      </GameContainer>
    </>
  );
};

export default GameIFrame;
