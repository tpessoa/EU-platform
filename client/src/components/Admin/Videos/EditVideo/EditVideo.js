import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import ListField from "../../../Input/ListField/ListFielNew";
import TextInput from "../../../Input/TextField/TextFieldNew";
import Save from "../../Buttons/Save";
import Back from "../../Buttons/Back";

const EditVideo = () => {
  const { videoId } = useParams();

  const [categoriesArr, setCategoriesArr] = useState([]);
  const [selectedCategoryPos, setSelectedCategoryPos] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [createGame, setCreateGame] = useState(null);
  const [success, setSuccess] = useState(false);

  const getAllVideoCategories = async () => {
    const tempArr = [];
    await axios
      .get(`/api/videos/categories/type/video`)
      .then(function (res) {
        // console.log(res.data);
        res.data.forEach((elem) => {
          tempArr.push(elem);
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return tempArr;
  };

  useEffect(() => {
    if (videoId === "createNew") {
      setCreateGame(true);
    } else {
      setCreateGame(false);

      const fetchData = async () => {
        const categories = await getAllVideoCategories();
        await axios
          .get(`/api/videos/video/${videoId}`)
          .then(function (res) {
            // console.log(res.data);
            const index = categories.findIndex(
              (elem) => elem._id === res.data.category_id
            );
            setCategoriesArr([...categories]);
            setSelectedCategoryPos(index);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setUrl(res.data.url);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      fetchData();
    }
  }, [videoId]);

  const inputChangeHandler = (userInput, ref) => {
    if (ref === "title") {
      setTitle(userInput);
    } else if (ref === "description") {
      setDescription(userInput);
    } else if (ref === "url") {
      setUrl(userInput);
    } else if (ref === "category") {
      setSelectedCategoryPos(userInput);
    }
  };

  const successValidation = () => {
    if (selectedCategoryPos === "") return false;
    if (title === "") return false;
    return true;
  };

  const performSave = (ev) => {
    console.log("saving");
    ev.preventDefault();

    // validate the params
    if (!successValidation()) return;

    // mount object to send to database
    const videoObj = {
      categoryId: categoriesArr[selectedCategoryPos]._id,
      title: title,
      description: description,
      url: url,
    };
    console.log(videoObj);

    let URL_str = "";
    if (createGame) {
      URL_str = `/api/videos/video/add`;
    } else {
      URL_str = `/api/videos/video/${videoId}`;
    }

    // post them to database
    axios
      .post(URL_str, { obj: videoObj })
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // display feedback
    setSuccess(true);
  };

  let displayCategories = (
    <ListField
      label={"Categoria"}
      field_ref={"category"}
      arr={categoriesArr}
      objElem={"title"}
      value={selectedCategoryPos}
      parentChangeHandler={inputChangeHandler}
    />
  );

  return (
    <Container>
      <EditWrapper>
        <Back>Voltar</Back>
        <CategoryWrapper>{displayCategories}</CategoryWrapper>
        <TextInput
          field_ref={"title"}
          label={"Título"}
          value={title}
          parentChangeHandler={inputChangeHandler}
        />
        <TextInput
          field_ref={"description"}
          label={"Descrição"}
          value={description}
          parentChangeHandler={inputChangeHandler}
          multi={true}
        />
        <TextInput
          field_ref={"url"}
          label={"Link do vídeo"}
          value={url}
          parentChangeHandler={inputChangeHandler}
        />
        <Save clickHandler={performSave}>Guardar</Save>
      </EditWrapper>
    </Container>
  );
};

export default EditVideo;

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

const CategoryWrapper = styled.div`
  width: 40%;
`;
