import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import Loading from "../../../components/UI/Loading";
import Error from "../../../components/UI/Error";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import CancelIcon from "@material-ui/icons/Cancel";
import Grow from "@material-ui/core/Grow";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";

export const schema = yup.object().shape({
  name: yup.string().required("O campo nome é obrigatório!"),
  email: yup
    .string()
    .email("Insira um email válido")
    .required("O campo email é obrigatório!"),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  dialog: {},
  root: {
    flexGrow: 1,
  },
  card: {},
  media: {},

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  leftGrid: {
    padding: theme.spacing(3),
    // background:
    //   "-webkit-linear-gradient(to right,#2a5298,#1e3c72);" /* Chrome 10-25, Safari 5.1-6 */,
    // background:
    //   "linear-gradient(to right,#2a5298,#1e3c72);" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
  },
  rightGrid: {
    // background:
    //   "linear-gradient(90deg, rgb(40, 40, 40) 0%, rgb(17, 17, 17) 100%);",
    display: "grid",
    placeItems: "center",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "0",
    right: "0",
  },
  actions: {
    // position: "absolute",
    // bottom: theme.spacing(1),
    // right: theme.spacing(1),
  },
  text: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  button: {
    cursor: "default",
    margin: theme.spacing(0, 10, 0, 10),
  },
}));

const DialogForm = (props) => {
  const classes = useStyles();

  const { obj, setOpenForm } = props;
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setOpenForm(false);
  };

  const queryClient = new useQueryClient();
  console.log(queryClient);
  const mutation = useMutation(
    (obj) =>
      axios({
        method: "post",
        url: "/api/polls/vote",
        data: obj,
      }),
    {
      onSettled: () => queryClient.invalidateQueries(["works", obj.poll_id]),
      onSuccess: (result) => {
        handleClose();
        console.log(result.data);
      },
    }
  );

  console.log(obj);

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (userInput) => {
    // console.log(userInput);
    const newObj = {
      workId: obj._id,
      ...userInput,
    };
    mutation.mutate(newObj);
  };

  let displaySave = "";
  let displayAlreadyVoted = "";
  if (mutation.isLoading) {
    displaySave = <Loading />;
  } else {
    displaySave = (
      <Button
        className={classes.button}
        type="submit"
        color="primary"
        variant="contained"
        fullWidth
      >
        Votar!
      </Button>
    );
  }
  if (mutation.isError) {
    displayAlreadyVoted = (
      <p style={{ color: "#ff0000", marginBottom: "10px" }}>
        {mutation.error.response.data.message}
      </p>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
      TransitionComponent={Transition}
      className={classes.dialog}
    >
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={6} className={classes.leftGrid}>
            <Typography variant="h5" component="h2" align="center">
              {obj.title}
            </Typography>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                component="img"
                alt={obj.photo.id}
                image={obj.photo.path + obj.photo.server_path}
                title={obj.title}
              />
            </Card>
            <Typography variant="body2" component="p" align="center">
              Autor: {obj.author}
            </Typography>
            <Typography variant="body2" component="p" align="center">
              Votos: {obj.votes.length}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.rightGrid}>
            <DialogContent>
              <IconButton
                aria-label="delete"
                className={classes.closeBtn}
                onClick={handleClose}
                color="primary"
              >
                <CancelIcon fontSize="large" />
              </IconButton>
              <DialogContentText className={classes.title} align="center">
                Para votar é necessário inserir um nome e email válido
              </DialogContentText>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={classes.text}
                      variant="outlined"
                      id="name"
                      label="Nome"
                      type="name"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors?.name?.message}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={classes.text}
                      variant="outlined"
                      id="email"
                      label="Email"
                      type="email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                    />
                  )}
                />
                {displayAlreadyVoted}
                <DialogActions className={classes.actions}>
                  {/* <Button
                className={classes.button}
                onClick={handleClose}
                color="primary"
              >
                Cancelar
              </Button> */}
                  {displaySave}
                </DialogActions>
              </form>
            </DialogContent>
          </Grid>
        </Grid>
      </div>
      {/* <DialogTitle id="form-dialog-title" align="center"></DialogTitle> */}
    </Dialog>
  );
};

export default DialogForm;
