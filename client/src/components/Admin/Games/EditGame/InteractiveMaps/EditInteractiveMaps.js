import React from "react";
import { interactiveMapsObj } from "../games.data";
import Question from "./Question";
import { makeStyles } from "@material-ui/core/styles";
import { useFieldArray } from "react-hook-form";
import { Button, Typography } from "@material-ui/core";
import ButtonForm from "../../../../Form/ButtonForm";

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
  headingQuestions: { margin: theme.spacing(2, 0, 1, 0) },
  errorMessage: { color: "#ff0000", marginBottom: theme.spacing(1) },
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
        error={errors.config?.questions && errors.config?.questions[index]}
      />
    );
  });

  return (
    <div className={classes.root}>
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        className={classes.headingQuestions}
      >
        Questões aleatórias
      </Typography>
      {displayQuestions}
      <ButtonForm
        onClick={() => append(emptyQuestion)}
        error={errors?.config?.questions}
        helpertext={errors?.config?.questions?.message}
      >
        Adicionar questão
      </ButtonForm>
    </div>
  );
};

export default EditInteractiveMaps;
