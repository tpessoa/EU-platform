import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import styled from "styled-components";
import Upload from "../UploadImage";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: 960px) {
  }
`;

const ImageUtils = ({ setUploadedImg }) => {
  const classes = useStyles();
  const [uploaded, setUploaded] = useState(null);
  const [uploadComponent, setUploadComponent] = useState(false);

  const uploadHandler = () => {
    setUploadComponent(true);
  };

  useEffect(() => {
    setUploadedImg(uploaded);
  }, [uploaded]);

  return (
    <Container>
      {uploadComponent ? (
        <Upload setUploaded={setUploaded} />
      ) : (
        <div className={classes.root}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Imagem existente
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            onClick={uploadHandler}
          >
            Upload de nova Imagem
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ImageUtils;
