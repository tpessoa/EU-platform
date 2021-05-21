import React from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";

import Table from "../../Table";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import AddBtn from "../../Buttons/Add";
import { usePolls } from "../../../../hooks/usePolls";

const createData = (id, title, thumbnail, actions) => {
  return { id, title, thumbnail, actions };
};

const cols = [
  {
    name: "Título",
    align: "left",
  },
  {
    name: "Thumbnail",
    align: "center",
  },
  {
    name: "Ações",
    align: "center",
  },
];

const actionsCURD = ["Editar", "Eliminar"];

const generateRows = (data) => {
  const tempRows = [];
  data.forEach((elem) => {
    const { _id, title, thumbnail } = elem;
    tempRows.push(createData(_id, title, thumbnail, actionsCURD));
  });
  return tempRows;
};

const Select = () => {
  const { path, url } = useRouteMatch();
  const polls = usePolls();

  if (polls.isLoading) return <Loading />;
  if (polls.isError) return <Error error={polls.error} />;

  const rows = generateRows(polls.data);

  return (
    <Container>
      <Table
        video={true}
        rows={rows}
        cols={cols}
        editURL={`${url}/edit`}
        deleteURL={"/api/polls/delete-poll"}
        fetchQuery={"polls"}
      />
      <AddBtn url={`${url}/edit`} objId={"createNew"}>
        Adicionar nova categoria
      </AddBtn>
    </Container>
  );
};

export default Select;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;
