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
import File from "../../../Form/File";
import SaveButton from "../../../Form/PrimaryButton";
import { Typography, MenuItem } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "../../../Form/SelectInput";

import { schemaCreateNew, schemaEdit } from "./data.schemas";
import { usePolls } from "../../../../hooks/usePolls";
import { updateForm, filesToUploadInfo } from "../../../../globalFuncUtils";

let COUNTER = 0;

const EditForm = (props) => {
  const { fields, createNew, fetchQuery } = props;
  const { _id, title, description, photo, poll_id } = fields;
  const history = useHistory();
  // custom hooks
  const polls = usePolls();

  const [uploading, setUploading] = useState(false);

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

  const onSubmit = (userInput) => {
    userInput.poll_id = polls.data[userInput.poll_id]._id;
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
    const arr_types = ["photo"];
    const info = filesToUploadInfo(newUserInput, arr_types);

    const arr_with_types_to_upload = info.upload;
    const arr_with_types_to_update = info.update;
    newUserInput = updateForm(newUserInput, arr_with_types_to_update, fields);

    // do normalization of submitted user input if there are files to upload
    // i.e wait for the database upload ALL images
    if (arr_with_types_to_upload.length > 0 || createNew) {
      console.log("uploading images");
      performImageNormalization(newUserInput, arr_with_types_to_upload);
    } else {
      console.log("not uploading images");
      setUploading(false);
      mutation.mutate(newUserInput);
    }
  };

  let displaySave = <SaveButton>Guardar</SaveButton>;
  if (mutation.isLoading || polls.isLoading) {
    displaySave = <Loading />;
  } else if (mutation.isError || polls.isError) {
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

  const poll_id_index = polls.isSuccess
    ? polls.data.findIndex((index) => index._id === poll_id)
    : 0;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createNew ? schemaCreateNew : schemaEdit),
    defaultValues: {
      title: title,
      description: description,
      poll_id: poll_id_index,
    },
  });

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Editar Trabalho
      </Typography>
      <FormDIV onSubmit={handleSubmit(onSubmit)}>
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
              helper={"Categoria de votação é obrigatória"}
            >
              {polls.isSuccess &&
                polls.data.map((category, index) => (
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
        <File
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
          onChange={(e) => {
            const value = e.target.value;
            console.log(e);
          }}
        />
        {displaySave}
      </FormDIV>
    </MainContainer>
  );
};

export default EditForm;
