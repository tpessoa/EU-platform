import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory, Redirect } from "react-router-dom";
import { useQuery, useLazyQuery } from "react-query";
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
  const { isLoading, isError, error, data } = useQuery(
    `get${gameId}InfoById"`,
    () => axios(`/api/games/game/${gameId}`),
    {
      enabled: fetchDataFlag,
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
