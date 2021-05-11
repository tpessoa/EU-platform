import React from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

import { useCategories } from "../../../../hooks/useVideos";

import Table from "../../Table";
import { cols, generateRows } from "../../Table/table.utils";

import AddCategory from "../../Buttons/Add";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

const SelectCategory = () => {
  const { path, url } = useRouteMatch();
  const categories = useCategories();

  if (categories.isLoading) return <Loading />;
  if (categories.isError) return <Error error={categories.error} />;

  const rows = generateRows(categories.data);

  return (
    <Container>
      <Table
        video={true}
        rows={rows}
        cols={cols}
        editURL={`${url}/edit`}
        deleteURL={"/api/videos/category"}
        fetchQuery={"video-categories"}
      />
      <AddCategory url={`${url}/edit`} objId={"createNew"}>
        Adicionar nova categoria
      </AddCategory>
    </Container>
  );
};

export default SelectCategory;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
