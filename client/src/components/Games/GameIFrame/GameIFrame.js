import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import styled from "styled-components";

import InteractiveMap from "../InteractiveMap";
import CrossWords from "../CrossWords";

import "./game.css";

import { Button } from "@material-ui/core";

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
    <GameContainer>
      <FullScreenWrapper>
        <Button variant="contained" color="secondary" onClick={handle.enter}>
          Ecrã Inteiro
        </Button>
      </FullScreenWrapper>
      <GameWrapper>
        <FullScreen handle={handle}>{displayGame}</FullScreen>
      </GameWrapper>
    </GameContainer>
  );
};

export default GameIFrame;

const GameWrapper = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FullScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 1rem;
`;

const Game = styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
`;

const GameContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  height: 60vh;
  width: 100%;
`;
