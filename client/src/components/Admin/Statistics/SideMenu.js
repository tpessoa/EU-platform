import React, { useState, useEffect } from "react";
import { useRouteMatch, Link, useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import ExtensionIcon from "@material-ui/icons/Extension";
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
  nested: {},
}));

const SideMenu = () => {
  const { path, url } = useRouteMatch();
  const { gameType } = useParams();
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [openGames, setOpenGames] = useState(true);

  const handleGamesClick = () => {
    setOpenGames(!openGames);
  };

  useEffect(() => {
    console.log(gameType);
    if (gameType === "puzzle") {
      setSelectedIndex(0);
    } else if (gameType === "wordSearch") {
      setSelectedIndex(1);
    } else if (gameType === "quiz") {
      setSelectedIndex(2);
    } else if (gameType === "memory") {
      setSelectedIndex(3);
    }
  }, [url]);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Jogos disponíveis
        </ListSubheader>
      }
      className={classes.root}
    >
      <List disablePadding>
        <ListItem
          button
          selected={selectedIndex === 0}
          className={classes.nested}
          // component={Link}
          // to={`${url}/puzzle`}
        >
          <ListItemIcon>
            <ExtensionIcon />
          </ListItemIcon>
          <ListItemText primary="Puzzle" />
        </ListItem>

        <ListItem
          button
          selected={selectedIndex === 1}
          className={classes.nested}
          component={Link}
          to={`${url}/wordSearch`}
        >
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Sopa de Letras" />
        </ListItem>

        <ListItem
          button
          selected={selectedIndex === 2}
          className={classes.nested}
          component={Link}
          to={`${url}/quiz`}
        >
          <ListItemIcon>
            <FaQuestion />
          </ListItemIcon>
          <ListItemText primary="Quiz" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          className={classes.nested}
          component={Link}
          to={`${url}/memory`}
        >
          <ListItemIcon>
            <FaBrain />
          </ListItemIcon>
          <ListItemText primary="Memória" />
        </ListItem>

        {/* <ListItem
          button
          className={classes.nested}
          component={Link}
          to={`${url}/interactiveMaps`}
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
          to={`${url}/crossWords`}
        >
          <ListItemIcon>
            <KeyboardIcon />
          </ListItemIcon>
          <ListItemText primary="Palavras Cruzadas" />
        </ListItem> */}
      </List>
    </List>
  );
};

export default SideMenu;
