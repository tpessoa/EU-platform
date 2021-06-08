import React, { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import BackBtn from "../../Buttons/Back";
import EditPuzzle from "./Puzzle/EditPuzzle";
import EditQuiz from "./Quiz/EditQuiz";
import EditWordSearch from "./WordSearch/EditWordSearch";
import EditMemory from "./Memory/EditMemory";

import Form from "../../../Form/Form";
import MainContainer from "../../../Form/MainContainer";
import Input from "../../../Form/Input";
import UploadImage from "../../../Form/UploadImage";
import SaveButton from "../../../Form/PrimaryButton";
import Select from "../../../Form/SelectInput";
import { Typography, MenuItem } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";

import { uploadImages } from "../../../../hooks/useUpload";
import { setCreateNew } from "./games.schemas";
import { getDefValues, getSchemas } from "./games.getData";
import EditInteractiveMaps from "./InteractiveMaps/EditInteractiveMaps";
import EditCrossWords from "./CrossWords/EditCrossWords";
import EditColorGame from "./ColorGame/EditColorGame";

const difficulty_arr = ["Fácil", "Médio", "Difícil"];

const EditForm = (props) => {
  const history = useHistory();
  const { fields, createNew, fetchQuery, game } = props;
  const { _id, game_ref_name, title, description, thumbnail, config, assets } =
    fields;

  const [uploading, setUploading] = useState(false);
  setCreateNew(createNew);
  let defVals = getDefValues(game, fields);
  let gameSchema = getSchemas(game);

  // console.log(defVals);
  // console.log(config);

  const {
    register,
    unregister,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(gameSchema),
    defaultValues: defVals,
  });

  const queryClient = new useQueryClient();
  const mutation = useMutation(
    (obj) =>
      axios({
        method: "post",
        url: "/api/games/save-game",
        data: obj,
      }),
    {
      onSettled: () => queryClient.invalidateQueries(fetchQuery),
      onSuccess: (result) => {
        setUploading(false);
        // console.log(result);
        history.goBack();
      },
    }
  );
  const resetStats = useMutation(
    async (obj) =>
      await axios({
        method: "post",
        url: "/api/games/statistics-reset",
        data: { gameId: obj },
      }),
    {
      onSettled: () => queryClient.invalidateQueries(["gamesStats"]),
    }
  );

  const onSubmit = async (userInput) => {
    setUploading(true);
    console.log(userInput.config.colors);
    let newUserInput = { ...userInput, game_ref_name: game_ref_name };
    if (!createNew) {
      newUserInput = {
        _id: _id,
        ...newUserInput,
      };
    }
    console.log(newUserInput);

    const newUserInputUploaded = await uploadImages(
      newUserInput,
      fields,
      createNew
    );
    newUserInputUploaded.config = await uploadImages(
      newUserInput.config,
      fields.config,
      createNew
    );
    newUserInputUploaded.assets = await uploadImages(
      newUserInput.assets,
      fields.assets,
      createNew
    );

    if (game_ref_name === "memory") {
      for (let i = 0; i < newUserInput.assets.front_cards.length; i++) {
        newUserInputUploaded.assets.front_cards[i] = await uploadImages(
          newUserInput.assets.front_cards[i],
          fields.assets.front_cards[i],
          createNew
        );
      }
    }

    console.log(newUserInputUploaded);

    // reset stats to avoid miss data
    if (!createNew) resetStats.mutate(_id);
    mutation.mutate(newUserInputUploaded);
  };

  let displaySpecificForm = "";
  if (game === "puzzle") {
    displaySpecificForm = (
      <EditPuzzle
        errors={errors}
        register={register}
        control={control}
        watch={watch}
        obj={fields}
        uploading={uploading}
      />
    );
  } else if (game === "colorGame") {
    displaySpecificForm = (
      <EditColorGame
        setValue={setValue}
        errors={errors}
        unregister={unregister}
        register={register}
        control={control}
        watch={watch}
        obj={fields}
        uploading={uploading}
      />
    );
  } else if (game === "wordSearch") {
    displaySpecificForm = (
      <EditWordSearch
        setValue={setValue}
        errors={errors}
        unregister={unregister}
        register={register}
        control={control}
        watch={watch}
        obj={fields}
        uploading={uploading}
      />
    );
  } else if (game === "quiz") {
    displaySpecificForm = (
      <EditQuiz
        setValue={setValue}
        errors={errors}
        unregister={unregister}
        register={register}
        control={control}
        watch={watch}
        obj={fields}
        uploading={uploading}
      />
    );
  } else if (game === "memory") {
    displaySpecificForm = (
      <EditMemory
        setValue={setValue}
        errors={errors}
        unregister={unregister}
        register={register}
        control={control}
        watch={watch}
        obj={fields}
        uploading={uploading}
        createNew={createNew}
      />
    );
  } else if (game === "interactiveMaps") {
    displaySpecificForm = (
      <EditInteractiveMaps
        setValue={setValue}
        errors={errors}
        unregister={unregister}
        register={register}
        control={control}
        watch={watch}
        obj={fields}
        uploading={uploading}
      />
    );
  } else if (game === "crossWords") {
    displaySpecificForm = (
      <EditCrossWords
        setValue={setValue}
        errors={errors}
        unregister={unregister}
        register={register}
        control={control}
        watch={watch}
        obj={fields}
        uploading={uploading}
      />
    );
  }

  let displaySave = mutation.isLoading ? (
    <Loading />
  ) : (
    <SaveButton>Guardar</SaveButton>
  );
  let displayTopLabel = createNew ? "Criar jogo" : `Editar ${title}`;
  return (
    <MainContainer>
      <BackBtn>Voltar</BackBtn>
      <Typography component="h2" variant="h5">
        {displayTopLabel}
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("title")}
          name="title"
          type="text"
          label="Título"
          error={!!errors.title}
          helperText={errors?.title?.message}
        />
        <Input
          {...register("description")}
          name="description"
          type="text"
          label="Descrição"
          multiline
          error={!!errors.description}
          helperText={errors?.description?.message}
        />
        <Controller
          name="difficulty"
          control={control}
          defaultValue={false}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              label="Dificuldade"
              {...field}
              error={!!errors.config?.pieces_size}
              helper={"Este campo é obrigatório"}
            >
              {difficulty_arr.map((size, index) => (
                <MenuItem key={index} value={index}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <UploadImage
          {...register("thumbnail")}
          name="thumbnail"
          type="file"
          error={!!errors.thumbnail}
          helperText={errors?.thumbnail?.message}
          description={`Thumbnail ${title}`}
          image={{
            imagePath: thumbnail,
            uploading: uploading,
          }}
        />
        {displaySpecificForm}
        {displaySave}
      </Form>
    </MainContainer>
  );
};

export default EditForm;
