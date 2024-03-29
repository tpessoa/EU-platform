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
import { Typography, MenuItem } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";

import { uploadImages } from "../../../../hooks/useUpload";

import * as yup from "yup";
import {
  getRequiredFileSchema,
  getOptionalFileSchema,
} from "../../../Form/data.schemas";

export const schemaCreateNew = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: getRequiredFileSchema(),
});

export const schemaEdit = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: getOptionalFileSchema(),
});

const EditForm = (props) => {
  const { fields, createNew } = props;
  const history = useHistory();

  const { _id, title, description, thumbnail, fetchQuery } = fields;

  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createNew ? schemaCreateNew : schemaEdit),
    defaultValues: {
      title: title,
      description: description,
    },
  });

  const queryClient = new useQueryClient();
  const mutation = useMutation(
    (obj) =>
      axios({
        method: "post",
        url: "/api/videos/save-category",
        data: obj,
      }),
    {
      onSettled: () => queryClient.invalidateQueries(fetchQuery),
      onSuccess: (result) => {
        setUploading(false);
        console.log(result);
        history.goBack();
      },
    }
  );

  const onSubmit = async (userInput) => {
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
          description="Imagem da categoria"
          image={{
            imagePath: thumbnail,
            uploading: uploading,
          }}
        />
        {displaySave}
      </Form>
    </MainContainer>
  );
};

export default EditForm;
