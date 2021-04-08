import React, { useState, useEffect } from "react";
import { Route, useRouteMatch, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import ListField from "../../../Input/ListField/ListFielNew";
import VideosTable from "../VideosTable";
import Back from "../../Buttons/Back";
import AddVideo from "../../Buttons/Add";

const SelectVideo = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const catId = query.get("id");

  const [loadCompleted, setLoadCompleted] = useState(false);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [selectedCategoryPos, setSelectedCategoryPos] = useState(0);

  const { path, url } = useRouteMatch();

  useEffect(() => {
    axios
      .get(`/api/videos/categories/type/video`)
      .then(function (res) {
        // console.log(res.data);
        const tempArr = [];
        res.data.forEach((elem) => {
          tempArr.push(elem);
        });
        setCategoriesArr(tempArr);
        setLoadCompleted(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [catId]);

  useEffect(() => {
    let index = -1;
    if (categoriesArr.length > 1) {
      index = categoriesArr.findIndex((elem) => elem._id === catId);
      setSelectedCategoryPos(index);
    }
  }, [loadCompleted]);

  const categoryChangeHandler = (userSelectedPos, ref) => {
    setSelectedCategoryPos(userSelectedPos);
  };

  return (
    <Container>
      <Back>Voltar</Back>
      <CategoriesWrapper>
        <ListField
          label={"Categoria"}
          field_ref={"category"}
          arr={categoriesArr}
          objElem={"title"}
          value={selectedCategoryPos}
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