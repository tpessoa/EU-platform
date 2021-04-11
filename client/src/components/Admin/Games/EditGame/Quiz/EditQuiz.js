import React, { useState, useEffect } from "react";
import styled from "styled-components";

import QuizQuestionForm from "./QuizQuestionForm";
import CheckboxField from "../../../../Input/CheckboxField";
import NumberField from "../../../../Input/NumberField";

var emptyObj = {
  assets: {
    images: {},
  },
  config: {
    questions: [],
    timer: false,
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
    configTitle,
    assetsTitle,
  } = props;

  const [loadedComplete, setLoadedComplete] = useState(false);
  const [update, setUpdate] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

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

  const numberHandler = (userInput, ref) => {
    // console.log(ev.target.value);
    // console.log(ref);

    const tempConfig = { ...config };
    tempConfig[ref] = parseInt(userInput);
    setConfig(tempConfig);
  };

  const timerHandler = (flag, ref) => {
    const tempConfig = { ...config };
    tempConfig[ref] = flag;
    setConfig(tempConfig);

    setTimerActive(flag);
  };

  return (
    <Container>
      <p>{configTitle}</p>
      <ContainerWrapper>
        <ContentWrapper>
          {displayQuestions}
          <button onClick={addQuestion}>Adicionar Questão</button>
        </ContentWrapper>
      </ContainerWrapper>
      <TimeContainer>
        <TimeCheckboxContainer>
          <CheckboxField
            field_ref={"timer"}
            value={config.timer}
            description={"Ativar"}
            setHandler={timerHandler}
          />
        </TimeCheckboxContainer>

        <TimeValueCheckboxContainer>
          <NumberField
            disabled={!timerActive}
            field_ref={"time_to_resp_question"}
            label={"Tempo para responder a cada questão (segundos)"}
            value={config.time_to_resp_question}
            parentChangeHandler={numberHandler}
          />
        </TimeValueCheckboxContainer>
      </TimeContainer>
    </Container>
  );
};

export default EditGame;

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

const TimeContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
`;

const TimeCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
`;
const TimeValueCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
`;
