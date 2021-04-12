import React from "react";
import { Link } from "react-router-dom";

import NavigationIcon from "@material-ui/icons/Navigation";
import Button from "@material-ui/core/Button";

import { CgGames } from "react-icons/cg";
import { RiVideoFill } from "react-icons/ri";

import styled from "styled-components";

const Dashboard = () => {
  return (
    <Container>
      <DashboardWrapper>
        <ButtonCustom
          variant="contained"
          color="default"
          endIcon={<CgGames />}
          size="large"
          component={Link}
          to={"/admin/games"}
        >
          Gerir Jogos
        </ButtonCustom>
        <ButtonCustom
          variant="contained"
          color="default"
          endIcon={<RiVideoFill />}
          size="large"
          component={Link}
          to={"/admin/videos/menu"}
        >
          Gerir Vídeos
        </ButtonCustom>
      </DashboardWrapper>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const DashboardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 3rem;
`;

const ButtonWrapper = styled.div`
  margin: 2rem;
`;

const ButtonCustom = styled(Button)`
  && {
    margin: 1rem;
    border-radius: 1rem;
  }
`;
