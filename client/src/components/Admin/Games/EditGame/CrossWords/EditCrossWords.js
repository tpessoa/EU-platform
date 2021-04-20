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
  crosswords_data: {
    across: {},
    down: {},
  },
  countries_names_visible: null,
};

const EditCrossWords = (props) => {
  const {
    createGame,
    generateArray,
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
    // const tempConfig = { ...config };
    // tempConfig.questions.push("addedQuestion");
    // setConfig(tempConfig);
    if (direction === "across") {
    } else if (direction === "down") {
    }
  };

  const updatedWordObj = (obj, ref) => {
    const tempConfig = { ...config };
    tempConfig.questions[ref] = { ...obj };
    setConfig(tempConfig);
  };

  const deleteQuestionHandler = (objRef) => {
    const tempConfig = { ...config };
    tempConfig.questions.splice(objRef, 1);
    setConfig(tempConfig);
    setUpdate(true);
  };

  console.log(config.crosswords_data.across);

  let displayHorizontal = "";
  if (loadedComplete) {
    displayHorizontal = config.crosswords_data.across.map((word, index) => {
      return (
        <CrossWordForm
          key={index}
          questionRef={index}
          title={"Palavra " + (index + 1)}
          wordInfo={word}
          wordChanged={updatedWordObj}
          createNew={createGame}
          deleteQuestion={deleteQuestionHandler}
          update={update}
          setUpdate={setUpdate}
        />
      );
    });
  }
  let displayVertical = "";
  if (loadedComplete) {
    displayVertical = <p>Questões verticais</p>;
  }
  //   displayHorizontal = config.questions.map((obj, index) => {
  //     return (
  //       <QuestionForm
  //         key={index}
  //         questionRef={index}
  //         title={"Questão " + (index + 1)}
  //         questionInfo={obj}
  //         questionChanged={updatedQuestionObj}
  //         createNew={createGame}
  //         deleteQuestion={deleteQuestionHandler}
  //         update={update}
  //         setUpdate={setUpdate}
  //       />
  //     );
  //   });
  // }

  return (
    <Container>
      <p>{configTitle}</p>
      <ContainerWrapper>
        <ContentWrapper>
          <WordsWrapper>{displayHorizontal}</WordsWrapper>
          <button onClick={() => addQuestion("across")}>
            Adicionar Palavra Horizontal
          </button>
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
