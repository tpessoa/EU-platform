import React, { useEffect } from "react";
import Input from "../../../../Form/Input";
import { Controller, useFieldArray } from "react-hook-form";
import CheckBox from "../../../../Form/Checkbox";
import { Button, Paper, Typography, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckboxInput from "../../../../Form/CheckboxInput";
import Select from "../../../../Form/SelectInput";
import UploadImage from "../../../../Form/UploadImage";
import FrontCards from "./FrontCards";

const totalImagesArr = [3, 6, 8, 10];
const emptyImage = {
  id: "defaultImage",
  path: "",
  server_path: "",
};

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
}));

const EditMemory = (props) => {
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

  const [numCards, setNumCards] = React.useState(
    totalImagesArr.findIndex((i) => i === obj.assets.front_cards.length)
  );

  console.log(obj);

  const timer = watch("config.timer");
  const total_images = watch("config.total_images");
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "assets.front_cards",
  });

  if (timer) {
    setValue("max_attempts", 0);
  }

  useEffect(() => {
    console.log(createNew);
    if (createNew) {
      // generate 10 upload images fields
      const tempArr = [];
      const limitNum = 10;
      for (let i = 0; i < limitNum; i++) {
        tempArr.push({ pair: { ...emptyImage } });
      }
      append(tempArr);
    }
  }, []);

  let counter = 0;
  let displayFrontCards = fields.map((item, index) => {
    counter++;
    let disabled = false;
    if (counter > totalImagesArr[total_images]) {
      disabled = true;
    }
    return (
      <FrontCards
        key={item.id}
        index={index}
        item={item}
        remove={remove}
        swap={swap}
        control={control}
        uploading={uploading}
        register={register}
        errors={errors}
        total_cards={fields.length}
        setValue={setValue}
      />
    );
  });

  return (
    <>
      <CheckboxInput
        register={register}
        control={control}
        textName={"config.time_to_complete"}
        textLabel={"Tempo em segundos"}
        checkboxName={"config.timer"}
        checkboxLabel={"Tempo para terminar o jogo"}
        disabled={!timer}
        error={!!errors.config?.time_to_complete}
        helperText={errors?.config?.time_to_complete?.message}
      />
      <Input
        {...register("config.max_attempts")}
        name="config.max_attempts"
        type="number"
        label="Tentativas máximas"
        error={!!errors.config?.max_attempts}
        helperText={errors?.config?.max_attempts?.message}
        disabled={timer}
      />
      <Controller
        name="config.destroy_card"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CheckBox {...field} label="Destruir par no fim de descoberto" />
        )}
        error={!!errors.config?.destroy_card}
        helperText={errors?.config?.destroy_card?.message}
      />
      <UploadImage
        {...register("assets.back_card")}
        name="assets.back_card"
        type="file"
        error={!!errors.assets?.back_card}
        helperText={errors?.assets?.back_card?.message}
        description="Imagem da carta virada"
        image={{
          imagePath: obj.assets.back_card,
          uploading: uploading,
        }}
      />
      <Typography variant="h6" gutterBottom align="center">
        Pares de cartas do jogo
      </Typography>
      <Controller
        name="config.total_images"
        control={control}
        defaultValue={false}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            label="Número de cartas"
            {...field}
            error={!!errors.config?.total_images}
            helpertext={errors?.config?.total_images?.message}
          >
            {totalImagesArr.map((num, index) => (
              <MenuItem key={index} value={index}>
                {num}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {displayFrontCards}
    </>
  );
};

export default EditMemory;
