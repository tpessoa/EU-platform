import React, { useState } from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

const FSDialog = (props) => {
  const classes = useStyles();
  const { obj, setOpenDialog } = props;
  const { photo, title, description } = obj;
  const [open, setOpen] = useState(true);

  console.log(photo);

  const handleClose = () => {
    setOpen(false);
    setOpenDialog(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"lg"}
      >
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Sair
          </Button>
        </DialogActions>
        {/* <DialogTitle id="alert-dialog-title">{title}</DialogTitle> */}
        <DialogContent className={classes.content}>
          <ImageWrapper>
            <Image src={photo.path + photo.server_path} alt={photo.id} />
          </ImageWrapper>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
          {/* <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Votar
            </Button>
          </DialogActions> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default FSDialog;
