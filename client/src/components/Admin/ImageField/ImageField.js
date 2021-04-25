import React, { useState, useEffect } from "react";

import Card from "../Card/CardNew";
import UploadImage from "../UploadImage";
import OldImagesDisplay from "./OldImages";

import styled from "styled-components";

const ImageField = (props) => {
  const { title, field_ref, imageObj, parentChangeHandler, linkedObj } = props;
  const [image, setImage] = useState(imageObj);

  // query to get all images associated with this field_ref
  const fetchQuery = `get${linkedObj}Images`;

  const changeImageHandler = (imgObj) => {
    setImage(imgObj);
    parentChangeHandler(imgObj, field_ref);
  };

  return (
    <Container>
      <AtualImageContainer>
        <p>{title}</p>
        <Card imageObj={image} />
        <UploadImage
          linkedObj={linkedObj}
          inputRef={field_ref}
          fetchQuery={fetchQuery}
          setImage={changeImageHandler}
        />
      </AtualImageContainer>
      <OldImagesContainer>
        <OldImagesDisplay
          linkedObj={linkedObj}
          inputRef={field_ref}
          fetchQuery={fetchQuery}
          setImage={changeImageHandler}
        />
      </OldImagesContainer>
    </Container>
  );
};

export default ImageField;

const Container = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #cccccc;
  border-radius: 5px;
  width: 100%;
`;

const AtualImageContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
`;

const OldImagesContainer = styled.div`
  margin: 1rem 0;
  width: 50%;
  height: 100%;
`;
