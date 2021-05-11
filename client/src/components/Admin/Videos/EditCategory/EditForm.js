import React, { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

import Form from "../../../Form/Form";
import MainContainer from "../../../Form/MainContainer";
import Input from "../../../Form/Input";
import UploadImage from "../../../Form/UploadImage";
import SaveButton from "../../../Form/PrimaryButton";
import { Typography, MenuItem } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "../../../Form/SelectInput";

import { schemaCreateNew, schemaEdit } from "./data.schemas";

const EditForm = (props) => {
  const { fields, createNew } = props;
  const history = useHistory();

  const { _id, title, description, thumbnail, fetchQuery } = fields;

  const {
    trigger,
    unregister,
    register,
    handleSubmit,
    setValue,
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
        url: "/api/videos/add-category",
        data: obj,
      }),
    {
      onSettled: () => queryClient.invalidateQueries(fetchQuery),
    }
  );

  const uploadFile = async (e) => {
    trigger("thumbnail_input").then(function (err) {
      console.log(err);
    });
    // if (!!errors.thumbnail_input) {
    //   console.log("erros");
    // }
    // console.log(result);
    // if (result) {
    //   console.log(e.target.name);
    //   console.log(e.target.files[0]);
    //   const form = new FormData();
    //   form.append("image", e.target.files[0]);
    //   uploadImage.mutate({
    //     formData: form,
    //     inputField: e.target.name,
    //   });
    // }
  };

  const uploadImages = async (input) => {
    Object.entries(input).forEach(async ([key, value]) => {
      // verify input files
      if (value instanceof FileList) {
        console.log(key);
        // verify if its a new or not changed input
        if (!value.length) {
          console.log("no file");
          // verify if values exists in database

          // verify if its updated
        } else if (value.length) {
          console.log("file exists");
          const form = new FormData();
          form.append("image", value[0]);
          if (!createNew) {
            // delete old image
            // upload new
          } else {
            // upload new
            console.log("uploading");
            // wait for database
            await axios({
              method: "post",
              url: "/api/upload/image",
              data: form,
              headers: {
                "content-Type": "multipart/form-data",
              },
            })
              .then((res) => {
                console.log(res.data);
                input[key] = { ...res.data };
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      }
    });
    console.log("returning");
    return input;
  };

  const onSubmit = async (userInput) => {
    userInput = await uploadImages(userInput);
    console.log(userInput);
    mutation.mutate(userInput);
  };

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
          description="Imagem do trabalho"
        />
        {displaySave}
      </Form>
    </MainContainer>
  );
};

export default EditForm;
