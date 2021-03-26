import React, { useState, useEffect } from "react";
import axios from "axios";

import ModalGrid from "../ModalGrid";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

import styled from "styled-components";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: 960px) {
  }
`;
const ButtonImg = styled(Button)`
  padding: 1rem;
`;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "80%",
  },
}));

const ImageUtils = ({ setUploadedImg }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [arrImagesPaths, setarrImagesPaths] = useState([]);
  const [imgSelected, setImgSelected] = useState(null);

  useEffect(() => {
    axios
      .get("/api/admin/getAllImages/" + "puzzle")
      .then(function (resp) {
        if (resp.data.gameConfig) {
          const arrImages = resp.data.gameConfig.img_paths;
          if (arrImages.length > 0) {
            setarrImagesPaths(arrImages);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setUploadedImg(imgSelected);
  }, [imgSelected]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <ButtonImg variant="contained" color="primary" onClick={handleOpen}>
        Trocar Imagem
      </ButtonImg>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Seleciona uma imagem</h2>
            <p id="transition-modal-description">E clica confirmar</p>
            <ModalGrid
              arr={arrImagesPaths}
              setSelected={setImgSelected}
              closeModal={handleClose}
            />
          </div>
        </Fade>
      </Modal>
    </Container>
  );
};

export default ImageUtils;
