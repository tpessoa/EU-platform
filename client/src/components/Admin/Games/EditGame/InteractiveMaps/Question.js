import React from "react";
import { IconButton, MenuItem, Paper, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Input from "../../../../Form/InputNotPaper";
import { Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import SelectInput from "../../../../Form/SelectInput";

import { countriesData } from "../../../../../pages/Admin/games/RightAnswersData";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 0, 2, 0),
    padding: theme.spacing(0, 1, 1, 1),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Question = (props) => {
  const classes = useStyles();
  const { index, item, control, register, remove, error } = props;

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
        {...register(`config.questions.${index}.question`)}
        defaultValue={`${item.question}`} // make sure to set up defaultValue
        type="text"
        label="Questão"
        error={!!error?.question}
        helperText={error?.question?.message}
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
            {countriesData.map((countrieObj, index) => (
              <MenuItem key={index} value={index}>
                {countrieObj.country}
              </MenuItem>
            ))}
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

export default Question;
