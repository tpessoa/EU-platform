import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useFieldArray } from "react-hook-form";
import { Button, Typography } from "@material-ui/core";
import { crossWordsObj } from "../games.data";
import CrossWord from "./CrossWord";
import ButtonForm from "../../../../Form/ButtonForm";

const emptyWord = {
  num: "",
  clue: "",
  answer: "",
  row: "",
  col: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
  errorMessage: { color: "#ff0000", marginBottom: theme.spacing(1) },
}));

const EditCrossWords = (props) => {
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
      ...crossWordsObj,
    };
  }

  const {
    fields: across_fields,
    append: across_append,
    remove: across_remove,
    swap: across_swap,
  } = useFieldArray({
    control,
    name: "config.crossword_data.across",
  });

  const {
    fields: down_fields,
    append: down_append,
    remove: down_remove,
    swap: down_swap,
  } = useFieldArray({
    control,
    name: "config.crossword_data.down",
  });

  const displayAcross = across_fields.map((item, index) => {
    return (
      <CrossWord
        key={item.id}
        index={index}
        item={item}
        register={register}
        control={control}
        remove={across_remove}
        swap={across_swap}
        direction={"across"}
        error={
          errors.config?.crossword_data?.across &&
          errors.config?.crossword_data?.across[index]
        }
      />
    );
  });
  const displayDown = down_fields.map((item, index) => (
    <CrossWord
      key={item.id}
      index={index}
      item={item}
      register={register}
      control={control}
      remove={down_remove}
      swap={down_swap}
      direction={"down"}
      error={
        errors.config?.crossword_data?.down &&
        errors.config?.crossword_data?.down[index]
      }
    />
  ));

  return (
    <>
      {displayAcross}
      <ButtonForm
        onClick={() => across_append({ ...emptyWord })}
        error={errors?.config?.crossword_data?.across}
        helpertext={errors?.config?.crossword_data?.across?.message}
      >
        Adicionar palavra na horizontal
      </ButtonForm>
      {displayDown}
      <ButtonForm
        onClick={() => down_append({ ...emptyWord })}
        error={errors?.config?.crossword_data?.down}
        helpertext={errors?.config?.crossword_data?.down?.message}
      >
        Adicionar palavra na vertical
      </ButtonForm>
    </>
  );
};

export default EditCrossWords;
