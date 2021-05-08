import React, { useState } from "react";
import styled from "styled-components";

import Navbar from "./Navbar";
import Menu from "./Menu";
import Perfil from "./Perfil";

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState(0);

  let displayTabContent = "";
  if (currentTab === 0) {
    displayTabContent = <Menu />;
  } else if (currentTab === 1) {
    displayTabContent = <Perfil />;
  }

  return (
    <Container>
      <Navbar setTab={setCurrentTab} />
      {displayTabContent}
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
