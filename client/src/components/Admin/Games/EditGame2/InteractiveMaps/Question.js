import React from "react";
import { IconButton, MenuItem, Paper, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Input from "../../../../Form/Input";
import { Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import SelectInput from "../../../../Form/SelectInput";

import { countriesData } from "../../../../../pages/Admin/games/RightAnswersData";

const useStyles = makeStyles((theme) => ({
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

const Question = (props) => {
  const classes = useStyles();
  const { index, item, control, register, remove, swap, totalQuests } = props;

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
        // error={!!errors.config?.pieces_size}
        // helperText={errors?.config?.pieces_size?.message}
      />
    </Paper>
  );
};

export default Question;
