import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Upload from "../Upload";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Button from "@material-ui/core/Button";

import styled from "styled-components";

const GridWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px;
`;

const GridTitle = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const DeleteButton = styled(Button)`
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &:hover ${DeleteButton} {
    top: 50%;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 410,
  },
}));

const AssetsList = () => {
  const classes = useStyles();
  const { game } = useParams();
  const [arrImgPath, setArrImgPath] = useState(null);
  const [uploaded, setUploaded] = useState("");

  useEffect(() => {
    // get all the games
    axios
      .get("/api/admin/getAllImages/" + game)
      .then(function (resp) {
        setArrImgPath(resp.data.gameConfig.img_paths);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [game, uploaded]);

  console.log(arrImgPath);
  const deleteHandler = () => {
    console.log("eliminar imagem e se caso o jogo");
  };

  return (
    <>
      <Upload setUploaded={setUploaded} />
      <div className={classes.root}>
        <GridWrapper>
          <GridTitle>
            <h1>Imagens disponíveis</h1>
          </GridTitle>
          <GridList cellHeight={200} className={classes.gridList} cols={3}>
            {arrImgPath &&
              arrImgPath.map((imgPath, index) => (
                <GridListTile key={index}>
                  <ImgWrapper>
                    <Img src={imgPath} alt={index} />
                    <DeleteButton
                      variant="contained"
                      color="secondary"
                      onClick={deleteHandler}
                    >
                      Eliminar
                    </DeleteButton>
                  </ImgWrapper>
                </GridListTile>
              ))}
          </GridList>
        </GridWrapper>
      </div>
    </>
  );
};

export default AssetsList;
