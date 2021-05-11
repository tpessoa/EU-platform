import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
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
});

const PollCategoryCard = (props) => {
  const { path, url } = useRouteMatch();
  const { info, num } = props;
  const { _id, thumbnail, title, description } = info;
  const classes = useStyles();

  return (
    <Card className={classes.root} component={Link} to={`${url}/${_id}`}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={thumbnail.id}
          height="300"
          image={thumbnail.path + thumbnail.server_path}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PollCategoryCard;
