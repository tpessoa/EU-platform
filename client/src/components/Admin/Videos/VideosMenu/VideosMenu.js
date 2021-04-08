import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Button from "@material-ui/core/Button";

const VideosMenu = () => {
  return (
    <Container>
      <CustomButton
        variant="contained"
        component={Link}
        to={`/admin/videoCategories`}
      >
        Editar Categorias de vídeos
      </CustomButton>
      <CustomButton variant="contained" component={Link} to={`/admin/videos`}>
        Editar vídeo
      </CustomButton>
    </Container>
  );
};

export default VideosMenu;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CustomButton = styled(Button)`
  && {
    margin: 1rem;
  }
`;
