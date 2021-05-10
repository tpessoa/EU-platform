import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";

import Categories from "./Categories";
import Table from "./Table";

import AddBtn from "../../Buttons/Add";

const Select = () => {
  const { path, url } = useRouteMatch();
  const [currentPoll, setCurrentPoll] = useState(null);

  return (
    <Container>
      <Categories setPoll={setCurrentPoll} />
      {currentPoll && <Table poll={currentPoll} />}
      <AddBtn url={`${url}/edit`} objId={"createNew"}>
        Adicionar um novo trabalho
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
`;
