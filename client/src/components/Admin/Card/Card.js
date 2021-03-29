import React from "react";
import styled from "styled-components";
import { FaImage } from "react-icons/fa";

const ImgCard = styled.div`
  width: 200px;
  height: 200px;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const NoImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 4rem;
`;

const Card = (props) => {
  const { imageObj } = props;
  let display = "";
  if (imageObj.id === "defaultImage") {
    display = (
      <NoImage>
        <FaImage />
      </NoImage>
    );
  } else {
    display = (
      <Img src={imageObj.path + imageObj.server_path} alt={imageObj.id} />
    );
  }
  return <ImgCard>{display}</ImgCard>;
};

export default Card;
