import { useQuery } from "react-query";
import axios from "axios";

const getGames = async (gameType) => {
  const { data } = await axios.get(`/api/games/type/${gameType}`);
  return data;
};
export const useGames = (gameType) => {
  return useQuery(["games", gameType], () => getGames(gameType), {
    refetchOnWindowFocus: false,
  });
};

const getGame = async (gameId) => {
  const { data } = await axios.get(`/api/games/game/${gameId}`);
  return data;
};
export const useGame = (gameId, flag) => {
  return useQuery(["game", gameId], () => getGame(gameId), {
    refetchOnWindowFocus: false,
    enabled: flag,
  });
};
