import React from "react";
import { IconButton, MenuItem, Paper, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Input from "../../../../Form/InputNotPaper";
import { Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import SelectInput from "../../../../Form/SelectInput";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 0, 2, 0),
    padding: theme.spacing(0, 1, 1, 1),
  },
  heading: {
    textAlign: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const CrossWord = (props) => {
  const classes = useStyles();
  const {
    index,
    item,
    control,
    register,
    remove,
    swap,
    totalQuests,
    direction,
    error,
  } = props;

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
      </Typography>
      <Input
        {...register(`config.crossword_data.${direction}.${index}.num`)}
        defaultValue={`${item.num}`}
        type="number"
        label="Número da questão"
        error={!!error?.num}
        helperText={error?.num?.message}
      />
      <Input
        {...register(`config.crossword_data.${direction}.${index}.clue`)}
        defaultValue={`${item.clue}`}
        type="text"
        label="Pista"
        error={!!error?.clue}
        helperText={error?.clue?.message}
      />
      <Input
        {...register(`config.crossword_data.${direction}.${index}.answer`)}
        defaultValue={`${item.answer}`}
        type="text"
        label="Resposta"
        error={!!error?.answer}
        helperText={error?.answer?.message}
      />
      <Input
        {...register(`config.crossword_data.${direction}.${index}.row`)}
        defaultValue={`${item.row}`}
        type="number"
        label="Número da linha"
        error={!!error?.row}
        helperText={error?.row?.message}
      />
      <Input
        {...register(`config.crossword_data.${direction}.${index}.col`)}
        defaultValue={`${item.col}`}
        type="number"
        label="Número da Coluna"
        error={!!error?.col}
        helperText={error?.col?.message}
      />
    </Paper>
  );
};

export default CrossWord;
