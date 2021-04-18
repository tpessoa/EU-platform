import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { GiMagnifyingGlass } from "react-icons/gi";
import { IoColorPaletteSharp } from "react-icons/io5";
import { BsPuzzleFill } from "react-icons/bs";
import { FaBrain, FaQuestion } from "react-icons/fa";
import { FcGlobe } from "react-icons/fc";

import GameIcon from "../GameIcon";

import { Container, GamesItemsWrapper } from "./TypeOfGames.elements";

const gamesList = [
  {
    url: "/games/puzzle",
    icon: <BsPuzzleFill />,
    name: "Puzzle",
  },
  {
    url: "/games/colorGame",
    icon: <IoColorPaletteSharp />,
    name: "Colorir",
  },
  {
    url: "/games/wordSearch",
    icon: <GiMagnifyingGlass />,
    name: "Sopa de Letras",
  },
  {
    url: "/games/quiz",
    icon: <FaQuestion />,
    name: "Quiz",
  },
  {
    url: "/games/memoryGame",
    icon: <FaBrain />,
    name: "Memória",
  },
  {
    url: "/games/interactiveMaps",
    icon: <FcGlobe />,
    name: "Mapas Interativos",
  },
];

const TypeOfGames = () => {
  const [item, setItem] = useState(-1);
  const location = useLocation();

  useEffect(() => {
    const gameIndex = gamesList.findIndex(
      (elem) => elem.url === location.pathname
    );
    setItem(gameIndex);
  }, [location.pathname]);

  return (
    <Container>
      <GamesItemsWrapper>
        {gamesList.map((game, index) => (
          <GameIcon
            key={index}
            game={game}
            index={index}
            itemActive={item}
            setItem={setItem}
          />
        ))}
      </GamesItemsWrapper>
    </Container>
  );
};

export default TypeOfGames;
