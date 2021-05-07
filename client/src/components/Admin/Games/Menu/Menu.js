import React, { useState, useEffect } from "react";
import { Route, useRouteMatch, useParams } from "react-router-dom";
import ProtectedRoute from "../../../ProtectedRoute";
import axios from "axios";
import styled from "styled-components";

import Back from "../../Buttons/Back";
import SelectGameType from "../SelectGameType";
import Table from "../Table";

const Menu = (props) => {
  const { gamesNames } = props;
  const { path, url } = useRouteMatch();

  return (
    <Container>
      <Back url={"/admin"}>Voltar</Back>
      <SelectGameWrapper>
        <SelectGameType availableGames={gamesNames} />
      </SelectGameWrapper>
      <Route
        path={`${url}/:game`}
        component={() => <Table availableGames={gamesNames} />}
      />
    </Container>
  );
};

export default Menu;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 60vh;
`;

const SelectGameWrapper = styled.div`
  width: 40%;
`;
