import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

import NavigationIcon from "@material-ui/icons/Navigation";
import Button from "@material-ui/core/Button";
import Loading from "../../UI/Loading";
import Error from "../../UI/Error";

import { CgGames } from "react-icons/cg";
import { RiVideoFill } from "react-icons/ri";

const Dashboard = () => {
  const { isLoading, isError, isSuccess, error, data } = useQuery(
    "getSecretToken",
    () =>
      axios({
        method: "get",
        url: "/api/user/secret",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;
  if (isSuccess) {
    console.log(data.data);
  }

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
