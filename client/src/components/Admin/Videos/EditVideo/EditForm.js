import React, { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

import FormDIV from "../../../Form/Form";
import MainContainer from "../../../Form/MainContainer";
import Input from "../../../Form/Input";
import SaveButton from "../../../Form/PrimaryButton";
import { Typography, MenuItem } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "../../../Form/SelectInput";

import { useCategories } from "../../../../hooks/useVideos";
import * as yup from "yup";

export const schemaCreateNew = yup.object().shape({
  category_id: yup
    .number()
    .required("categoria de vídeo é obrigatória")
    .moreThan(-1),
  url: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
});

export const schemaEdit = yup.object().shape({
  category_id: yup
    .number()
    .required("categoria de vídeo é obrigatória")
    .moreThan(-1),
  url: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
});

const EditForm = (props) => {
  const history = useHistory();
  const { fields, createNew, fetchQuery } = props;
  const { _id, category_id, title, description, url } = fields;
  const categories = useCategories();

  const [uploading, setUploading] = useState(false);

  const queryClient = new useQueryClient();
  const mutation = useMutation(
    (obj) =>
      axios({
        method: "post",
        url: "/api/videos/save-video",
        data: obj,
      }),
    {
      onSettled: () => queryClient.invalidateQueries(fetchQuery),
      onSuccess: () => {
        setUploading(false);
        history.goBack();
      },
    }
  );

  let displaySave = <SaveButton>Guardar</SaveButton>;
  if (mutation.isLoading || categories.isLoading) {
    displaySave = <Loading />;
  } else if (mutation.isError || categories.isError) {
    displaySave = (
      <>
        <p>Ocorreu um erro</p>
        <SaveButton disabled>Guardar</SaveButton>
        <Error error={mutation.error} />
      </>
    );
  }

  const category_id_index = categories.isSuccess
    ? categories.data.findIndex((index) => index._id === category_id)
    : -1;
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createNew ? schemaCreateNew : schemaEdit),
    defaultValues: {
      category_id: category_id_index,
      title: title,
      description: description,
      url: url,
    },
  });

  const onSubmit = (userInput) => {
    userInput.category_id = categories.data[userInput.category_id]._id;
    console.log(userInput);
    let newUserInput = "";
    if (createNew) {
      newUserInput = {
        ...userInput,
      };
    } else {
      newUserInput = {
        ...userInput,
        _id: _id,
      };
    }

    setUploading(true);
    mutation.mutate(newUserInput);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Editar Trabalho
      </Typography>
      <FormDIV onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="category_id"
          control={control}
          defaultValue={false}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              label="Categoria de videos"
              {...field}
              error={!!errors.category_id}
              helper={"Categoria de videos é obrigatória"}
            >
              {categories.isSuccess &&
                categories.data.map((category, index) => (
                  <MenuItem key={index} value={index}>
                    {category.title}
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
        <Input
          {...register("url")}
          name="url"
          type="text"
          label="URL do vídeo"
          multiline
          error={!!errors.url}
          helperText={errors?.url?.message}
        />

        {displaySave}
      </FormDIV>
    </MainContainer>
  );
};

export default EditForm;
