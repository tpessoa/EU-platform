import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";

const getAllGames = async () => {
  const { data } = await axios.get(`/api/games/all-games`);
  return data;
};
export const useAllGames = (gameType) => {
  return useQuery(["allGames"], () => getAllGames(), {
    refetchOnWindowFocus: false,
  });
};

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

const getGamesStatistics = async () => {
  const { data } = await axios.get(`/api/games/all-statistics`);
  return data;
};
export const useGamesStats = () => {
  return useQuery(["gamesStats"], () => getGamesStatistics(), {
    refetchOnWindowFocus: false,
  });
};

const getGameStatistic = async (gameId) => {
  const { data } = await axios.get(`/api/games/statistics/game/${gameId}`);
  return data;
};
// export const useGameStats = (gameId, flag) => {
//   return useQuery(["gameStats", gameId], () => getGameStatistic(gameId), {
//     refetchOnWindowFocus: false,
//     enabled: flag,
//   });
// };

// export const useGameStatsReset = (gameId) => {
//   const queryClient = new useQueryClient();
//   return useMutation(
//     axios({
//       method: "post",
//       url: "/api/games/statistics-reset",
//       data: { gameId: gameId },
//     }),
//     {
//       onSettled: () => queryClient.invalidateQueries(["gameStats", gameId]),
//     }
//   );
// };
