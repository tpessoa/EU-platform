import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "../../TextInput/TextField";
import ListField from "../../TextInput/ListField";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

var emptyObj = {
  assets: {
    images: {},
  },
  config: {
    questions: [
      {
        question: "",
        answers: {
          answer1: "11",
          answer2: "22",
          answer3: "33",
          answer4: "44",
        },
        right_answer: 2,
        justification: "justificaçao",
        audio: {
          id: "sem audio",
          path: "no se",
        },
      },
    ],
  },
  time_to_resp_question: 20,
};

const addQuestion = (obj) => {
  if (obj.config.questions.length > 0) {
    const temp = { ...obj.config.questions[0] };
    obj.config.questions.push(temp);
  }
  return obj;
};

const removeQuestion = (obj) => {
  if (obj.config.questions.length > 0) {
    obj.config.questions.pop();
  }
  return obj;
};

const generateArray = (min, max) => {
  const tempArr = [];
  for (let i = min; i <= max; i++) {
    tempArr.push(i);
  }
  return tempArr;
};

const EditGame = () => {
  const classes = useStyles();
  const { gameRef } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idField = query.get("id");

  const [userQuestionsInput, setUserQuestionsInput] = useState(0);
  const [numQuestionsArr, setNumQuestionsArr] = useState(generateArray(4, 15));
  const [quizObj, setQuizObj] = useState(null);

  useEffect(() => {
    const numQuestions = numQuestionsArr[userQuestionsInput];
    const emptyQuestion = { ...emptyObj.config.questions[0] };
    const emptyQuestionsArr = [];
    for (let i = 0; i < numQuestions; i++) {
      emptyQuestionsArr.push({ ...emptyQuestion });
    }
    // update arrays
    emptyObj.config.questions = [...emptyQuestionsArr];
    setQuizObj({ ...emptyObj });
  }, [userQuestionsInput]);

  const textChange = (ev, ref) => {
    const userInput = ev.target.value;
    // console.log(ref);
    // console.log(userInput);

    // inside the accordions
    if (ref.includes("accordion_")) {
      const tempStr = ref.split("_");
      // remove accordion ref
      tempStr.shift();
      const fieldRef = tempStr[0];
      const questionNumRef = tempStr[1];
      if (fieldRef.includes("answer")) {
        emptyObj.config.questions[questionNumRef].answers[fieldRef] = userInput;
      } else if (fieldRef.includes("audio")) {
      } else {
        emptyObj.config.questions[questionNumRef][fieldRef] = userInput;
      }
    }
    if (ref === "num_questions") {
      setUserQuestionsInput(userInput);
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
              value={""}
              parentChangeHandler={textChange}
            />
            <GridWrapper>
              <TextField
                field_ref={"accordion_answer1_" + index}
                label={"Resposta 1"}
                value={""}
                parentChangeHandler={textChange}
                multi={true}
              />
              <TextField
                field_ref={"accordion_answer2_" + index}
                label={"Resposta 2"}
                value={""}
                parentChangeHandler={textChange}
                multi={true}
              />
              <TextField
                field_ref={"accordion_answer3_" + index}
                label={"Resposta 3"}
                value={""}
                parentChangeHandler={textChange}
                multi={true}
              />
              <TextField
                field_ref={"accordion_answer4_" + index}
                label={"Resposta 4"}
                value={""}
                parentChangeHandler={textChange}
                multi={true}
              />
            </GridWrapper>
            <ListField
              arr={generateArray(1, 4)}
              field_ref={"accordion_right_answer_" + index}
              label={"Resposta correta"}
              value={""}
              parentChangeHandler={textChange}
            />
            <TextField
              field_ref={"accordion_justification_" + index}
              label={"Justificação"}
              value={""}
              parentChangeHandler={textChange}
              multi={true}
            />
          </AccordionDetailsCustom>
        </QuestionContainer>
      );
    });
  }

  const objState = () => {
    console.log(emptyObj);
  };

  return (
    <Container>
      <ContainerWrapper>
        <ContentWrapper>
          <p>{gameRef}</p>
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
            value={""}
            parentChangeHandler={textChange}
          />
          <button onClick={objState}>Click</button>
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
