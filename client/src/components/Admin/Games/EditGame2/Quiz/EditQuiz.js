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
  answers: {
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  },
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

  let time_flag = watch("config.time");

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
      />
    );
  });

  return (
    <div className={classes.root}>
      {displayQuestions}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => append(emptyQuestion)}
      >
        Adicionar questão
      </Button>
    </div>
  );
};

export default EditQuiz;
