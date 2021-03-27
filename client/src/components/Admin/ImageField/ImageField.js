import React, { useState, useEffect } from "react";

import Card from "../Card";
import UploadImage from "../UploadImage";

import CircularProgress from "@material-ui/core/CircularProgress";

const ImageField = (props) => {
  const { field_ref, imageObj, parentChangeHandler } = props;
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(null);

  useEffect(() => {
    parentChangeHandler(uploaded, field_ref);
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
    <>
      <Card imageObj={uploaded ? uploaded : imageObj} />
      {display}
    </>
  );
};

export default ImageField;
