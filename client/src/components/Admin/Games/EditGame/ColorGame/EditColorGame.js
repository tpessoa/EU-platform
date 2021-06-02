import React from "react";
import { colorGameObj } from "../games.data";
import { makeStyles } from "@material-ui/core/styles";
import { Controller, useFieldArray } from "react-hook-form";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import ButtonForm from "../../../../Form/ButtonForm";
import UploadImage from "../../../../Form/UploadImage";
import Input from "../../../../Form/InputNotPaper";
import ColorSelector from "./ColorSelector";
import ColorsDisplay from "./ColorsDisplay";
import Select from "../../../../Form/SelectInput";
import HelpIcon from "@material-ui/icons/Help";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

const helpSensibilityMessage = `Dica! Quando não dá para colorir uma cor clara sobre outra de tonalidade mais escura deve colocar o algoritmo com menor sensibilidade e testar novamente. 
  \n
  Atenção! Uma sensibilidade baixa pode levar a que os contornos da imagem sejam ignorados quando se tenta colorir uma secção`;

const helpColorSelectMessage =
  "Dica! Tente não escolher cores escuras que possam interferir com os contornos da imagem, pois o algoritmo não consegue distingir.";

const emptyColor = {
  code: "ffff00",
};

const sensibility_arr = ["Baixa", "Média", "Alta"];

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
          <Tooltip
            title={helpColorSelectMessage}
            placement="top-start"
            arrow
            TransitionComponent={Zoom}
          >
            <IconButton aria-label="delete">
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        <div className={classes.colorSelector}>
          <ColorSelector addColor={append} errors={errors} />
          <div className={classes.colors}>{displayColors}</div>
        </div>
        <Controller
          name="config.sensibility"
          control={control}
          defaultValue={false}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              label="Sensibildiade do algoritmo"
              {...field}
              error={!!errors.config?.sensibility}
              helper={"Sensibildiade do algoritmo é obrigatória"}
            >
              {sensibility_arr.map((size, index) => (
                <MenuItem key={index} value={index}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <Tooltip
          title={helpSensibilityMessage}
          placement="top-start"
          arrow
          TransitionComponent={Zoom}
        >
          <IconButton aria-label="delete">
            <HelpIcon />
          </IconButton>
        </Tooltip>
        {/* <Input
          {...register("config.sensibility")}
          name="config.sensibility"
          type="number"
          label="Sensibildiade do algoritmo"
          error={!!errors.config?.sensibility}
          helperText={errors?.config?.sensibility?.message}
        /> */}
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
