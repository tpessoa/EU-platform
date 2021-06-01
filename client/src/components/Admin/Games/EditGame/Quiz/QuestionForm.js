import {
  MenuItem,
  Typography,
  Paper,
  Button,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
import Input from "../../../../Form/InputNotPaper";
import SelectInput from "../../../../Form/SelectInput";
import DeleteIcon from "@material-ui/icons/Delete";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 0, 2, 0),
    padding: theme.spacing(0, 1, 0, 1),
  },
  heading: {
    textAlign: "center",
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

const QuestionForm = (props) => {
  const classes = useStyles();
  const { index, item, control, register, remove, swap, totalQuests, error } =
    props;

  let upBtn = "";
  if (index - 1 >= 0) {
    upBtn = (
      <IconButton
        aria-label="swap"
        className={classes.margin}
        onClick={() => swap(index, index - 1)}
      >
        <ArrowUpwardIcon />
      </IconButton>
    );
  }

  let downBtn = "";
  if (index + 1 < totalQuests) {
    downBtn = (
      <IconButton
        aria-label="swap"
        className={classes.margin}
        onClick={() => swap(index, index + 1)}
      >
        <ArrowDownwardIcon />
      </IconButton>
    );
  }

  return (
    <Paper elevation={3} className={classes.paper}>
      <Typography variant="h6" gutterBottom align="center">
        <div>
          {upBtn}
          {downBtn}
        </div>
        Questão {index + 1}
        <IconButton
          aria-label="delete"
          className={classes.margin}
          onClick={() => remove(index)}
        >
          <DeleteIcon />
        </IconButton>
      </Typography>
      <Input
        {...register(`config.questions.${index}.question`)}
        defaultValue={`${item.question}`} // make sure to set up defaultValue
        type="text"
        label="Questão"
        error={!!error?.question}
        helperText={error?.question?.message}
      />
      <Input
        {...register(`config.questions.${index}.answer1`)}
        defaultValue={`${item.answer1}`}
        type="text"
        label="Resposta 1"
        error={!!error?.answer1}
        helperText={error?.answer1?.message}
      />
      <Input
        {...register(`config.questions.${index}.answer2`)}
        defaultValue={`${item.answer2}`}
        type="text"
        label="Resposta 2"
        error={!!error?.answer2}
        helperText={error?.answer2?.message}
      />
      <Input
        {...register(`config.questions.${index}.answer3`)}
        defaultValue={`${item.answer3}`}
        type="text"
        label="Resposta 3"
        error={!!error?.answer3}
        helperText={error?.answer3?.message}
      />
      <Input
        {...register(`config.questions.${index}.answer4`)}
        defaultValue={`${item.answer4}`}
        type="text"
        label="Resposta 4"
        error={!!error?.answer4}
        helperText={error?.answer4?.message}
      />
      <Controller
        name={`config.questions.${index}.right_answer`}
        defaultValue={`${item.right_answer}`}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <SelectInput
            label="Resposta correta"
            {...field}
            error={!!error?.right_answer}
            helpertext={error?.right_answer?.message}
          >
            <MenuItem value={0}>Resposta 1</MenuItem>
            <MenuItem value={1}>Resposta 2</MenuItem>
            <MenuItem value={2}>Resposta 3</MenuItem>
            <MenuItem value={3}>Resposta 4</MenuItem>
          </SelectInput>
        )}
      />
      <Input
        {...register(`config.questions.${index}.justification`)}
        defaultValue={`${item.justification}`}
        type="text"
        label="Justificação"
        error={!!error?.justification}
        helperText={error?.justification?.message}
      />
    </Paper>
  );
};

export default QuestionForm;
