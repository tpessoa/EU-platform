import React from "react";
import styled from "styled-components";

const ImgCard = styled.div`
  width: 200px;
  height: 200px;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Card = (props) => {
  const { imageObj } = props;
  return (
    <ImgCard>
      <Img src={imageObj.path + imageObj.server_path} alt={imageObj.id} />
    </ImgCard>
  );
};

export default Card;
