import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ConfirmDialog = (props) => {
  const { contentText, gameInfo, setConfirm } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [gameInfo.game_id]);

  const handleClose = (action) => {
    if (action === "confirm") {
      setConfirm(true);
    } else if (action === "cancel") {
      setConfirm(false);
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Confirmar ação</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose("cancel");
            }}
            color="secondary"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleClose("confirm");
            }}
            color="primary"
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
