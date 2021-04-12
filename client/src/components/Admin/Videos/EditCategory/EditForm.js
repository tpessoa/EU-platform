import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useMutation } from "react-query";

import TextField from "../../../Input/TextField/TextFieldNew";
import ImageField from "../../ImageField";
import SaveBtn from "../../Buttons/Save";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

import Typography from "@material-ui/core/Typography";

const EditForm = (props) => {
  const { fields, createCategory } = props;

  const { title, description, thumbnail, id } = fields;

  const inputChangeHandler = (userInput, ref) => {
    // console.log(userInput);
    // console.log(ref);
    fields[ref] = userInput;
  };

  let URL_str = "";
  if (createCategory) {
    URL_str = `/api/videos/categories/add`;
  } else {
    URL_str = `/api/videos/categories/${id}`;
  }
  const mutation = useMutation((obj) => axios.post(URL_str, obj));

  const performSave = () => {
    const newObj = { ...fields };
    console.log(newObj);

    mutation.mutate(newObj);
  };

  let displaySave = "";
  if (mutation.isLoading) {
    displaySave = <Loading />;
  } else if (mutation.isError) {
    displaySave = <Error error={mutation.error} />;
  } else {
    displaySave = (
      <SaveBtn clickHandler={performSave} saved={mutation.isSuccess}>
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
          imageObj={thumbnail}
          parentChangeHandler={inputChangeHandler}
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
