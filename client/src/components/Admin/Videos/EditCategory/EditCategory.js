import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import TextInput from "../../../Input/TextField/TextField";
import ImageField from "../../ImageField";
import Save from "../../Buttons/Save";
import Back from "../../Buttons/Back";

const EditCategory = () => {
  const { gameRef } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idField = query.get("id");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState({
    id: "defaultImage",
    path: "",
    server_path: "",
  });

  const [createGame, setCreateGame] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (idField === "createNew") {
      setCreateGame(true);
    } else {
      setCreateGame(false);
      axios
        .get(`/api/videos/categories/${idField}`)
        .then(function (res) {
          console.log(res.data);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setThumbnail(res.data.thumbnail);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [gameRef || idField]);

  const textChangeHandler = (ev, ref) => {
    const userInput = ev.target.value;

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
      URL_str = `/api/videos/categories/${idField}`;
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
    setSuccess(true);
  };

  return (
    <Container>
      <EditWrapper>
        <Back>Voltar</Back>
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
