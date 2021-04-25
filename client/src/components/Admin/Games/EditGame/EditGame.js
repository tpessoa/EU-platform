import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory, Redirect } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import styled from "styled-components";

import BackBtn from "../../Buttons/Back";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import EditForm from "./EditForm";

const EditGame = (props) => {
  const { gamesNames } = props;
  const { gameType, gameId } = useParams();

  const fetchDataFlag = gameId.toString() !== "createNew";
  const fetchQuery = `get${gameId}InfoById"`;
  const { isLoading, isError, error, data } = useQuery(
    fetchQuery,
    () => axios(`/api/games/game/${gameId}`),
    {
      enabled: fetchDataFlag,
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  let gameObj = {};
  if (fetchDataFlag) {
    const tempObj = { ...data.data };
    const {
      title,
      description,
      thumbnail,
      age,
      difficulty,
      config,
      assets,
      _id,
    } = tempObj;

    gameObj = {
      title: title,
      description: description,
      thumbnail: thumbnail,
      age: age,
      difficulty: difficulty,
      config: config,
      assets: assets,
      id: _id,
      // tempId isn't needed for updating the respectives images ID after saving bcz a ID already exists
      tempId: null,
    };
  } else {
    gameObj = {
      title: "",
      description: "",
      thumbnail: {
        id: "defaultImage",
        path: "",
        server_path: "",
      },
      age: { min: "", max: "" },
      difficulty: "",
      config: { null: null },
      assets: { null: null },
      id: null,
      // this temporary Id is needed for updating the image (in images schema) with the respective ID after saving the game.
      tempId: "temp_game_image",
    };
  }

  return (
    <Container>
      <BackBtn>Voltar</BackBtn>
      <EditForm
        gamesNames={gamesNames}
        fields={gameObj}
        game={gameType}
        createGame={!fetchDataFlag}
        fetchQuery={fetchQuery}
      />
    </Container>
  );
};

export default EditGame;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;
