import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

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

const createData = (name, num_right, num_wrong, perc_right, mean_time_resp) => {
  return { name, num_right, num_wrong, perc_right, mean_time_resp };
};

const answersCounter = (arr, flag) => {
  let counter = 0;
  for (const elem of arr) {
    if (elem === flag) counter++;
  }
  return counter;
};

const rightAnswersPerc = (arr) => {
  let counter = 0;
  for (const elem of arr) {
    if (elem === true) counter++;
  }

  return (counter / arr.length) * 100;
};

const getMeanTime = (arr) => {
  return arr.reduce((a, b) => a + b) / arr.length;
};

const TableStats = (props) => {
  const { setGame, gameStats } = props;
  const classes = useStyles();
  const { gameId } = useParams();

  useEffect(() => {
    setGame(gameId);
  }, [gameId]);

  const rows = [];
  let total_right_ans = 0,
    total_wrong_ans = 0,
    total_right_perc = 0,
    total_time = 0,
    total_games = gameStats ? gameStats.total_answers.length : 1;
  if (gameStats) {
    for (const r of gameStats.total_answers) {
      const right_answers = answersCounter(r.right, true);
      total_right_ans += right_answers;
      const wrong_answers = answersCounter(r.right, false);
      total_wrong_ans += wrong_answers;
      const right_answers_perc = rightAnswersPerc(r.right);
      total_right_perc += right_answers_perc;
      const mean_time = getMeanTime(r.time_resp);
      total_time += mean_time;

      rows.push(
        createData(
          r.question,
          right_answers,
          wrong_answers,
          right_answers_perc,
          mean_time
        )
      );
    }
  }

  return (
    <>
      <Typography variant="h5" component="h2">
        Estatísticas do Quiz
      </Typography>
      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.headerRow}>
              <TableCell className={classes.whiteText}>Questões</TableCell>
              <Tooltip
                title="Número de respostas certas recolhidas"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell className={classes.whiteText} align="center">
                  Certas
                </TableCell>
              </Tooltip>

              <Tooltip
                title="Número de respostas erradas recolhidas"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell className={classes.whiteText} align="center">
                  Erradas
                </TableCell>
              </Tooltip>

              <Tooltip
                title="Percentagem de respostas certas"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell className={classes.whiteText} align="center">
                  Certas (%)
                </TableCell>
              </Tooltip>
              <Tooltip
                title="Tempo médio de resposta à pergunta (segundos)"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell className={classes.whiteText} align="center">
                  Tempo (seg)
                </TableCell>
              </Tooltip>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.num_right}</TableCell>
                <TableCell align="center">{row.num_wrong}</TableCell>
                <TableCell align="center">{`${row.perc_right}%`}</TableCell>
                <TableCell align="center">{`${row.mean_time_resp} s`}</TableCell>
              </TableRow>
            ))}

            <TableRow className={classes.totalRow}>
              <Tooltip
                title="Total de todas as respostas deste jogo"
                placement="bottom-end"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell align="right">Total</TableCell>
              </Tooltip>
              <TableCell align="center">{total_right_ans}</TableCell>
              <TableCell align="center">{total_wrong_ans}</TableCell>
              <TableCell align="center">
                {`${total_right_perc / total_games}%`}
              </TableCell>
              <TableCell align="center">{`${
                total_time / total_games
              } s`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableStats;
