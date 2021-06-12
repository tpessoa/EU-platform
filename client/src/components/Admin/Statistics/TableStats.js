import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { Button, IconButton } from "@material-ui/core";
import { useGame } from "../../../hooks/useGames";
import Loading from "../../UI/Loading";
import Error from "../../UI/Error";
import HelpIcon from "@material-ui/icons/Help";

const decimals = 2;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    width: "80%",
  },
  table: {
    minWidth: 650,
  },
  totalRow: {
    backgroundColor: theme.palette.secondary.main,
  },
  headerRow: {
    backgroundColor: theme.palette.primary.main,
  },
  whiteText: {
    color: "#ffffff",
  },
}));

const createData = (
  num_opened,
  num_finished,
  num_wins,
  defeats,
  wins_perc,
  mean_time
) => {
  return { num_opened, num_finished, num_wins, defeats, wins_perc, mean_time };
};

const TableStats = (props) => {
  const { gameData } = props;
  const classes = useStyles();
  const { gameId } = useParams();
  const gameInfo = useGame(gameId, gameId ? true : false);

  const queryClient = new useQueryClient();
  const resetStats = useMutation(
    (obj) =>
      axios({
        method: "post",
        url: "/api/games/statistics-reset",
        data: { gameId: obj },
      }),
    {
      onSettled: () => queryClient.invalidateQueries(["gamesStats"]),
    }
  );

  if (gameInfo.isLoading) return <Loading />;
  if (gameInfo.isError) return <Error error={gameInfo.error} />;

  const rows = [];

  if (gameData) {
    const defeat = gameData.num_finished - gameData.num_wins;
    const wins_perc = gameData.num_wins / gameData.num_finished;
    const mean_time =
      gameData.user_time_arr.reduce((p, c) => parseInt(p) + parseInt(c), 0) /
      gameData.user_time_arr.length;

    rows.push(
      createData(
        gameData.num_opened,
        gameData.num_finished,
        gameData.num_wins,
        defeat,
        wins_perc,
        mean_time
      )
    );
  }

  return (
    <>
      <Typography variant="h5" component="h2">
        Estatísticas do {gameInfo.data.title}
        {/* <Tooltip
    title={wrongStatsMessage}
    placement="top-start"
    arrow
    TransitionComponent={Zoom}
  >
    <IconButton aria-label="delete">
      <HelpIcon />
    </IconButton>
  </Tooltip> */}
      </Typography>

      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.headerRow}>
              <Tooltip
                title="Número de vezes que o jogo foi aberto"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell className={classes.whiteText} align="center">
                  Abertos
                </TableCell>
              </Tooltip>

              <Tooltip
                title="Número de vezes que o jogo foi completado"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell className={classes.whiteText} align="center">
                  Finalizados
                </TableCell>
              </Tooltip>

              <Tooltip
                title="Número de vezes que o jogo foi completado com sucesso"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell className={classes.whiteText} align="center">
                  Vitórias
                </TableCell>
              </Tooltip>

              <Tooltip
                title="Número de vezes que o jogo foi completado com insucesso"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell className={classes.whiteText} align="center">
                  Derrotas
                </TableCell>
              </Tooltip>
              <Tooltip
                title="Percentagem de vitórias"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell className={classes.whiteText} align="center">
                  Vitórias (%)
                </TableCell>
              </Tooltip>

              <Tooltip
                title="Tempo médio para acabar o jogo com sucesso (segundos)"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell className={classes.whiteText} align="center">
                  Média tempo (s)
                </TableCell>
              </Tooltip>
            </TableRow>
          </TableHead>
          {gameData && (
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.num_opened}</TableCell>
                  <TableCell align="center">{row.num_finished}</TableCell>
                  <TableCell align="center">{row.num_wins}</TableCell>
                  <TableCell align="center">{row.defeats}</TableCell>
                  <TableCell align="center">{`${(row.wins_perc * 100).toFixed(
                    decimals
                  )}%`}</TableCell>
                  <TableCell align="center">{`${row.mean_time.toFixed(
                    decimals
                  )} s`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => resetStats.mutate(gameId)}
      >
        Reset Estatísticas
      </Button>
    </>
  );
};

export default TableStats;
