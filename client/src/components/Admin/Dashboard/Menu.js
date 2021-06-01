import React from "react";
import { useParams } from "react-router-dom";

import Perfil from "./Perfil";
import GameMenu from "./GamesMenu";
import Statistics from "../Statistics";

const Menu = () => {
  const { tab } = useParams();

  let displayMenu = "";
  if (tab === "content") {
    displayMenu = <GameMenu />;
  }
  if (tab === "statistics") {
    displayMenu = <Statistics />;
  } else if (tab === "perfil") {
    displayMenu = <Perfil />;
  }

  return <>{displayMenu}</>;
};

export default Menu;
