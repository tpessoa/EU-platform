import React, { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import { verifyImageFileType } from "../../../../globalFuncUtils";

import FormDIV from "../../../../components/Form/Form";
import MainContainer from "../../../../components/Form/MainContainer";
import Input from "../../../../components/Form/Input";
import File from "../../../../components/Form/File";
import SaveButton from "../../../../components/Form/PrimaryButton";
import { Typography } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UploadImages from "../../../Form/Upload/UploadImages";

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
const Form = (props) => {
  const { fields, createPoll, fetchQuery } = props;
  const { title, description, thumbnail, id, tempId } = fields;

  const [uploading, setUploading] = useState(false);

  let URL_str = "";
  if (createPoll) {
    URL_str = `/api/polls/add-poll`;
  } else {
    URL_str = `/api/polls/update-poll/${id}`;
  }
  const queryClient = new useQueryClient();
  const mutation = useMutation((obj) => axios.post(URL_str, obj), {
    onSettled: () => queryClient.invalidateQueries(fetchQuery),
  });

  const uploadImage = useMutation((formData) =>
    axios({
      method: "post",
      url: "/api/upload/image",
      data: formData,
      headers: {
        "content-Type": "multipart/form-data",
      },
    })
  );

  const onSubmit = (data) => {
    setUploading(true);
    const arr = [data.thumbnail];
    const form = new FormData();
    form.append("image", data.thumbnail[0]);
    console.log(data.thumbnail[0]);
    uploadImage.mutate(form);
    if (uploadImage.isSuccess) {
      console.log(uploadImage.data.data);
      data.thumbnail = uploadImage.data.data;
    }

    const updatedData = { ...data };
    mutation.mutate(updatedData);
    if (mutation.isSuccess) {
      console.log(mutation.data.data);
    }
    setUploading(false);
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

  let displaySave = "";
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
    displaySave = (
      <>
        <SaveButton disabled>Guardar</SaveButton>
      </>
    );
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
          description="Imagem de capa do jogo"
          imagepath={thumbnail}
          uploading={uploading}
        />
        <SaveButton>Guardar</SaveButton>
      </FormDIV>
    </MainContainer>
  );
};

export default Form;
