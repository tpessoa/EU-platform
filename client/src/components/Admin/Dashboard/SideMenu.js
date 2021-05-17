import React, { useState } from "react";
import styled from "styled-components";
import { Route, useRouteMatch, Link } from "react-router-dom";

import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { CgGames, CgPoll } from "react-icons/cg";
import { RiVideoFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FaPoll } from "react-icons/fa";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import PollIcon from "@material-ui/icons/Poll";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import WorkIcon from "@material-ui/icons/Work";
import CategoryIcon from "@material-ui/icons/Category";
import YouTubeIcon from "@material-ui/icons/YouTube";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";

import ExtensionIcon from "@material-ui/icons/Extension";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import SearchIcon from "@material-ui/icons/Search";
import { FaQuestion, FaBrain } from "react-icons/fa";
import LanguageIcon from "@material-ui/icons/Language";
import KeyboardIcon from "@material-ui/icons/Keyboard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SideMenu = () => {
  const { path, url } = useRouteMatch();
  const classes = useStyles();

  const [openGames, setOpenGames] = useState(false);
  const [openVideos, setOpenVideos] = useState(false);
  const [openPolls, setOpenPolls] = useState(false);

  const handleGamesClick = () => {
    setOpenGames(!openGames);
  };
  const handleVideosClick = () => {
    setOpenVideos(!openVideos);
  };
  const handlePollsClick = () => {
    setOpenPolls(!openPolls);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Gestão de conteúdo da página
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleGamesClick}>
        <ListItemIcon>
          <SportsEsportsIcon />
        </ListItemIcon>
        <ListItemText primary="Jogos" />
        {openGames ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openGames} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={`${url}/games/puzzle`}
          >
            <ListItemIcon>
              <ExtensionIcon />
            </ListItemIcon>
            <ListItemText primary="Puzzle" />
          </ListItem>

          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={`${url}/games/colorGame`}
          >
            <ListItemIcon>
              <ColorLensIcon />
            </ListItemIcon>
            <ListItemText primary="Colorir" />
          </ListItem>

          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={`${url}/games/wordSearch`}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Sopa de Letras" />
          </ListItem>

          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={`${url}/games/quiz`}
          >
            <ListItemIcon>
              <FaQuestion />
            </ListItemIcon>
            <ListItemText primary="Quiz" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={`${url}/games/memory`}
          >
            <ListItemIcon>
              <FaBrain />
            </ListItemIcon>
            <ListItemText primary="Memória" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={`${url}/games/interactiveMaps`}
          >
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Mapas Interativos" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={`${url}/games/crossWords`}
          >
            <ListItemIcon>
              <KeyboardIcon />
            </ListItemIcon>
            <ListItemText primary="Palavras Cruzadas" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleVideosClick}>
        <ListItemIcon>
          <SubscriptionsIcon />
        </ListItemIcon>
        <ListItemText primary="Vídeos" />
        {openVideos ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openVideos} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={`${url}/videos/categories`}
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categorias" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={`${url}/videos`}
          >
            <ListItemIcon>
              <YouTubeIcon />
            </ListItemIcon>
            <ListItemText primary="Vídeos" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handlePollsClick}>
        <ListItemIcon>
          <PollIcon />
        </ListItemIcon>
        <ListItemText primary="Votações" />
        {openPolls ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openPolls} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={`${url}/poll/categories`}
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categorias" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={`${url}/poll/works`}
          >
            <ListItemIcon>
              <KeyboardIcon />
            </ListItemIcon>
            <ListItemText primary="Trabalhos" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default SideMenu;

const ButtonCustom = styled(Button)`
  && {
    margin: 1rem;
    border-radius: 1rem;
  }
`;
