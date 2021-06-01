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

const useStyles = makeStyles({
  root: {
    width: "80%",
  },
  table: {
    minWidth: 650,
  },
});

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

const TableStats = (props) => {
  const { setGame, gameStats } = props;
  const classes = useStyles();
  const { gameId } = useParams();

  useEffect(() => {
    setGame(gameId);
  }, [gameId]);

  console.log(gameStats && gameStats.total_answers);

  const rows = [];
  if (gameStats) {
    for (const r of gameStats.total_answers) {
      console.log(r);
      rows.push(
        createData(
          r.question,
          answersCounter(r.right, true),
          answersCounter(r.right, false),
          rightAnswersPerc(r.right),
          10
        )
      );
    }
  }

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Estatísticas do Quiz
      </Typography>
      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Questões</TableCell>
              <Tooltip
                title="Número de respostas certas recolhidas"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell align="right">Certas</TableCell>
              </Tooltip>

              <Tooltip
                title="Número de respostas erradas recolhidas"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell align="right">Erradas</TableCell>
              </Tooltip>

              <Tooltip
                title="Percentagem de respostas certas"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell align="right">Certas (%)</TableCell>
              </Tooltip>
              <Tooltip
                title="Tempo médio de resposta à pergunta (segundos)"
                placement="top-start"
                arrow
                TransitionComponent={Zoom}
              >
                <TableCell align="right">Tempo (seg)</TableCell>
              </Tooltip>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.num_right}</TableCell>
                <TableCell align="right">{row.num_wrong}</TableCell>
                <TableCell align="right">{`${row.perc_right}%`}</TableCell>
                <TableCell align="right">{row.mean_time_resp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableStats;
