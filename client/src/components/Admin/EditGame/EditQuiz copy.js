import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
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
    time_to_resp_question: 30,
  },
};

const generateArray = (min, max) => {
  const tempArr = [];
  for (let i = min; i <= max; i++) {
    tempArr.push(i);
  }
  return tempArr;
};

var tempQuizObj;

const EditGame = (props) => {
  const { config, setConfig } = props;
  const { gameRef } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idField = query.get("id");

  const [userQuestionsInput, setUserQuestionsInput] = useState(0);
  const [numQuestionsArr, setNumQuestionsArr] = useState(generateArray(4, 15));
  const [quizObj, setQuizObj] = useState(null);
  const [createGame, setCreateGame] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataFromBD, setDataFromBD] = useState(false);

  useEffect(() => {
    if (quizObj == null) return;

    const numQuestions = numQuestionsArr[userQuestionsInput];
    let tempQuestionsArr = [];
    if (dataFromBD) {
      const neededNumQuestions = numQuestions - quizObj.config.questions.length;
      tempQuestionsArr = [...tempQuizObj.config.questions];
      // user wanted, for example, 7 questions and then changed to 3
      if (neededNumQuestions < 0) {
        for (let i = 0; i < Math.abs(neededNumQuestions); i++) {
          tempQuestionsArr.pop();
        }
      } else {
        for (let i = 0; i < neededNumQuestions; i++) {
          tempQuestionsArr.push({ ...emptyQuestion });
        }
      }
    } else {
      for (let i = 0; i < numQuestions; i++) {
        tempQuestionsArr.push({ ...emptyQuestion });
      }
    }

    const tempObj = { ...quizObj };
    tempObj.config.questions = [...tempQuestionsArr];

    // update arrays
    tempQuizObj = { ...tempObj };
    setQuizObj({ ...tempObj });
  }, [userQuestionsInput, dataLoaded]);

  const textChange = (ev, ref) => {
    const userInput = ev.target.value;

    // inside the accordions
    if (ref.includes("accordion_")) {
      const tempStr = ref.split("_");
      // remove accordion ref
      tempStr.shift();
      const fieldRef = tempStr[0];
      const questionNumRef = tempStr[1];

      if (fieldRef.includes("answer")) {
        tempQuizObj.config.questions[questionNumRef].answers[
          fieldRef
        ] = userInput;
      } else if (fieldRef.includes("audio")) {
      } else if (fieldRef.includes("rightAnswer")) {
        tempQuizObj.config.questions[questionNumRef][fieldRef] = userInput;
        setQuizObj({ ...tempQuizObj });
      } else {
        tempQuizObj.config.questions[questionNumRef][fieldRef] = userInput;
      }
    }
    if (ref === "num_questions") {
      setUserQuestionsInput(userInput);
    } else if (ref === "time_to_resp_question") {
      tempQuizObj.config[ref] = userInput;
    }
  };

  let displayQuestions = "";
  if (quizObj != null) {
    displayQuestions = quizObj.config.questions.map((obj, index) => {
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
          <p>{gameRef}</p>
          {quizObj && (
            <>
              <ListField
                arr={numQuestionsArr}
                field_ref={"num_questions"}
                label={"Número de perguntas"}
                value={userQuestionsInput}
                parentChangeHandler={textChange}
              />
              {displayQuestions}
              <TextField
                field_ref={"time_to_resp_question"}
                label={"Tempo para responder às perguntas"}
                value={quizObj.config.time_to_resp_question}
                parentChangeHandler={textChange}
              />
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
`;

const ContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #cccccc;
  border-radius: 5px;
  width: 80%;
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
