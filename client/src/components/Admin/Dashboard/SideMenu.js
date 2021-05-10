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
import YouTubeIcon from "@material-ui/icons/YouTube";
import PollIcon from "@material-ui/icons/Poll";

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
  const [openVideos, setOpenVideos] = useState(false);
  const [openPolls, setOpenPolls] = useState(false);

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
      <ListItem button>
        <ListItemIcon>
          <SportsEsportsIcon />
        </ListItemIcon>
        <ListItemText primary="Jogos" />
      </ListItem>

      <ListItem button onClick={handleVideosClick}>
        <ListItemIcon>
          <YouTubeIcon />
        </ListItemIcon>
        <ListItemText primary="Vídeos" />
        {openVideos ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openVideos} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Categorias" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
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
              <StarBorder />
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
              <StarBorder />
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
