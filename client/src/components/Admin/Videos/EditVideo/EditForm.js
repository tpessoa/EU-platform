import React, { useState, useCallback } from "react";
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
  const { fields, categories, createVideo } = props;
  const { categoryId, title, description, url, id } = { ...fields };
  const oldTitle = fields.title;

  const [saveErrorMessage, setSaveErrorMessage] = useState("");
  const [fieldsUpdated, setFieldsUpdated] = useState(false);

  let URL_str = "";
  if (createVideo) {
    URL_str = `/api/videos/video/add`;
  } else {
    URL_str = `/api/videos/video/${id}`;
  }
  const mutation = useMutation((obj) => axios.post(URL_str, obj));

  const fieldUpdatedHandler = useCallback(() => {
    if (mutation.isSuccess && createVideo) {
      console.log("botao inativo");
      setFieldsUpdated(false);
    } else {
      setFieldsUpdated(true);
    }
  }, [fields]);

  const inputChangeHandler = (userInput, ref) => {
    if (ref === "categoryId") {
      fields[ref] = categories[userInput]._id;
    } else {
      fields[ref] = userInput;
    }
    fieldUpdatedHandler();
    // console.log(userInput, ref);
  };

  const performSave = () => {
    const newObj = { ...fields };
    console.log(newObj);
    let validated = false;

    if (
      newObj.categoryId !== "" &&
      newObj.title !== "" &&
      newObj.description !== "" &&
      newObj.url !== ""
    ) {
      validated = true;
    }

    if (validated) {
      mutation.mutate(newObj);
      setSaveErrorMessage("");
    } else {
      console.log("faulty params");
      setSaveErrorMessage("Faltam preencher campos!");
    }

    setFieldsUpdated(false);
  };

  let displaySave = "";
  if (mutation.isLoading) {
    displaySave = <Loading />;
  } else if (mutation.isError) {
    displaySave = <Error error={mutation.error} />;
  } else {
    displaySave = (
      <>
        <p>{saveErrorMessage}</p>
        <SaveBtn
          clickHandler={performSave}
          saved={mutation.isSuccess && !fieldsUpdated}
        >
          Guardar
        </SaveBtn>
      </>
    );
  }

  const getCategoryIdPos = categories.findIndex(
    (elem) => elem._id === categoryId
  );

  return (
    <Container>
      <Wrapper>
        <Typography variant="h6" gutterBottom>
          {`Editar vídeo ${oldTitle}`}
        </Typography>
        <CategoryWrapper>
          <ListField
            label={"Categoria"}
            field_ref={"categoryId"}
            arr={categories}
            objElem={"title"}
            value={getCategoryIdPos}
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
