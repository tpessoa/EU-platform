import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "../Grid";
import ListGames from "../ListGames";

import styled from "styled-components";
const Container = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InfoContainer = styled.div`
  margin: 0 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Description = styled.div`
  margin: 0 1rem;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.div`
  width: 60%;
  margin: 0 20px;
  font-size: 1.2rem;
`;

const Filter = styled.div`
  width: 40%;
  margin: 0 20px;
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const AssetsList = ({ refresh }) => {
  const [arrImgPath, setArrImgPath] = useState(null);
  const [uploaded, setUploaded] = useState("");
  const [selectedFilterGame, setSelectedFilterGame] = useState(null);

  useEffect(() => {
    if (selectedFilterGame == null || selectedFilterGame === "all") {
      axios
        .get("/api/admin/getAllGamesImages")
        .then(function (resp) {
          const tempArr = [];
          resp.data.allGames.forEach((gameConfig) =>
            gameConfig.img_paths.forEach((path) => tempArr.push(path))
          );
          setArrImgPath(tempArr);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .get("/api/admin/getAllImages/" + selectedFilterGame)
        .then(function (resp) {
          if (resp.data.gameConfig != null) {
            setArrImgPath(resp.data.gameConfig.img_paths);
          } else {
            setArrImgPath([]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [selectedFilterGame, refresh]);

  return (
    <Container>
      <InfoContainer>
        <Description>
          <Title>{"Imagens disponíveis"}</Title>
          <Filter>{"Filtrar por"}</Filter>
        </Description>
        <ListGames
          listType={"filterGame"}
          setSelectedGame={setSelectedFilterGame}
        />
      </InfoContainer>
      {arrImgPath && (
        <Grid
          arr={arrImgPath}
          setArr={setArrImgPath}
          selectedGame={selectedFilterGame}
        />
      )}
    </Container>
  );
};

export default AssetsList;
