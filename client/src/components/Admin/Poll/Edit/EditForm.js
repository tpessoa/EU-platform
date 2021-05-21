import React, { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import Form from "../../../Form/Form";
import MainContainer from "../../../Form/MainContainer";
import Input from "../../../Form/InputNotPaper";
import UploadImage from "../../../Form/UploadImage";
import SaveButton from "../../../Form/PrimaryButton";
import { Typography, MenuItem, Paper } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";

import { uploadImages } from "../../../../hooks/useUpload";

import * as yup from "yup";
import {
  getRequiredFileSchema,
  getOptionalFileSchema,
} from "../../../Form/data.schemas";
import CheckBox from "../../../Form/Checkbox";

const useStyles = makeStyles((theme) => ({
  input: {
    padding: theme.spacing(0, 1, 0, 1),
    margin: theme.spacing(1, 0, 1, 0),
  },
}));

const EditForm = (props) => {
  const classes = useStyles();
  const { fields, createNew } = props;
  const history = useHistory();

  const { _id, title, description, ended, thumbnail, fetchQuery } = fields;

  const [uploading, setUploading] = useState(false);

  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: title,
      description: description,
      ended: ended,
    },
  });

  const queryClient = new useQueryClient();
  const mutation = useMutation(
    (obj) =>
      axios({
        method: "post",
        url: "/api/polls/save-poll",
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

  let displaySave = <SaveButton>Guardar</SaveButton>;
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Editar Categoria
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Paper className={classes.input}>
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
            name="ended"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CheckBox {...field} label="Encerrar votação" />
            )}
          />
        </Paper>
        <UploadImage
          {...register("thumbnail")}
          name="thumbnail"
          type="file"
          error={!!errors.thumbnail}
          helperText={errors?.thumbnail?.message}
          description="Imagem da votação"
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
