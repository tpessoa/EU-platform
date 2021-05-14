import React, { useState, useEffect } from "react";

import { Controller } from "react-hook-form";
import UploadImage from "../../../../Form/UploadImage";
import Checkbox from "../../../../Form/Checkbox";
import Input from "../../../../Form/Input";
import { puzzleObj } from "../games.data";

const EditPuzzle = (props) => {
  const {
    createNew,
    errors,
    register,
    control,
    watch,
    fields,
    uploading,
  } = props;

  if (createNew) {
    fields = {
      ...fields,
      ...puzzleObj,
    };
  }
  let time_flag = watch("config.time");

  return (
    <>
      <Input
        {...register("config.pieces_size")}
        name="config.pieces_size"
        type="number"
        label="Tamanho das peças"
        error={!!errors.config?.pieces_size}
        helperText={errors?.config?.pieces_size?.message}
      />
      <Controller
        name="config.time"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Checkbox {...field} label="Tempo para terminar o jogo" />
        )}
        error={!!errors.config?.time}
        helperText={errors?.config?.time?.message}
      />
      <Input
        {...register("config.time_to_complete")}
        name="config.time_to_complete"
        type="number"
        label="Tempo em segundos"
        error={!!errors.config?.time_to_complete}
        helperText={errors?.config?.time_to_complete?.message}
        disabled={!time_flag}
      />
      <Controller
        name="config.background_puzzle_image"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Checkbox {...field} label="Background com image do puzzle" />
        )}
        error={!!errors.config?.background_puzzle_image}
        helperText={errors?.config?.background_puzzle_image?.message}
      />
      <Controller
        name="config.piece_position_helper"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Checkbox
            {...field}
            label="Ajuda com as marcas das peças no tabuleiro"
          />
        )}
        error={!!errors.config?.piece_position_helper}
        helperText={errors?.config?.piece_position_helper?.message}
      />
      <Controller
        name="config.move_pieces_freely"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Checkbox {...field} label="Mover peças livremente pelo tabuleiro" />
        )}
        error={!!errors.config?.move_pieces_freely}
        helperText={errors?.config?.move_pieces_freely?.message}
      />

      <UploadImage
        {...register("assets.puzzle_image")}
        name="assets.puzzle_image"
        type="file"
        error={!!errors.assets?.puzzle_image}
        helperText={errors?.assets?.puzzle_image?.message}
        description="Imagem do Puzzle"
        image={{
          imagePath: fields.assets.puzzle_image,
          uploading: uploading,
        }}
      />
    </>
  );
};

export default EditPuzzle;
