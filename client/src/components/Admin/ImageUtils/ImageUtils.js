import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import styled from "styled-components";
import Upload from "../Upload";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
  button_text: {
    fontSize: "0.7rem",
    margin: theme.spacing(1),
  },
}));

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageUtils = () => {
  const classes = useStyles();

  const uploadHandler = () => {};

  return (
    <Container>
      {/* <div className={classes.root}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            onClick={uploadHandler}
          >
            Upload
          </Button>
        </label>
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
      </div>
      <Button
        className={classes.button_text}
        variant="contained"
        color="primary"
      >
        Imagens existentes
      </Button> */}

      <Upload />
    </Container>
  );
};

export default ImageUtils;
