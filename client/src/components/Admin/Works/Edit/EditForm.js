import React, { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import Form from "../../../Form/Form";
import MainContainer from "../../../Form/MainContainer";
import Input from "../../../Form/Input";
import UploadImage from "../../../Form/UploadImage";
import SaveButton from "../../../Form/PrimaryButton";
import Select from "../../../Form/SelectInput";
import { Typography, MenuItem } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";

import { uploadImages } from "../../../../hooks/useUpload";

import * as yup from "yup";
import {
  getRequiredFileSchema,
  getOptionalFileSchema,
} from "../../../Form/data.schemas";
import { usePolls } from "../../../../hooks/usePolls";

export const schemaCreateNew = yup.object().shape({
  poll_id: yup
    .number()
    .moreThan(-1, "Categoria de votação é obrigatória")
    .required(),
  title: yup.string().required(),
  description: yup.string().required(),
  photo: getRequiredFileSchema(),
});

export const schemaEdit = yup.object().shape({
  poll_id: yup
    .number()
    .required()
    .typeError("Categoria de votação é obrigatória")
    .moreThan(-1),
  title: yup.string().required(),
  description: yup.string().required(),
  photo: getOptionalFileSchema(),
});

const EditForm = (props) => {
  const { fields, createNew, fetchQuery } = props;
  const history = useHistory();
  const { _id, poll_id, title, description, photo } = fields;
  const polls = usePolls();

  const [uploading, setUploading] = useState(false);

  const poll_id_index = polls.isSuccess
    ? polls.data.findIndex((index) => index._id === poll_id)
    : -1;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createNew ? schemaCreateNew : schemaEdit),
    defaultValues: {
      poll_id: poll_id_index,
      title: title,
      description: description,
    },
  });

  const queryClient = new useQueryClient();
  const mutation = useMutation(
    (obj) =>
      axios({
        method: "post",
        url: "/api/polls/save-work",
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
    userInput.poll_id = polls.data[userInput.poll_id]._id;
    let newUserInput = { ...userInput };
    if (!createNew) {
      newUserInput = {
        ...userInput,
        _id: _id,
      };
    }
    setUploading(true);
    const newUserInputUploaded = await uploadImages(
      newUserInput,
      fields,
      createNew
    );
    console.log(newUserInputUploaded);
    mutation.mutate(newUserInputUploaded);
  };

  // console.log(mutation);

  let displaySave = <SaveButton>Guardar</SaveButton>;
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Editar Categoria
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="poll_id"
          control={control}
          defaultValue={false}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              label="Categoria de votação"
              {...field}
              error={!!errors.poll_id}
              helpertext={errors?.poll_id?.message}
            >
              {polls.isSuccess &&
                polls.data.map((poll, index) => (
                  <MenuItem key={index} value={index}>
                    {poll.title}
                  </MenuItem>
                ))}
            </Select>
          )}
        />
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
          {...register("photo")}
          name="photo"
          type="file"
          error={!!errors.photo}
          helperText={errors?.photo?.message}
          description="Imagem do trabalho"
          image={{
            imagePath: photo,
            uploading: uploading,
          }}
        />
        {displaySave}
      </Form>
    </MainContainer>
  );
};

export default EditForm;
