import React, { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import TextField from "../../../Input/TextField/TextFieldNew";
import ImageField from "../../ImageField";
import SaveBtn from "../../Buttons/Save";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

import GetImages from "../../UploadImage/GetImages";

import Typography from "@material-ui/core/Typography";

const EditForm = (props) => {
  const { fields, createCategory } = props;

  const { title, description, thumbnail, fetchQuery, id, tempId } = fields;

  const [fieldsUpdated, setFieldsUpdated] = useState(false);
  const fieldUpdatedHandler = useCallback(() => {
    if (mutation.isSuccess && createCategory) {
      console.log("botao inativo");
      setFieldsUpdated(false);
    } else {
      setFieldsUpdated(true);
    }
  }, [fields]);

  let URL_str = "";
  if (createCategory) {
    URL_str = `/api/videos/categories/add`;
  } else {
    URL_str = `/api/videos/categories/${id}`;
  }
  const queryClient = new useQueryClient();
  const mutation = useMutation((obj) => axios.post(URL_str, obj), {
    onSettled: () => queryClient.invalidateQueries(fetchQuery),
  });

  const inputChangeHandler = (userInput, ref) => {
    // console.log(userInput);
    // console.log(ref);
    fields[ref] = userInput;

    fieldUpdatedHandler();
  };

  const performSave = () => {
    const newObj = { ...fields };
    console.log(newObj);

    mutation.mutate(newObj);

    setFieldsUpdated(false);
  };

  let displaySave = "";
  if (mutation.isLoading) {
    displaySave = <Loading />;
  } else if (mutation.isError) {
    displaySave = <Error error={mutation.error} />;
  } else if (mutation.isSuccess) {
    // if there's a tempId update the id in the images collections
    let update;
    if (tempId != null) {
      // swap tempId for data._id
      update = (
        <GetImages tempId={tempId} permanentId={mutation.data.data._id} />
      );
    }
    displaySave = (
      <>
        {update}
        <SaveBtn
          clickHandler={performSave}
          saved={mutation.isSuccess && !fieldsUpdated}
        >
          Guardar
        </SaveBtn>
      </>
    );
  } else {
    displaySave = (
      <SaveBtn clickHandler={performSave} saved={false}>
        Guardar
      </SaveBtn>
    );
  }

  return (
    <Container>
      <Wrapper>
        <Typography variant="h6" gutterBottom>
          {`Editar categoria ${fields.title}`}
        </Typography>
        <TextField
          field_ref={"title"}
          label={"Título"}
          value={title}
          parentChangeHandler={inputChangeHandler}
        />
        <TextField
          field_ref={"description"}
          label={"Descrição"}
          value={description}
          parentChangeHandler={inputChangeHandler}
        />
        <ImageField
          field_ref={"thumbnail"}
          title={"Image do ícon da categoria"}
          imageObj={thumbnail}
          parentChangeHandler={inputChangeHandler}
          linkedObj={tempId ? tempId : id}
        />
        {displaySave}
      </Wrapper>
    </Container>
  );
};

export default EditForm;

const Container = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
