import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import TextInput from "../../../Input/TextField/TextFieldNew";
import ImageField from "../../ImageField";
import Save from "../../Buttons/Save";
import Back from "../../Buttons/Back";

const EditCategory = () => {
  const { catId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState({
    id: "defaultImage",
    path: "",
    server_path: "",
  });

  const [createGame, setCreateGame] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (catId === "createNew") {
      setCreateGame(true);
    } else {
      setCreateGame(false);
      axios
        .get(`/api/videos/categories/${catId}`)
        .then(function (res) {
          // console.log(res.data);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setThumbnail(res.data.thumbnail);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [catId]);

  const textChangeHandler = (userInput, ref) => {
    if (ref === "title") {
      setTitle(userInput);
    } else if (ref === "description") {
      setDescription(userInput);
    }
  };

  const imageChangeHandler = (obj, ref) => {
    setThumbnail({ ...obj });
  };

  const performSave = (ev) => {
    console.log("saving");
    ev.preventDefault();
    // mount object to send to database
    const categorieObj = {
      category_ref_id: 1,
      category_ref_name: "video",
      title: title,
      description: description,
      thumbnail: thumbnail,
    };
    console.log(categorieObj);

    // validate the params

    let URL_str = "";
    if (createGame) {
      URL_str = `/api/videos/categories/add`;
    } else {
      URL_str = `/api/videos/categories/${catId}`;
    }

    // post them to database
    axios
      .post(URL_str, { obj: categorieObj })
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // display feedback
    setRedirect(true);
  };

  let displayRedirect = "";
  if (redirect) {
    let stateObj = {};
    if (createGame) {
      stateObj = { info: "success", message: "Categoria criada com sucesso" };
      // stateObj ={ info: "error", message: "Ocorreu um erro ao criar a categoria" }
    } else {
      stateObj = { info: "success", message: "Categoria alterada com sucesso" };
      // stateObj ={ info: "error", message: "Ocorreu um erro ao alterar a categoria" }
    }
    displayRedirect = (
      <Redirect
        to={{
          pathname: "/admin/videoCategories",
          state: stateObj,
        }}
      />
    );
  }

  return (
    <Container>
      <EditWrapper>
        <Back url={"/admin/videoCategories"}>Voltar</Back>
        <TextInput
          field_ref={"title"}
          label={"Título"}
          value={title}
          parentChangeHandler={textChangeHandler}
        />
        <TextInput
          field_ref={"description"}
          label={"Descrição"}
          value={description}
          parentChangeHandler={textChangeHandler}
        />
        <ImageField
          field_ref={"thumbnail"}
          imageObj={thumbnail}
          parentChangeHandler={imageChangeHandler}
        />
        <Save clickHandler={performSave}>Guardar</Save>
      </EditWrapper>
      {displayRedirect}
    </Container>
  );
};

export default EditCategory;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const EditWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  margin: 1rem;
`;
