import React, { useState } from "react";
import styled from "styled-components";
import { Route, useRouteMatch, Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import SideMenu from "./SideMenu";
import Select from "../Poll/Select";
import Edit from "../Poll/Edit";

const Menu = () => {
  const { path, url } = useRouteMatch();
  return (
    <Container>
      <MenuWrapper>
        <SideMenu />
      </MenuWrapper>
      <ContentWrapper>
        <Route path={`${url}/poll/categories`} component={() => <Select />} />
      </ContentWrapper>
    </Container>
  );
};

export default Menu;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const MenuWrapper = styled.div`
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const ButtonCustom = styled(Button)`
  && {
    margin: 1rem;
    border-radius: 1rem;
  }
`;
