import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useQuery } from "react-query";

import Table from "../../Table";
import AddCategory from "../../Buttons/Add";
import BackBtn from "../../Buttons/Back";
import Snackbar from "../../../Snackbar";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

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

const Categories = () => {
  const queryStringId = "getAllVideoCategories";
  const { isLoading, isError, error, data } = useQuery(
    queryStringId,
    () => axios.get(`/api/videos/categories/type/video`),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  const rows = generateRows(data.data);

  return (
    <Container>
      <BackBtn url={"/admin/videos/menu"}>Voltar</BackBtn>
      <Table
        video={true}
        rows={rows}
        cols={cols}
        editURL={"/admin/edit/category"}
        deleteURL={"/api/videos/category"}
        fetchQuery={queryStringId}
      />
      <AddCategory url={"/admin/edit/category"} objId={"createNew"}>
        Adicionar nova categoria
      </AddCategory>
    </Container>
  );
};

export default Categories;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
