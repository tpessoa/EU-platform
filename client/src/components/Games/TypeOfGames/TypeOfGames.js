import React, { useState } from "react";
import { GiMagnifyingGlass } from "react-icons/gi";
import { IoColorPaletteSharp } from "react-icons/io5";
import { BsPuzzleFill } from "react-icons/bs";
import { FaBrain, FaQuestion } from "react-icons/fa";

import {
  Container,
  GamesItemsWrapper,
  GameItem,
  GameIcon,
  GameName,
} from "./TypeOfGames.elements";

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
  // {
  //   url: "/games/allMemoryGames",
  //   icon: <FaBrain />,
  //   name: "Memória",
  // },
];

const TypeOfGames = () => {
  const [activeBtn, setActiveBtn] = useState(-1);

  const handleClick = (index) => {
    setActiveBtn(index);
  };

  return (
    <Container>
      <GamesItemsWrapper>
        {gamesList.map((game, index) => {
          return (
            <GameItem
              to={game.url}
              key={index}
              onClick={() => handleClick(index)}
              highlight={index == activeBtn ? "#ffcc00" : "transparent"}
            >
              <GameIcon>{game.icon}</GameIcon>
              <GameName>{game.name}</GameName>
            </GameItem>
          );
        })}
      </GamesItemsWrapper>
    </Container>
  );
};

export default TypeOfGames;
