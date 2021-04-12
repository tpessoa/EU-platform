import React from "react";
import axios from "axios";
import { useMutation } from "react-query";

import styled from "styled-components";

import TextField from "../../../Input/TextField/TextFieldNew";
import ListField from "../../../Input/ListField/ListFielNew";
import SaveBtn from "../../Buttons/Save";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import Typography from "@material-ui/core/Typography";

const EditForm = (props) => {
  const { fields, categories, createCategory } = props;

  const { categoryId, title, description, url, id } = fields;

  const inputChangeHandler = (userInput, ref) => {
    if (ref === "categoryId") {
      fields[ref] = categories[userInput]._id;
    } else {
      fields[ref] = userInput;
    }
  };

  let URL_str = "";
  if (createCategory) {
    URL_str = `/api/videos/video/add`;
  } else {
    URL_str = `/api/videos/video/${id}`;
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
          {`Editar vídeo ${title}`}
        </Typography>
        <CategoryWrapper>
          <ListField
            label={"Categoria"}
            field_ref={"categoryId"}
            arr={categories}
            objElem={"title"}
            value={categoryId}
            parentChangeHandler={inputChangeHandler}
          />
        </CategoryWrapper>
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
        <TextField
          field_ref={"url"}
          label={"Endereço do youtube"}
          value={url}
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

const CategoryWrapper = styled.div`
  width: 40%;
`;
