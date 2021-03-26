import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

import styled from "styled-components";
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, max-content));
  grid-gap: 1rem;
  justify-content: flex-start;

  width: 100%;

  max-height: 50vh;
  overflow-y: auto;
  margin: 0.5rem 0;
  padding: 1rem;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
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
  width: 140px;
  height: 140px;

  &:hover ${Img} {
    opacity: 0.8;
  }
  border-radius: 5px;
  background-color: ${({ highlight }) =>
    highlight == "1" ? "yellow" : "transparent"};
`;
const UtilsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const SelectedBtn = styled(Button)``;

const ModalGrid = (props) => {
  const { arr, setSelected, closeModal } = props;

  const [currentSelected, setCurrentSelected] = useState(null);

  const selectHandler = (obj) => {
    setCurrentSelected(obj);
  };

  const confirmSelectedHandler = () => {
    // ensure that 1 image is selected before proceeding
    if (currentSelected) {
      setSelected(currentSelected);
    } else {
      // display message to select one image
    }

    closeModal();
  };

  return (
    <div>
      <GridWrapper>
        {arr &&
          arr.map((obj, index) => (
            <ImgCard
              key={index}
              highlight={obj === currentSelected ? "1" : "0"}
            >
              <Img
                src={obj.img_path}
                alt={index}
                onClick={() => selectHandler(obj)}
              />
            </ImgCard>
          ))}
      </GridWrapper>
      <UtilsWrapper>
        <SelectedBtn
          variant="contained"
          color="primary"
          onClick={confirmSelectedHandler}
        >
          Confirmar
        </SelectedBtn>
      </UtilsWrapper>
    </div>
  );
};

export default ModalGrid;
