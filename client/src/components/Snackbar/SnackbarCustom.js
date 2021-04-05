import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SnackbarCustom = (props) => {
  const { messages } = props;
  const { snackbar } = useParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  let display = "";
  if (snackbar === "success") {
    display = (
      <Alert onClose={handleClose} severity="success">
        {messages.success}
      </Alert>
    );
  } else if (snackbar === "error") {
    display = (
      <Alert onClose={handleClose} severity="error">
        {messages.error}
      </Alert>
    );
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {display}
      </Snackbar>
    </>
  );
};

export default SnackbarCustom;

{
  /* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */
}

// const handleClick = () => {
//   setOpen(true);
// };
