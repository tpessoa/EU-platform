import React, { useState, useEffect } from "react";
import styled from "styled-components";

import TextField from "../../TextInput/TextField";
import ListField from "../../TextInput/ListField";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const generateArray = (min, max) => {
  const tempArr = [];
  for (let i = min; i <= max; i++) {
    tempArr.push(i);
  }
  return tempArr;
};

const QuizQuestionForm = (props) => {
  const {
    questionRef,
    title,
    questionInfo,
    questionChanged,
    createNew,
  } = props;

  const [currQuestObj, setCurrQuest] = useState(null);
  useEffect(() => {
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

    // se if is from DB or not
    if (createNew) {
      setCurrQuest(emptyQuestion);
    } else {
      console.log(questionInfo);
      if (questionInfo === "addedQuestion") {
        setCurrQuest(emptyQuestion);
      } else {
        setCurrQuest({ ...questionInfo });
      }
    }
  }, []);

  useEffect(() => {
    // pass the object to parent component
    questionChanged(currQuestObj, questionRef);
  }, [currQuestObj]);

  const textChange = (ev, ref) => {
    const userInput = ev.target.value;
    const tempQuestionObj = { ...currQuestObj };
    // console.log(ref);
    // console.log(userInput);
    if (ref.includes("answer")) {
      tempQuestionObj.answers[ref] = userInput;
    } else if (ref.includes("audio")) {
    } else {
      tempQuestionObj[ref] = userInput;
    }
    setCurrQuest(tempQuestionObj);
  };

  let display = "";
  if (currQuestObj) {
    display = (
      <QuestionContainer>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetailsCustom>
          <TextField
            field_ref={"question"}
            label={"Questão"}
            value={currQuestObj.question}
            parentChangeHandler={textChange}
          />
          <GridWrapper>
            <TextField
              field_ref={"answer1"}
              label={"Resposta 1"}
              value={currQuestObj.answers.answer1}
              parentChangeHandler={textChange}
              multi={true}
            />
            <TextField
              field_ref={"answer2"}
              label={"Resposta 2"}
              value={currQuestObj.answers.answer2}
              parentChangeHandler={textChange}
              multi={true}
            />
            <TextField
              field_ref={"answer3"}
              label={"Resposta 3"}
              value={currQuestObj.answers.answer3}
              parentChangeHandler={textChange}
              multi={true}
            />
            <TextField
              field_ref={"answer4"}
              label={"Resposta 4"}
              value={currQuestObj.answers.answer4}
              parentChangeHandler={textChange}
              multi={true}
            />
          </GridWrapper>
          <ListField
            arr={generateArray(1, 4)}
            field_ref={"rightAnswer"}
            label={"Resposta correta"}
            value={currQuestObj.rightAnswer}
            parentChangeHandler={textChange}
          />
          <TextField
            field_ref={"justification"}
            label={"Justificação"}
            value={currQuestObj.justification}
            parentChangeHandler={textChange}
            multi={true}
          />
        </AccordionDetailsCustom>
      </QuestionContainer>
    );
  }

  return <>{display}</>;
};

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

export default QuizQuestionForm;
