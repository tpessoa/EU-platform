import React, { useState, useEffect } from "react";

import { Controller } from "react-hook-form";
import UploadImage from "../../../../Form/UploadImage";
import Checkbox from "../../../../Form/Checkbox";
import Input from "../../../../Form/Input";
import { puzzleObj } from "../games.data";
import Select from "../../../../Form/SelectInput";
import { MenuItem } from "@material-ui/core";

const pieces_sizes_arr = ["Muito Pequeno", "Pequeno", "Médio", "Grande"];

const EditPuzzle = (props) => {
  const { createNew, errors, register, control, watch, obj, uploading } = props;

  if (createNew) {
    obj = {
      ...obj,
      ...puzzleObj,
    };
  }
  let time_flag = watch("config.timer");

  return (
    <>
      <Controller
        name="config.pieces_size"
        control={control}
        defaultValue={false}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            label="Tamanho das Peças"
            {...field}
            error={!!errors.config?.pieces_size}
            helper={"Tamanho das Peças é obrigatória"}
          >
            {pieces_sizes_arr.map((size, index) => (
              <MenuItem key={index} value={index}>
                {size}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {/* <Input
        {...register("config.pieces_size")}
        name="config.pieces_size"
        type="number"
        label="Tamanho das peças"
        error={!!errors.config?.pieces_size}
        helperText={errors?.config?.pieces_size?.message}
      /> */}
      <Controller
        name="config.timer"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Checkbox {...field} label="Tempo para terminar o jogo" />
        )}
        error={!!errors.config?.timer}
        helperText={errors?.config?.timer?.message}
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
          imagePath: obj.assets.puzzle_image,
          uploading: uploading,
        }}
      />
    </>
  );
};

export default EditPuzzle;
