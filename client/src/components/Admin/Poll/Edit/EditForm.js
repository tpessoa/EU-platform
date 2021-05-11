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
    // .test("null", "Deve inserir um ficheiro", (value) => {
    //   if (value.length > 0) return true;
    //   return false;
    // })
    .test(
      "fileType",
      "Tipo de ficheiro não suportado, apenas .jpg, .jpeg e .png",
      (value) => {
        if (!value.length) return true; // attachment is optional
        return verifyImageFileType(value[0].type);
      }
    )
    .test("fileSize", "Ficheiro muito grande, 5 MB Máx.", (value) => {
      if (!value.length) return true; // attachment is optional
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
    (obj) => axios.post(`/api/polls/update-poll`, obj),
    {
      onSettled: () => queryClient.invalidateQueries(fetchQuery),
    }
  );

  const deleteImage = useMutation((variables) =>
    axios({
      method: "delete",
      url: "/api/upload/image",
      data: { image: variables.image },
    })
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
        // console.log(userInput[type]);

        userInput[type] = { ...result.data };
        if (++COUNTER === size) {
          COUNTER = 0;
          // console.log(userInput);
          setUploading(false);
          mutation.mutate(userInput);
        }
      },
    }
  );

  const performImageNormalization = (userInput, arr_types) => {
    const size = arr_types.length;
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
      console.log(fields[type]);
      // delete previous image from server
      deleteImage.mutate({ image: fields[type] });
    }
  };

  const filesToUploadInfo = (userInput, arr_types) => {
    let upload = [];
    let update = [];
    for (let i = 0; i < arr_types.length; i++) {
      const type = arr_types[i];
      if (userInput[type].length) {
        upload.push(type);
      } else {
        update.push(type);
      }
    }
    return { upload, update };
  };

  const updateForm = (userInput, types) => {
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      userInput[type] = fields[type];
    }
    return userInput;
  };

  const onSubmit = (userInput) => {
    let newUserInput = {
      ...userInput,
      _id: id,
    };

    setUploading(true);

    let arr_types = ["thumbnail"];

    const info = filesToUploadInfo(newUserInput, arr_types);
    const arr_with_types_to_upload = info.upload;
    const arr_with_types_to_update = info.update;

    newUserInput = updateForm(newUserInput, arr_with_types_to_update);

    // do normalization of submitted user input if there are files to upload
    // i.e wait for the database upload ALL images
    if (arr_with_types_to_upload.length > 0) {
      performImageNormalization(newUserInput, arr_with_types_to_upload);
    } else {
      setUploading(false);
      mutation.mutate(newUserInput);
    }
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

  if (deleteImage.isSuccess) {
    console.log(deleteImage.data.data);
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
