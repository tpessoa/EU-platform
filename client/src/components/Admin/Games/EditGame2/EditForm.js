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

import Form from "../../../Form/Form";
import MainContainer from "../../../Form/MainContainer";
import Input from "../../../Form/Input";
import UploadImage from "../../../Form/UploadImage";
import SaveButton from "../../../Form/PrimaryButton";
import { Typography, MenuItem } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";

import { setCreateNew, schemaPuzzle, schemaQuiz } from "./games.schemas";
import { uploadImages } from "../../../../hooks/useUpload";

const EditForm = (props) => {
  const history = useHistory();
  const { fields, createNew, fetchQuery, game } = props;
  const {
    _id,
    game_ref_name,
    title,
    description,
    thumbnail,
    config,
    assets,
  } = fields;

  const [uploading, setUploading] = useState(false);
  setCreateNew(createNew);

  let defVals = {};
  let gameSchema;
  if (game === "puzzle") {
    defVals = {
      title: title,
      description: description,
      config: {
        pieces_size: config.pieces_size,
        background_puzzle_image: config.background_puzzle_image,
        piece_position_helper: config.piece_position_helper,
        move_pieces_freely: config.move_pieces_freely,
        time_to_complete: config.time_to_complete,
        time: config.time,
      },
    };
    gameSchema = schemaPuzzle;
  } else if (game === "quiz") {
    defVals = {
      title: title,
      description: description,
      config: {
        questions: config.questions,
        time: config.timer,
        time_to_complete: config.time_to_resp_question,
      },
    };
    gameSchema = schemaQuiz;
  }

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

  const onSubmit = async (userInput) => {
    // setUploading(true);
    let newUserInput = { ...userInput, game_ref_name: game_ref_name };
    if (!createNew) {
      newUserInput = {
        _id: _id,
        ...newUserInput,
      };
    }
    console.log(newUserInput);
    // console.log(newUserInput);

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

    console.log(newUserInputUploaded);
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
        fields={fields}
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
  }
  let displaySave = <SaveButton>Guardar</SaveButton>;
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
