import React from "react";
import Button from "@material-ui/core/Button";

import styled from "styled-components";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, max-content));
  grid-gap: 1rem;
  justify-content: center;

  width: 100%;
  min-height: 50vh;
  max-height: 50vh;
  overflow-y: auto;
  margin: 1rem 0;
  padding: 1rem;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
`;

const DeleteButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none !important;
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ImgCard = styled.div`
  position: relative;
  width: 200px;
  height: 200px;

  &:hover ${DeleteButton} {
    display: block !important;
  }

  &:hover ${Img} {
    opacity: 0.6;
  }
`;

const deleteHandler = () => {
  console.log("eliminar imagem e se caso o jogo");
};

const Grid = ({ arr }) => {
  return (
    <GridWrapper>
      {arr &&
        arr.map((imgPath, index) => (
          <ImgCard key={index}>
            <Img src={imgPath} alt={index} />
            <DeleteButton
              variant="contained"
              color="secondary"
              onClick={deleteHandler}
            >
              Eliminar
            </DeleteButton>
          </ImgCard>
        ))}
    </GridWrapper>
  );
};

{
}

export default Grid;
