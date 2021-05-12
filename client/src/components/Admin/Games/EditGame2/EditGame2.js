import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BackBtn from "../../Buttons/Back";

import Error from "../../../UI/Error";
import Loading from "../../../UI/Loading";
import { useGame } from "../../../../hooks/useGames";

import { gameObj, puzzleObj } from "./games.data";
import EditForm from "./EditForm";

const EditGame = () => {
  const { type, id } = useParams();
  const fetchDataFlag = id.toString() !== "createNew";
  const game = useGame(id);

  if (game.isLoading) return <Loading />;
  if (game.isError) return <Error error={game.error} />;

  let newGameObj = null;
  if (!fetchDataFlag) {
    newGameObj = {
      ...gameObj,
      ...puzzleObj,
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
      />
    </>
  );
};

export default EditGame;
