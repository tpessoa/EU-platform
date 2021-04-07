import React from "react";
import styled from "styled-components";
import { FaImage } from "react-icons/fa";

const Card = (props) => {
  const { imageObj, width, height } = props;
  if (!width) width = "200px";
  if (!height) height = "200px";
  // console.log(imageObj);
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
  return (
    <ImgCard w={width} h={height}>
      {display}
    </ImgCard>
  );
};

export default Card;

const ImgCard = styled.div`
  width: ${(props) => props.w};
  height: ${(props) => props.h};
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
