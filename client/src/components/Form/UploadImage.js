import React, { useState, forwardRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { verifyImageFileType } from "../../globalFuncUtils";

import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ImageIcon from "@material-ui/icons/Image";
import DefaultImage from "../../assets/images/defaultImage.jpg";

import SaveButton from "./PrimaryButton";
import Loading from "../UI/Loading";

const useStyles = makeStyles({
  root: {},
  media: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "56.25%", // 16:9
  },
  description: {
    textAlign: "center",
  },
});

const schema = yup.object().shape({
  image: yup
    .mixed()
    // .test("null", "Deve inserir um ficheiro", (value) => {
    //   if (!value.length) return false; // attachment is optional
    //   if (value.length) return true; // attachment is optional
    // })
    .test(
      "fileType",
      "Tipo de ficheiro não suportado, apenas .jpg, .jpeg e .png",
      (value) => {
        if (!value.length) return true; // attachment is optional
        return verifyImageFileType(value[0].type);
      }
    )
    .test("fileSize", "Ficheiro muito grande, 5 MB Máx.", (value) => {
      if (!value.length) return true; // attachment is optional
      return value[0].size <= 5 * 1024 * 1024; // 8MB
    }),
});

const UploadImage = forwardRef((props, ref) => {
  const classes = useStyles();

  const [uploading, setUploading] = useState(false);

  // let imageSrc = DefaultImage;
  // let newDescription = description + " (sem imagem)";
  // if (imagePath.id !== "defaultImage") {
  //   imageSrc = imagePath.path + imagePath.server_path;
  //   newDescription = description;
  // }

  let displayUpload = "";
  if (uploading) {
    displayUpload = <CardMedia className={classes.media} component={Loading} />;
  } else {
    displayUpload = (
      <CardMedia className={classes.media} image={DefaultImage} />
    );
  }
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            {displayUpload}
            <Typography
              className={classes.description}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <TextField
            id="outlined-helperText"
            variant="outlined"
            margin="normal"
            inputRef={ref}
            fullWidth
            {...props}
            onChange={props.onChange}
          />
        </CardActions>
      </Card>
    </>
  );
});

export default UploadImage;
