import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Button from "@material-ui/core/Button";

const EditVideos = () => {
  return (
    <Container>
      <CustomButton
        variant="contained"
        component={Link}
        to={`/admin/videoCategories`}
      >
        Editar Categorias de vídeos
      </CustomButton>
      <CustomButton
        variant="contained"
        component={Link}
        to={`/admin/edit/videos`}
      >
        Editar vídeo
      </CustomButton>
    </Container>
  );
};

export default EditVideos;

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
