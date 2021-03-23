import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  margin: 0.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1rem;
  margin: 0.5rem;
`;

const Upload = ({ setUploaded }) => {
  const classes = useStyles();
  const [file, setFile] = useState("");
  const { game } = useParams();

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("game", game);

    const config = {
      headers: { "content-Type": "multipart/form-data" },
    };
    await axios
      .post("/api/admin/uploadImg", formData, config)
      .then((res) => {
        if (res.status == 200) {
          setUploaded(res.data.imgPath);
        }
      })
      .catch((err) => console.log(err));
  };
  const onChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h3>Seleciona uma imagem do computador e carrega no botão de upload</h3>
      <Input type="file" name="image" onChange={onChange} />
      <ButtonWrapper>
        <Button variant="contained" color="primary" type="submit">
          Upload Imagem
        </Button>
      </ButtonWrapper>
    </form>
  );
};

export default Upload;
