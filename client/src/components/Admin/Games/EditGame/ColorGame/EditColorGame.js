import React from "react";
import { colorGameObj } from "../games.data";
import { makeStyles } from "@material-ui/core/styles";
import { useFieldArray } from "react-hook-form";
import { Button, Paper, Typography } from "@material-ui/core";
import ButtonForm from "../../../../Form/ButtonForm";
import UploadImage from "../../../../Form/UploadImage";
import Input from "../../../../Form/InputNotPaper";
import ColorSelector from "./ColorSelector";
import ColorsDisplay from "./ColorsDisplay";

const emptyColor = {
  code: "ffff00",
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    width: 220,
  },
  paper: {
    margin: theme.spacing(1, 0, 1, 0),
    padding: theme.spacing(0, 1, 0, 1),
  },
  headingQuestions: { margin: theme.spacing(2, 0, 1, 0) },
  errorMessage: { color: "#ff0000", marginBottom: theme.spacing(1) },
  colorSelector: {
    margin: theme.spacing(1, 0, 1, 0),
    padding: theme.spacing(0, 1, 0, 1),
    display: "grid",
    gridTemplateColumns: "2fr 2fr",
    maxHeight: "45vh",
  },
  colors: {
    overflowY: "scroll",
    maxHeight: "40vh",
  },
}));

const EditColorGame = (props) => {
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
      ...colorGameObj,
    };
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "config.colors",
  });

  let displayColors = fields.map((item, index) => {
    return (
      <ColorsDisplay
        key={item.id}
        index={index}
        item={item}
        register={register}
        control={control}
        setValue={setValue}
        remove={remove}
        error={errors.config?.colors && errors.config?.colors[index]}
      />
    );
  });

  return (
    <>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom align="center">
          Escolha das cores
        </Typography>
        <div className={classes.colorSelector}>
          <ColorSelector addColor={append} errors={errors} />
          <div className={classes.colors}>{displayColors}</div>
        </div>
        <Input
          {...register("config.sensibility")}
          name="config.sensibility"
          type="number"
          label="Sensibildiade do algoritmo"
          error={!!errors.config?.sensibility}
          helperText={errors?.config?.sensibility?.message}
        />
      </Paper>
      <UploadImage
        {...register("assets.colored_img")}
        name="assets.colored_img"
        type="file"
        error={!!errors.assets?.colored_img}
        helperText={errors?.assets?.colored_img?.message}
        description={`Imagem colorida`}
        image={{
          imagePath: obj.assets.colored_img,
          uploading: uploading,
        }}
      />
      <UploadImage
        {...register("assets.blank_img")}
        name="assets.blank_img"
        type="file"
        error={!!errors.assets?.blank_img}
        helperText={errors?.assets?.blank_img?.message}
        description={`Imagem por colorir com os contornos`}
        image={{
          imagePath: obj.assets.blank_img,
          uploading: uploading,
        }}
      />
    </>
  );
};

export default EditColorGame;
