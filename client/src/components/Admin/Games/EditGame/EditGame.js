import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BackBtn from "../../Buttons/Back";

import Error from "../../../UI/Error";
import Loading from "../../../UI/Loading";
import { useGame } from "../../../../hooks/useGames";

import {
  gameObj,
  puzzleObj,
  colorGameObj,
  wordSearchObj,
  quizObj,
  memoryObj,
  interactiveMapsObj,
  crossWordsObj,
} from "./games.data";
import EditForm from "./EditForm";

const EditGame = () => {
  const { type, id } = useParams();
  const fetchDataFlag = id.toString() !== "createNew";
  const game = useGame(id, fetchDataFlag);

  console.log(game.data);

  if (game.isLoading) return <Loading />;
  if (game.isError) return <Error error={game.error} />;

  let emptyObj = {};
  if (type === "puzzle") {
    emptyObj = puzzleObj;
  } else if (type === "colorGame") {
    emptyObj = colorGameObj;
  } else if (type === "wordSearch") {
    emptyObj = wordSearchObj;
  } else if (type === "quiz") {
    emptyObj = quizObj;
  } else if (type === "memory") {
    emptyObj = memoryObj;
  } else if (type === "interactiveMaps") {
    emptyObj = interactiveMapsObj;
  } else if (type === "crossWords") {
    emptyObj = crossWordsObj;
  }

  let newGameObj = null;
  if (!fetchDataFlag) {
    newGameObj = {
      ...gameObj,
      ...emptyObj,
    };
  } else {
    newGameObj = { ...game.data };
  }

  return (
    <>
      <EditForm
        fields={newGameObj}
        createNew={!fetchDataFlag}
        fetchQuery={["game", id]}
        game={type}
      />
    </>
  );
};

export default EditGame;
