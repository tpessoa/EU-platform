import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";

import SelectCategory from "./Categories";
import TableVideos from "./TableVideos";
import AddBtn from "../../Buttons/Add";

const SelectVideo = () => {
  const { path, url } = useRouteMatch();
  const [currentCategory, setCurrentCategory] = useState(null);

  return (
    <Container>
      <SelectCategory setCategory={setCurrentCategory} />
      {currentCategory && <TableVideos catId={currentCategory} />}
      <AddBtn url={`${url}/edit`} objId={"createNew"}>
        Adicionar novo vídeo
      </AddBtn>
    </Container>
  );
};

export default SelectVideo;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
