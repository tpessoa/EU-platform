import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

import AddBtn from "../../Buttons/Add";
import Table from "../../Table";

import { useGames } from "../../../../hooks/useGames";
import { cols, generateRows } from "../../Table/table.utils";
import Error from "../../../UI/Error";
import Loading from "../../../UI/Loading";

const SelectGameType = () => {
  const { path, url } = useRouteMatch();
  const { game } = useParams();
  const games = useGames(game);

  if (games.isLoading) return <Loading />;
  if (games.isError) return <Error error={games.error} />;
  const rows = generateRows(games.data);
  return (
    <Container>
      <Table
        video={true}
        rows={rows}
        cols={cols}
        editURL={`${url}/edit`}
        deleteURL={"/api/games/game"}
        fetchQuery={["games", game]}
      />
      <AddBtn url={`${url}/edit`} objId={"createNew"}>
        Adicionar um novo jogo
      </AddBtn>
    </Container>
  );
};

export default SelectGameType;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
