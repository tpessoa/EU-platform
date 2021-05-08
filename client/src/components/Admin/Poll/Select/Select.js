import React from "react";
import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Table from "../../Table";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import Edit from "../Edit";
import AddBtn from "../../Buttons/Add";

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
  const queryStringId = "getAllPollCategories";
  const { isLoading, isError, error, data } = useQuery(
    queryStringId,
    () => axios.get(`/api/polls/all-polls`),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  const rows = generateRows(data.data);

  return (
    <Container>
      <Table
        video={true}
        rows={rows}
        cols={cols}
        editURL={`${url}/edit`}
        deleteURL={"/api/polls/category"}
        fetchQuery={queryStringId}
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
