import React, { useState, useEffect } from "react";

import Card from "../Card";
import UploadImage from "../UploadImage";

import CircularProgress from "@material-ui/core/CircularProgress";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #cccccc;
  border-radius: 5px;
  width: 80%;
`;

const ImageField = (props) => {
  const { field_ref, imageObj, parentChangeHandler, title } = props;
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(null);

  useEffect(() => {
    if (uploaded) {
      parentChangeHandler(uploaded, field_ref);
    }
  }, [uploaded]);

  let display = "";
  if (isUploading) {
    display = <CircularProgress />;
  } else {
    display = (
      <>
        <UploadImage setProcessing={setIsUploading} setUploaded={setUploaded} />
      </>
    );
  }

  return (
    <Container>
      <p>{title}</p>
      <Card imageObj={uploaded ? uploaded : imageObj} />
      {display}
    </Container>
  );
};

export default ImageField;
