import React, { useState, useEffect } from "react";

import NumberField from "../../../../Input/NumberField";
import ImageField from "../../../ImageField";

import styled from "styled-components";

const emptyPuzzleConfig = {
  pieces_size: "",
};

const emptyPuzzleAssets = {
  images: {
    final_img: {
      id: "defaultImage",
      path: "",
      server_path: "",
    },
  },
};

const EditPuzzle = (props) => {
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

  const [loadedCompleted, setLoadedCompleted] = useState(false);

  useEffect(() => {
    if (createGame) {
      setConfig({ ...emptyPuzzleConfig });
      setAssets({ ...emptyPuzzleAssets });
    }
    setLoadedCompleted(true);
  }, []);

  const textHandler = (userInput, ref) => {
    // console.log(ev.target.value);
    // console.log(ref);
    const tempConfig = { ...config };
    tempConfig[ref] = parseInt(userInput);
    setConfig(tempConfig);
  };

  const imageHandler = (obj, ref) => {
    // console.log(obj);
    // console.log(ref);

    const tempAssets = { ...assets };
    tempAssets.images[ref] = obj;
    setAssets(tempAssets);
  };

  let display = "";
  if (loadedCompleted) {
    display = (
      <>
        {configTitle}
        <NumberWrapper>
          <NumberField
            field_ref={"pieces_size"}
            label={"Tamanho das peças"}
            value={config.pieces_size}
            parentChangeHandler={textHandler}
            info={"100 as peças são grandes\n130 médias\n160 pequenas"}
          />
        </NumberWrapper>
        {assetsTitle}
        <ImageField
          field_ref={"final_img"}
          title={"Image do puzzle"}
          imageObj={assets.images.final_img}
          parentChangeHandler={imageHandler}
          linkedObj={id}
        />
      </>
    );
  }

  return <>{display}</>;
};

export default EditPuzzle;

const NumberWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
`;
