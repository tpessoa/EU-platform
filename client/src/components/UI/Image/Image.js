import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { imgObj } = props;
  return (
    <Container>
      <Img src={imgObj.path + imgObj.server_path} alt={imgObj.id} />
    </Container>
  );
};

export default Image;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
