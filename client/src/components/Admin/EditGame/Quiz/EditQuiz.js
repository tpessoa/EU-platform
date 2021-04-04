import React, { useState, useEffect } from "react";
import styled from "styled-components";

import QuizQuestionForm from "./QuizQuestionForm";

var emptyObj = {
  assets: {
    images: {},
  },
  config: {
    questions: [],
    time_to_resp_question: "",
  },
};

var emptyConfig = {
  questions: [],
  time_to_resp_question: "",
};

const EditGame = (props) => {
  const {
    createGame,
    generateArray,
    config,
    setConfig,
    assets,
    setAssets,
  } = props;

  const [loadedComplete, setLoadedComplete] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (createGame) {
      setConfig({ ...emptyConfig });
    }
    setLoadedComplete(true);
  }, []);

  const addQuestion = () => {
    const tempConfig = { ...config };
    // console.log(tempConfig);
    tempConfig.questions.push("addedQuestion");
    setConfig(tempConfig);
  };

  const updatedQuestionObj = (obj, ref) => {
    // console.log(obj);
    // console.log(ref);

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

  let displayQuestions = "";
  if (loadedComplete) {
    console.log("edit quiz");
    displayQuestions = config.questions.map((obj, index) => {
      return (
        <QuizQuestionForm
          key={index}
          questionRef={index}
          title={"Questão " + (index + 1)}
          questionInfo={obj}
          questionChanged={updatedQuestionObj}
          createNew={createGame}
          deleteQuestion={deleteQuestionHandler}
          update={update}
          setUpdate={setUpdate}
        />
      );
    });
  }

  const updateHandler = () => {
    setUpdate(!update);
  };

  return (
    <Container>
      <ContainerWrapper>
        <ContentWrapper>
          <p>Perguntas</p>
          {displayQuestions}
          <button onClick={addQuestion}>Adicionar Questão</button>
          {/* <button onClick={updateHandler}>Update</button> */}
        </ContentWrapper>
      </ContainerWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

export default EditGame;
