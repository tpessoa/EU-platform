import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import styled from "styled-components";

import InteractiveMap from "../InteractiveMap";
import CrossWords from "../CrossWords";

import "./game.css";

import { Button, Typography } from "@material-ui/core";
import { useGame } from "../../../hooks/useGames";
import Loading from "../../UI/Loading";
import Error from "../../UI/Error";

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

  // let displayDifficulty = "Difícil";
  // if (gameInfo.data.difficulty === 0) {
  //   displayDifficulty = "Fácil";
  // } else if (gameInfo.data.difficulty === 1) {
  //   displayDifficulty = "Média";
  // }

  return (
    <>
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
      {/* <InfoWrapper>
        <Typography variant="subtitle1" gutterBottom>
          Descrição: {gameInfo.data.description}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Dificuldade: {displayDifficulty}
        </Typography>
      </InfoWrapper> */}
    </>
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
  height: 80vh;
  width: 100%;
`;

const InfoWrapper = styled.div`
  display: inline-block;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-left: 1rem;
`;
