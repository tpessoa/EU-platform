import React, { useState } from "react";
import styled from "styled-components";
import Menu from "./Menu";
import { Route, useRouteMatch } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  const { path, url } = useRouteMatch();
  return (
    <Container>
      <Navbar />
      <Route path={`${url}/:tab`} component={() => <Menu />} />
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 70vh;
`;
