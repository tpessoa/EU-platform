import React, { useState } from "react";
import { quizObj } from "../games.data";
import QuestionForm from "./QuestionForm";
import { makeStyles } from "@material-ui/core/styles";
import { Controller, useFieldArray } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Input from "../../../../Form/Input";
import ButtonForm from "../../../../Form/ButtonForm";
import CheckboxInput from "../../../../Form/CheckboxInput";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    width: 220,
  },
  root: {
    justifyContent: "center",
  },
}));

const emptyQuestion = {
  question: "",
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  right_answer: "",
  justification: "",
};

const EditQuiz = (props) => {
  const classes = useStyles();
  const {
    createNew,
    errors,
    unregister,
    register,
    setValue,
    control,
    watch,
    obj,
    uploading,
  } = props;

  if (createNew) {
    obj = {
      ...obj,
      ...quizObj,
    };
  }

  let timer = watch("config.timer");

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "config.questions",
    }
  );

  // const watchResult = watch("config.questions");
  // console.log(watchResult);

  let displayQuestions = fields.map((item, index) => {
    return (
      <QuestionForm
        key={item.id}
        index={index}
        item={item}
        register={register}
        control={control}
        remove={remove}
        swap={swap}
        totalQuests={fields.length}
        error={errors.config?.questions && errors.config?.questions[index]}
      />
    );
  });

  return (
    <div className={classes.root}>
      <CheckboxInput
        register={register}
        control={control}
        textName={"config.time_to_resp_question"}
        textLabel={"Tempo em segundos"}
        checkboxName={"config.timer"}
        checkboxLabel={"Tempo para responder a cada pergunta"}
        disabled={!timer}
        error={!!errors.config?.time_to_resp_question}
        helperText={errors?.config?.time_to_resp_question?.message}
      />
      {displayQuestions}
      <ButtonForm
        onClick={() => append({ ...emptyQuestion })}
        error={errors?.config?.questions}
        helpertext={errors?.config?.questions?.message}
      >
        Adicionar questão
      </ButtonForm>
    </div>
  );
};

export default EditQuiz;
