import React, { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import { verifyImageFileType } from "../../../../globalFuncUtils";

import FormDIV from "../../../Form/Form";
import MainContainer from "../../../Form/MainContainer";
import Input from "../../../Form/Input";
import File from "../../../Form/File";
import SaveButton from "../../../Form/PrimaryButton";
import { Typography } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: yup
    .mixed()
    .test("null", "Deve inserir um ficheiro", (value) => {
      if (value.length > 0) return true;
      return false;
    })
    .test(
      "fileType",
      "Tipo de ficheiro não suportado, apenas .jpg, .jpeg e .png",
      (value) => {
        if (value.length === 0) return false;
        return verifyImageFileType(value[0].type);
      }
    )
    .test("fileSize", "Ficheiro muito grande, 5 MB Máx.", (value) => {
      // if (value[0].length === 0) return false;
      // if (!value.length) return true; // attachment is optional
      if (value.length === 0) return false;
      return value[0].size <= 5 * 1024 * 1024; // 8MB
    }),
});

let COUNTER = 0;

const Form = (props) => {
  const { fields, fetchQuery } = props;
  const { title, description, thumbnail, id } = fields;
  const history = useHistory();

  const [uploading, setUploading] = useState(false);

  const queryClient = new useQueryClient();
  const mutation = useMutation(
    (obj) => axios.post(`/api/polls/add-poll`, obj),
    {
      onSettled: () => queryClient.invalidateQueries(fetchQuery),
    }
  );

  const uploadImage = useMutation(
    (variables) =>
      axios({
        method: "post",
        url: "/api/upload/image",
        data: variables.formData,
        headers: {
          "content-Type": "multipart/form-data",
        },
      }),
    {
      onSuccess: (result, { userInput, type, size }) => {
        userInput[type] = { ...result.data };
        if (++COUNTER === size) {
          COUNTER = 0;
          console.log(userInput);
          setUploading(false);
          mutation.mutate(userInput);
        }
      },
    }
  );

  const performImageNormalization = (userInput, arr_types, size) => {
    for (let i = 0; i < size; i++) {
      const type = arr_types[i];
      const form = new FormData();
      form.append("image", userInput[type][0]);
      uploadImage.mutate({
        formData: form,
        userInput: userInput,
        type: type,
        size: size,
      });
    }
  };

  const onSubmit = (userInput) => {
    const arr_data = [userInput.thumbnail[0]];
    const arr_types = ["thumbnail"];
    const size = arr_data.length;
    setUploading(true);
    performImageNormalization(userInput, arr_types, size);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: title,
      description: description,
    },
  });

  let displaySave = <SaveButton>Guardar</SaveButton>;
  if (mutation.isLoading) {
    displaySave = <Loading />;
  } else if (mutation.isError) {
    displaySave = (
      <>
        <p>Ocorreu um erro</p>
        <SaveButton disabled>Guardar</SaveButton>
        <Error error={mutation.error} />
      </>
    );
  } else if (mutation.isSuccess) {
    console.log(mutation.data.data);
    history.goBack();
  }

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Editar Votação
      </Typography>
      <FormDIV onSubmit={handleSubmit(onSubmit)}>
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
        <File
          {...register("thumbnail")}
          name="thumbnail"
          type="file"
          error={!!errors.thumbnail}
          helperText={errors?.thumbnail?.message}
          description="Imagem de capa da votação"
          image={{
            imagePath: thumbnail,
            uploading: uploading,
          }}
        />

        {displaySave}
      </FormDIV>
    </MainContainer>
  );
};

export default Form;
