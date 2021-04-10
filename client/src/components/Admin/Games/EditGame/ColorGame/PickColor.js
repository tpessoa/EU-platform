import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { SketchPicker } from "react-color";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const PickColor = (props) => {
  const { pickedColor, addColor } = props;
  const [currentColor, setCurrentColor] = useState("#eb1717");

  const colorUpdateHandler = (color, ev) => {
    setCurrentColor(color.hex);
  };

  const colorChangeHandler = (color, ev) => {
    setCurrentColor(color.hex);
    pickedColor(color.hex);
  };

  const addColorToGame = () => {
    addColor(currentColor);
  };

  return (
    <Container>
      <SketchPicker
        color={currentColor}
        disableAlpha={true}
        onChange={colorUpdateHandler}
        onChangeComplete={colorChangeHandler}
      />
      <AddColorContainer>
        {/* <DisplayColorWrapper>
          <p>Cor Escolhida: {currentColor}</p>
          <DisplayColor color={currentColor} />
        </DisplayColorWrapper> */}
        <ColorButton
          variant="contained"
          onClick={addColorToGame}
          pickedcolor={currentColor}
        >
          Adicionar cor
        </ColorButton>
      </AddColorContainer>
    </Container>
  );
};

export default PickColor;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const AddColorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 1rem;
`;

const ColorButton = styled(Button)`
  background-color: ${(props) => props.pickedcolor} !important;
  color: #fff !important;
  text-shadow: -0.7px -0.7px 0 #000, 0.7px -0.7px 0 #000, -0.7px 0.7px 0 #000,
    0.7px 0.7px 0 #000;
`;
