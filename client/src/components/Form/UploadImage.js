import React, { useState, forwardRef } from "react";

import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import DefaultImage from "../../assets/images/defaultImage.jpg";

import Loading from "../UI/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  media: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "56.25%", // 16:9
  },
  description: {
    textAlign: "center",
  },
}));

const UploadImage = forwardRef((props, ref) => {
  const classes = useStyles();
  const { description, image } = props;
  const { imagePath, uploading } = image;

  let imageSrc = DefaultImage;
  let newDescription = description + " (sem imagem)";
  if (imagePath.id !== "defaultImage") {
    imageSrc = imagePath.path + imagePath.server_path;
    newDescription = description;
  }
  let displayUpload = "";
  if (uploading) {
    displayUpload = <CardMedia className={classes.media} component={Loading} />;
  } else {
    displayUpload = <CardMedia className={classes.media} image={imageSrc} />;
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
            disabled={uploading}
            {...props}
          />
        </CardActions>
      </Card>
    </>
  );
});

export default UploadImage;
