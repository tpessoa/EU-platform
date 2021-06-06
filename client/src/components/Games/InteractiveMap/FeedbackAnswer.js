import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const FeedbackAnswer = (props) => {
  const { userAnswer, question, userCountry, rightCountry } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(true);
  }, [userAnswer !== null]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  console.log(userCountry);
  console.log(rightCountry);

  let errorMessage = "";
  if (userCountry === "outside") {
    errorMessage = `Errado! Clicaste num país fora da União Europeia`;
  } else {
    errorMessage = `Errado! Clicaste em ${userCountry}`;
  }

  return (
    <div className={classes.root}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {userAnswer === true ? (
          <Alert onClose={handleClose} severity="success">
            Parabéns! Clicaste no país correto
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default FeedbackAnswer;
