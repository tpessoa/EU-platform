import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";

import { CgGames, CgPoll } from "react-icons/cg";
import { RiVideoFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FaPoll } from "react-icons/fa";

const Menu = () => {
  return (
    <div>
      <Container>
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
        <ButtonCustom
          variant="contained"
          color="default"
          endIcon={<FaPoll />}
          size="large"
          component={Link}
          to={"/admin/poll/menu"}
        >
          Gerir Votações
        </ButtonCustom>
        <ButtonCustom
          variant="contained"
          color="default"
          endIcon={<FiLogOut />}
          size="large"
        >
          Logout
        </ButtonCustom>
      </Container>
    </div>
  );
};

export default Menu;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
