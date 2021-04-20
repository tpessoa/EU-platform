import React, { useState, useEffect } from "react";
import styled from "styled-components";

import CrossWordForm from "./CrossWordDataForm";
import CheckboxField from "../../../../Input/CheckboxField";
import NumberField from "../../../../Input/NumberField";

var emptyObj = {
  assets: {
    images: {},
  },
  config: {},
};

var emptyConfig = {
  crossword_data: {
    across: [],
    down: [],
  },
};

const EditCrossWords = (props) => {
  const {
    createGame,
    config,
    setConfig,
    assets,
    setAssets,
    configTitle,
    assetsTitle,
  } = props;

  const [loadedComplete, setLoadedComplete] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (createGame) {
      setConfig({ ...emptyConfig });
    }
    setLoadedComplete(true);
  }, []);

  const addQuestion = (direction) => {
    const tempConfig = { ...config };
    if (direction === "across") {
      tempConfig.crossword_data.across.push("addedQuestion");
    } else if (direction === "down") {
      tempConfig.crossword_data.down.push("addedQuestion");
    }
    setConfig(tempConfig);
  };

  const updatedWordObj = (obj, ref) => {
    const objRefIndex = ref.split("_")[0];
    const objRefType = ref.split("_")[1];

    const tempConfig = { ...config };
    tempConfig.crossword_data[objRefType][objRefIndex] = { ...obj };
    setConfig(tempConfig);
  };

  const deleteWordHandler = (objRef) => {
    const objRefIndex = objRef.split("_")[0];
    const objRefType = objRef.split("_")[1];

    const tempConfig = { ...config };
    tempConfig.crossword_data[objRefType].splice(objRefIndex, 1);
    setConfig(tempConfig);
    setUpdate(true);
  };

  let displayHorizontal = "";
  if (loadedComplete) {
    displayHorizontal = config.crossword_data.across.map((word, index) => {
      return (
        <CrossWordForm
          key={index}
          wordRef={`${index}_across`}
          title={"Palavra " + (index + 1)}
          wordInfo={word}
          wordChanged={updatedWordObj}
          createNew={createGame}
          deleteWord={deleteWordHandler}
          update={update}
          setUpdate={setUpdate}
        />
      );
    });
  }
  let displayVertical = "";
  if (loadedComplete) {
    displayVertical = config.crossword_data.down.map((word, index) => {
      return (
        <CrossWordForm
          key={index}
          wordRef={`${index}_down`}
          title={"Palavra " + (index + 1)}
          wordInfo={word}
          wordChanged={updatedWordObj}
          createNew={createGame}
          deleteWord={deleteWordHandler}
          update={update}
          setUpdate={setUpdate}
        />
      );
    });
  }

  return (
    <Container>
      <p>{configTitle}</p>
      <ContainerWrapper>
        <ContentWrapper>
          <p>Questões Horizontais</p>
          <WordsWrapper>{displayHorizontal}</WordsWrapper>
          <button onClick={() => addQuestion("across")}>
            Adicionar Palavra Horizontal
          </button>
          <p>Questões Verticais</p>
          <WordsWrapper>{displayVertical}</WordsWrapper>
          <button onClick={() => addQuestion("down")}>
            Adicionar Palavra Vertical
          </button>
        </ContentWrapper>
      </ContainerWrapper>
    </Container>
  );
};

export default EditCrossWords;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 2rem;
  width: 100%;
`;

const ContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #cccccc;
  border-radius: 5px;
  width: 90%;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
`;

const WordsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 1rem;
`;
