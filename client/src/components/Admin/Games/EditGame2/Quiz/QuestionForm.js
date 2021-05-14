import {
  MenuItem,
  Typography,
  Paper,
  Button,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
import Input from "../../../../Form/Input";
import SelectInput from "../../../../Form/SelectInput";
import DeleteIcon from "@material-ui/icons/Delete";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paper: {
    margin: theme.spacing(2, 0, 2, 0),
    padding: theme.spacing(0, 1, 0, 1),
  },
  heading: {
    textAlign: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const QuestionForm = (props) => {
  const classes = useStyles();
  const { index, item, control, register, remove, swap, totalQuests } = props;

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
        Questão {index + 1}
        <IconButton
          aria-label="delete"
          className={classes.margin}
          onClick={() => remove(index)}
        >
          <DeleteIcon />
        </IconButton>
        {upBtn}
        {downBtn}
      </Typography>
      <Input
        {...register(`config.questions.${index}.question`)}
        defaultValue={`${item.question}`} // make sure to set up defaultValue
        type="text"
        label="Questão"
        // error={!!errors.config?.pieces_size}
        // helperText={errors?.config?.pieces_size?.message}
      />
      <Input
        {...register(`config.questions.${index}.answers.answer1`)}
        defaultValue={`${item.answers.answer1}`}
        type="text"
        label="Resposta 1"
        // error={!!errors.config?.pieces_size}
        // helperText={errors?.config?.pieces_size?.message}
      />
      <Input
        {...register(`config.questions.${index}.answers.answer2`)}
        defaultValue={`${item.answers.answer2}`}
        type="text"
        label="Resposta 2"
        // error={!!errors.config?.pieces_size}
        // helperText={errors?.config?.pieces_size?.message}
      />
      <Input
        {...register(`config.questions.${index}.answers.answer3`)}
        defaultValue={`${item.answers.answer3}`}
        type="text"
        label="Resposta 3"
        // error={!!errors.config?.pieces_size}
        // helperText={errors?.config?.pieces_size?.message}
      />
      <Input
        {...register(`config.questions.${index}.answers.answer4`)}
        defaultValue={`${item.answers.answer4}`}
        type="text"
        label="Resposta 4"
        // error={!!errors.config?.pieces_size}
        // helperText={errors?.config?.pieces_size?.message}
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
            // error={!!errors.poll_id}
            // helpertext={errors?.poll_id?.message}
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
        // error={!!errors.config?.pieces_size}
        // helperText={errors?.config?.pieces_size?.message}
      />
    </Paper>
  );
};

export default QuestionForm;
