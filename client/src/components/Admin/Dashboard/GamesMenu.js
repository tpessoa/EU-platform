import React, { useState } from "react";
import styled from "styled-components";
import { Route, useRouteMatch, Link, Switch } from "react-router-dom";

import Button from "@material-ui/core/Button";

import SideMenu from "./SideMenu";
import SelectPoll from "../Poll/Select";
import SelectWork from "../Works/Select";
import SelectCategory from "../Videos/SelectCategory";
import SelectVideo from "../Videos/SelectVideo";
import SelectGame from "../Games/SelectGame";
import Menu from "./Menu";

const GameMenu = () => {
  const { path, url } = useRouteMatch();
  return (
    <Container>
      <MenuWrapper>
        <SideMenu />
      </MenuWrapper>
      <ContentWrapper>
        <Switch>
          <Route
            path={`${url}/poll/categories`}
            component={() => <SelectPoll />}
          />
          <Route path={`${url}/poll/works`} component={() => <SelectWork />} />
          <Route
            path={`${url}/videos/categories`}
            component={() => <SelectCategory />}
          />
          <Route path={`${url}/videos`} component={() => <SelectVideo />} />
          <Route path={`${url}/games/:game`} component={() => <SelectGame />} />
        </Switch>
      </ContentWrapper>
    </Container>
  );
};

export default GameMenu;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;
const MenuWrapper = styled.div`
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ButtonCustom = styled(Button)`
  && {
    margin: 1rem;
    border-radius: 1rem;
  }
`;
