import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 300,
    margin: "1rem",
    cursor: "default",
    textDecoration: "none",
  },
  media: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "177.77777777778%", // 16:9
  },
  description: {
    textAlign: "center",
  },
  image: {
    cursor: "zoom-in",
  },
});

const PollCard = (props) => {
  const {
    index,
    work,
    setImageOpen,
    setFormOpen,
    setSelected,
    enableVote,
  } = props;
  const { title, description, photo, author, votes } = work;
  const classes = useStyles();

  const handleClick = () => {
    setImageOpen(true);
  };

  const handleCardClick = () => {
    setSelected(index);
  };

  const handleBtnClick = () => {
    setFormOpen(true);
  };

  return (
    <Card className={classes.root} onClick={handleCardClick}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          className={classes.image}
          component="img"
          alt={photo.id}
          height="250"
          image={photo.path + photo.server_path}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Autor: {author}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Descrição: {description}
          </Typography>
          <Typography variant="h6" component="h4">
            Votos: {votes.length}
          </Typography>
        </CardContent>
      </CardActionArea>
      {enableVote && (
        <CardActions>
          <Button
            size="large"
            color="primary"
            variant="text"
            fullWidth
            onClick={handleBtnClick}
          >
            Votar
          </Button>
          {/* <Button size="small" color="primary">
              Ampliar
            </Button> */}
        </CardActions>
      )}
    </Card>
  );
};

export default PollCard;
