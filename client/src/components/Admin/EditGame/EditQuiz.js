import React, { useState, useEffect } from "react";
import styled from "styled-components";

import TextField from "../../TextInput/TextField";
import ListField from "../../TextInput/ListField";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const emptyQuestion = {
  question: "",
  answers: {
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  },
  rightAnswer: "",
  justification: "",
  audio: {
    id: "",
    path: "",
  },
};

var emptyObj = {
  assets: {
    images: {},
  },
  config: {
    questions: [{ ...emptyQuestion }],
    time_to_resp_question: "",
  },
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

  const [userQuestionsInput, setUserQuestionsInput] = useState(0);
  const [numQuestionsArr, setNumQuestionsArr] = useState(generateArray(4, 15));

  useEffect(() => {
    if (!createGame) {
      setUserQuestionsInput(config.questions.length - 4);
    }
  }, []);

  useEffect(() => {
    let tempConfig;
    const numQuestions = numQuestionsArr[userQuestionsInput];
    if (createGame) {
      tempConfig = { ...emptyObj.config };
    } else {
      tempConfig = { ...config };
    }
    const neededNumQuestions = numQuestions - tempConfig.questions.length;
    // user wanted, for example, 7 questions and then changed to 3
    if (neededNumQuestions < 0) {
      for (let i = 0; i < Math.abs(neededNumQuestions); i++) {
        tempConfig.questions.pop();
      }
    } else {
      for (let i = 0; i < neededNumQuestions; i++) {
        // let obj = { ...emptyQuestion };
        tempConfig.questions.push(JSON.parse(JSON.stringify(emptyQuestion)));
      }
    }

    setConfig(tempConfig);
  }, [userQuestionsInput]);

  const textChange = (ev, ref) => {
    const userInput = ev.target.value;
    const tempConfig = { ...config };

    if (ref === "num_questions") {
      setUserQuestionsInput(userInput);
    }
    // inside the accordions
    else if (ref.includes("accordion_")) {
      const tempStr = ref.split("_");
      // remove accordion ref
      tempStr.shift();
      const fieldRef = tempStr[0];
      const questionNumRef = tempStr[1];

      if (fieldRef.includes("answer")) {
        tempConfig.questions[questionNumRef].answers[fieldRef] = userInput;
      } else if (fieldRef.includes("audio")) {
      } else {
        tempConfig.questions[questionNumRef][fieldRef] = userInput;
      }
    } else if (ref === "time_to_resp_question") {
      tempConfig[ref] = userInput;
    }

    setConfig({ ...tempConfig });
  };

  let displayQuestions = "";
  if (config.questions) {
    displayQuestions = config.questions.map((obj, index) => {
      // console.log(obj);
      return (
        <QuestionContainer key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Questão {index + 1}</Typography>
          </AccordionSummary>
          <AccordionDetailsCustom>
            <TextField
              field_ref={"accordion_question_" + index}
              label={"Questão"}
              value={obj.question}
              parentChangeHandler={textChange}
            />
            <GridWrapper>
              <TextField
                field_ref={"accordion_answer1_" + index}
                label={"Resposta 1"}
                value={obj.answers.answer1}
                parentChangeHandler={textChange}
                multi={true}
              />
              <TextField
                field_ref={"accordion_answer2_" + index}
                label={"Resposta 2"}
                value={obj.answers.answer2}
                parentChangeHandler={textChange}
                multi={true}
              />
              <TextField
                field_ref={"accordion_answer3_" + index}
                label={"Resposta 3"}
                value={obj.answers.answer3}
                parentChangeHandler={textChange}
                multi={true}
              />
              <TextField
                field_ref={"accordion_answer4_" + index}
                label={"Resposta 4"}
                value={obj.answers.answer4}
                parentChangeHandler={textChange}
                multi={true}
              />
            </GridWrapper>
            <ListField
              arr={generateArray(1, 4)}
              field_ref={"accordion_rightAnswer_" + index}
              label={"Resposta correta"}
              value={obj.rightAnswer}
              parentChangeHandler={textChange}
            />
            <TextField
              field_ref={"accordion_justification_" + index}
              label={"Justificação"}
              value={obj.justification}
              parentChangeHandler={textChange}
              multi={true}
            />
          </AccordionDetailsCustom>
        </QuestionContainer>
      );
    });
  }

  return (
    <Container>
      <ContainerWrapper>
        <ContentWrapper>
          {config && (
            <>
              <ListField
                arr={numQuestionsArr}
                field_ref={"num_questions"}
                label={"Número de perguntas"}
                value={userQuestionsInput}
                parentChangeHandler={textChange}
              />
              {displayQuestions}
            </>
          )}
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

const QuestionContainer = styled(Accordion)`
  && {
    width: 95%;
    border-radius: 5px;
    margin: 0.6rem;
  }
`;

const AccordionDetailsCustom = styled(AccordionDetails)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const GridWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90%;
  max-height: 40vh;
  overflow-y: auto;
  margin: 1rem 0;
`;

export default EditGame;
