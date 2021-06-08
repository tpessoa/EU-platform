import React from "react";
import { Link as LinkScroll } from "react-scroll";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DefaultImage from "../../../assets/images/defaultImage.jpg";
import { Button } from "@material-ui/core";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
  },
  header: {
    textAlign: "center",
    height: "10vh",
    overflowY: "hidden",
  },
  media: {
    height: "20vh",
    // paddingTop: "56.25%", // 16:9
    margin: theme.spacing(0.5),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },

  content: {
    height: "25vh",
    overflowY: "auto",
  },
}));

const GameCard = (props) => {
  const { gameInfo } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let imagePath = DefaultImage;
  if (gameInfo.thumbnail.id !== "defaultImage") {
    imagePath = gameInfo.thumbnail.path + gameInfo.thumbnail.server_path;
  }

  let cardBorderColor = "#ee1111";
  let difficultyText = "Difícil";
  if (gameInfo.difficulty === 0) {
    cardBorderColor = "#2ddd00";
    difficultyText = "Fácil";
  } else if (gameInfo.difficulty === 1) {
    cardBorderColor = "#f7ea00";
    difficultyText = "Médio";
  }

  return (
    <>
      <Card className={classes.root}>
        {/* <CardHeader
          className={classes.header}
          title={gameInfo.title}
          // subheader={gameInfo.title}
        /> */}
        <CardMedia
          className={classes.media}
          image={imagePath}
          // title={gameInfo.title}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {gameInfo.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Dificuldade:
            <Tooltip
              title={difficultyText}
              placement="right"
              style={{ fontSize: "2rem" }}
            >
              <IconButton aria-label="add to favorites">
                <SportsEsportsIcon style={{ color: cardBorderColor }} />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Descrição: {gameInfo.description}
          </Typography>
        </CardContent>
        <LinkScroll
          to="scrollToFooter"
          smooth={true}
          delay={1000}
          duration={1000}
          offset={-80}
        >
          <CardActions disableSpacing>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              component={Link}
              to={{
                pathname: `/games/${gameInfo.game_ref_name}/game`,
                search: `?id=${gameInfo._id}`,
              }}
            >
              Jogar
            </Button>
          </CardActions>
        </LinkScroll>
      </Card>
    </>
  );
};

export default GameCard;
