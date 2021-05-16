import React from "react";
import { interactiveMapsObj } from "../games.data";
import Question from "./Question";
import { makeStyles } from "@material-ui/core/styles";
import { useFieldArray } from "react-hook-form";
import { Button, Typography } from "@material-ui/core";

const emptyQuestion = {
  question: "",
  right_answer: "",
  justification: "",
};

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
  button: {},
}));

const EditInteractiveMaps = (props) => {
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
      ...interactiveMapsObj,
    };
  }

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "config.questions",
  });

  // const watchResult = watch("config.questions");
  // console.log(watchResult);

  let displayQuestions = fields.map((item, index) => {
    return (
      <Question
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
      <Typography variant="h6" gutterBottom align="center">
        Questões aleatórias
      </Typography>
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

export default EditInteractiveMaps;
