import React from "react";

import { GiMagnifyingGlass } from "react-icons/gi";
import { IoColorPaletteSharp } from "react-icons/io5";
import { BsPuzzleFill } from "react-icons/bs";
import { FaBrain, FaQuestion } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Route } from "react-router-dom";

import Cards from "../Cards/Cards";

import {
  Container,
  GamesItemsWrapper,
  GameItem,
  GameIcon,
  GameName,
} from "./TypeOfGames.elements";

const TypeOfGames = () => {
  // const location = useLocation();
  // console.log(location.pathname);
  // const str_loc_pathname = location.pathname;
  return (
    <>
      <Container>
        <GamesItemsWrapper>
          <GameItem to={"/games/allPuzzles"}>
            <GameIcon>
              <BsPuzzleFill />
            </GameIcon>
            <GameName>Puzzle</GameName>
          </GameItem>
          <GameItem to={"/games/allColorGames"}>
            <GameIcon>
              <IoColorPaletteSharp />
            </GameIcon>
            <GameName>Colorir</GameName>
          </GameItem>
          <GameItem to={"/games/allWordSearchs"}>
            <GameIcon>
              <GiMagnifyingGlass />
            </GameIcon>
            <GameName>Sopa de Letras</GameName>
          </GameItem>
          <GameItem to={"/games/allQuizzes"}>
            <GameIcon>
              <FaQuestion />
            </GameIcon>
            <GameName>Quiz</GameName>
          </GameItem>
          <GameItem to={"/games/allMemoryGames"}>
            <GameIcon>
              <FaBrain />
            </GameIcon>
            <GameName>Memória</GameName>
          </GameItem>
          {/* <GameItem>
            <GameIcon>
              <GiMagnifyingGlass />
            </GameIcon>
            <GameName>Sopa de Letras</GameName>
          </GameItem> */}
        </GamesItemsWrapper>
      </Container>
    </>
  );
};

export default TypeOfGames;
