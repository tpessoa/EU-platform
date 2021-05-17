import React from "react";
import Input from "../../../../Form/Input";
import Words from "./Words";
import { Controller, useFieldArray } from "react-hook-form";
import CheckBox from "../../../../Form/Checkbox";
import { Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckboxInput from "../../../../Form/CheckboxInput";
import ButtonForm from "../../../../Form/ButtonForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 0, 2, 0),
    padding: theme.spacing(0, 1, 0, 1),
    display: "grid",
    placeItems: "center",
  },
  directions: {
    display: "inline-block",
  },
  words: {
    margin: theme.spacing(2, 0, 2, 0),
    padding: theme.spacing(2),
    display: "grid",
    placeItems: "center",
  },
  button: {},
}));

const EditWordSearch = (props) => {
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

  let time_flag = watch("config.timer");

  console.log(obj);

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "config.words",
  });

  console.log(fields);

  let displayWords = fields.map((item, index) => (
    <Words
      key={item.id}
      index={index}
      item={item}
      remove={remove}
      swap={swap}
      control={control}
      error={errors.config?.words && errors.config?.words[index]}
    />
  ));

  return (
    <>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom align="center">
          Direções das palavras
        </Typography>
        <div className={classes.directions}>
          <Controller
            name="config.directions.down"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CheckBox {...field} label="Down" fullWidth={true} />
            )}
            error={!!errors.config?.directions?.down}
            helperText={errors?.config?.directions?.down?.message}
          />
          <Controller
            name="config.directions.right"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CheckBox {...field} label="Right" fullWidth={true} />
            )}
            error={!!errors.config?.directions?.right}
            helperText={errors?.config?.directions?.right?.message}
          />
          <Controller
            name="config.directions.right_down"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CheckBox {...field} label="Right Down" fullWidth={true} />
            )}
            error={!!errors.config?.directions?.right_down}
            helperText={errors?.config?.directions?.right_down?.message}
          />
          <Controller
            name="config.directions.left_down"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CheckBox {...field} label="Left Down" fullWidth={true} />
            )}
            error={!!errors.config?.directions?.left_down}
            helperText={errors?.config?.directions?.left_down?.message}
          />
        </div>
      </Paper>
      <Paper className={classes.words}>
        <Typography variant="h6" gutterBottom align="center">
          Palavras
        </Typography>
        {displayWords}
        <ButtonForm
          fullWidth={true}
          className={classes.button}
          onClick={() => append({ word: "" })}
          error={errors?.config?.words}
          helpertext={errors?.config?.words?.message}
        >
          Adicionar espaço para palavra
        </ButtonForm>
      </Paper>
      <Input
        {...register("config.num_horizontal_cells")}
        name="config.num_horizontal_cells"
        type="number"
        label="Número de células Horizontais"
        error={!!errors.config?.num_horizontal_cells}
        helperText={errors?.config?.num_horizontal_cells?.message}
      />
      <Input
        {...register("config.num_vertical_cells")}
        name="config.num_vertical_cells"
        type="number"
        label="Número de células Horizontais"
        error={!!errors.config?.num_vertical_cells}
        helperText={errors?.config?.num_vertical_cells?.message}
      />

      <CheckboxInput
        register={register}
        control={control}
        textName={"config.time_to_complete"}
        textLabel={"Tempo em segundos"}
        checkboxName={"config.timer"}
        checkboxLabel={"Tempo para terminar o jogo"}
        disabled={!time_flag}
        error={!!errors.config?.time_to_complete}
        helperText={errors?.config?.time_to_complete?.message}
      />
    </>
  );
};

export default EditWordSearch;
