import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import ImageField from "../../../ImageField";
import NumberField from "../../../../Input/NumberField";
import Color from "./Color";
import PickColor from "./PickColor";

import Paper from "@material-ui/core/Paper";

const emptyColorGameAssets = {
  images: {
    colored_img: {
      id: "defaultImage",
      path: "",
      server_path: "",
    },
    blank_img: {
      id: "defaultImage",
      path: "",
      server_path: "",
    },
  },
};

const emptyColorGameConfig = {
  colors: [],
  sensibility: "",
};

const EditColorGame = (props) => {
  const {
    id,
    createGame,
    config,
    assets,
    setConfig,
    setAssets,
    configTitle,
    assetsTitle,
  } = props;

  const [loaded, setLoaded] = useState(false);
  const [pickedColor, setPickedColor] = useState("");

  useEffect(() => {
    if (createGame) {
      setConfig({ ...emptyColorGameConfig });
      setAssets({ ...emptyColorGameAssets });
    }
    setLoaded(true);
  }, []);

  const deleteColorHandler = (index) => {
    const tempConfig = { ...config };
    tempConfig.colors.splice(index, 1);
    setConfig(tempConfig);
  };

  const addColorHandler = (color) => {
    // see if color is already selected
    if (config.colors.find((elem) => elem === color)) return;

    const tempConfig = { ...config };
    tempConfig.colors.unshift(color);
    setConfig(tempConfig);
  };

  const numberHandler = (userInput, ref) => {
    const tempConfig = { ...config };
    tempConfig.sensibility = parseInt(userInput);
    setConfig(tempConfig);
  };

  const imageHandler = (obj, ref) => {
    const tempAssets = { ...assets };
    tempAssets.images[ref] = obj;
    setAssets(tempAssets);
  };

  let display = "";

  if (loaded) {
    display = (
      <>
        <p>{configTitle}</p>
        <ConfigContainer>
          <ColorContainer>
            <ColorPicketContainer>
              <PickColor
                pickedColor={setPickedColor}
                addColor={addColorHandler}
              />
            </ColorPicketContainer>
            <ColorsContainer>
              <TitleWrapper>Cores para pintar</TitleWrapper>
              {config.colors.map((color, index) => {
                return (
                  <Color
                    key={index}
                    index={index}
                    color={color}
                    deleteHandler={deleteColorHandler}
                  />
                );
              })}
            </ColorsContainer>
          </ColorContainer>
          <NumberField
            field_ref={"sensibility"}
            label={"Sensibilidade do algoritmo de colorir"}
            value={config.sensibility}
            parentChangeHandler={numberHandler}
          />
        </ConfigContainer>
        <AssetsContainer>
          {assetsTitle}
          <ImageField
            field_ref={"blank_img"}
            title={"Imagem por colorir (com contornos)"}
            imageObj={assets.images.blank_img}
            parentChangeHandler={imageHandler}
            linkedObj={id}
          />
          <ImageField
            field_ref={"colored_img"}
            title={"Imagem já colorida"}
            imageObj={assets.images.colored_img}
            parentChangeHandler={imageHandler}
            linkedObj={id}
          />
        </AssetsContainer>
      </>
    );
  }

  return <>{display}</>;
};

export default EditColorGame;

const ConfigContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const ColorContainer = styled(Paper)`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  margin: 1rem;
`;

const ColorPicketContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const AssetsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const ColorsContainer = styled(Paper)`
  display: flex;
  align-items: center;

  flex-direction: column;
  width: 40%;
  max-height: 40vh;
  overflow-y: auto;
`;

const TitleWrapper = styled.p`
  margin: 1rem;
`;
