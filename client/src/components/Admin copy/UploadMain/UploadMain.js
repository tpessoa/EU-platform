import React, { useState, useEffect } from "react";
import AssetsList from "../AssetsList";
import ListGames from "../ListGames";
import UploadImage from "../UploadImage";

import CircularProgress from "@material-ui/core/CircularProgress";

import styled from "styled-components";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 3rem;
  width: 100%;
  height: 100%;
`;

const GridWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const UploadInfo = styled.div`
  color: green;
  font-size: 1rem;
`;

const UploadMain = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [processing, setProcessing] = useState(false);

  let displayUpload;
  // initial state, when loading the page
  if (selectedGame != null) {
    // if the request of uploading the image is processing
    if (processing) {
      displayUpload = <CircularProgress />;
    } else {
      // if its already uploaded
      if (uploaded) {
        displayUpload = <UploadInfo>Imagem guardada com sucesso!</UploadInfo>;
        // if its not processing and not uploaded, show the menu to perfome the upload
      } else {
        displayUpload = (
          <UploadImage
            gameRef={selectedGame}
            setUploaded={setUploaded}
            setProcessing={setProcessing}
          />
        );
      }
    }
  }

  return (
    <Container>
      <UploadWrapper>
        <ListGames
          listType={"uploadImage"}
          setSelectedGame={setSelectedGame}
          setUploaded={setUploaded}
        />
        {displayUpload}
      </UploadWrapper>
      <GridWrapper>
        <AssetsList refresh={uploaded} />
      </GridWrapper>
    </Container>
  );
};

export default UploadMain;
