import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Route, useRouteMatch, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import ListField from "../../../Input/ListField/ListFielNew";
import VideosTable from "../VideosTable";
import Back from "../../Buttons/Back";
import AddVideo from "../../Buttons/Add";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

const SelectVideo = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const catId = query.get("id");

  const { path, url } = useRouteMatch();

  const { isLoading, isError, error, data } = useQuery(
    `getAllVideoCategories`,
    () => axios(`/api/videos/categories/type/video`)
  );
  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  const catIndex = data.data.findIndex((elem) => elem._id === catId);

  const categoryChangeHandler = (userSelectedPos, ref) => {};

  return (
    <Container>
      <Back url={"/admin/videos/menu"}>Voltar</Back>
      <CategoriesWrapper>
        <ListField
          label={"Categoria"}
          field_ref={"category"}
          arr={data.data}
          objElem={"title"}
          value={catIndex}
          parentChangeHandler={categoryChangeHandler}
          redirectURL={`${url}/category`}
        />
      </CategoriesWrapper>
      <AddVideo url={"/admin/edit/video"} objId={"createNew"}>
        Adicionar novo vídeo
      </AddVideo>
      <Route path={`${path}/:category`} component={() => <VideosTable />} />
    </Container>
  );
};

export default SelectVideo;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CategoriesWrapper = styled.div`
  width: 40%;
`;
