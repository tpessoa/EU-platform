import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import ActionTable from "../../Table";
import AddGame from "../../Buttons/Add";

const createData = (id, title, actions) => {
  return { id, title, actions };
};

const cols = [
  {
    name: "Título",
    align: "left",
  },
  {
    name: "Ações",
    align: "center",
  },
];
const actionsCURD = ["Editar", "Eliminar"];

const getGameTypeID = (gamesObjArr, gameName) => {
  return gamesObjArr.find((elem) => elem.game_ref_name === gameName);
};

const generateRows = (data) => {
  const tempRows = [];
  data.forEach((elem) => {
    const { _id, title } = elem;
    tempRows.push(createData(_id, title, actionsCURD));
  });
  return tempRows;
};

const Table = (props) => {
  const { availableGames } = props;
  const { game } = useParams();
  const gameObj = getGameTypeID(availableGames, game);
  const editURL = `/admin/edit/game/${gameObj.game_ref_name}`;
  const deleteURL = "/api/games";
  const queryStringId = `${game}PartialInfo`;

  const { isLoading, error, data } = useQuery(queryStringId, () =>
    axios(`/api/games/${gameObj.game_ref_id}`)
  );

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  const rows = generateRows(data.data);

  return (
    <>
      <ActionTable
        rows={rows}
        cols={cols}
        editURL={editURL}
        deleteURL={deleteURL}
        fetchQuery={queryStringId}
        video={false}
      />
      <AddGameWrapper>
        <AddGame url={editURL} objId={"createNew"}>
          Adicionar novo jogo
        </AddGame>
      </AddGameWrapper>
    </>
  );
};

export default Table;

const AddGameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
`;
