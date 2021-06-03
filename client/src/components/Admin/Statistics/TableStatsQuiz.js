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
const wrongStatsMessage =
  "Se alterar as definições do quiz (adicionar pergunta, eliminar, colocar perguntas com tempo, etc) recomenda-se que dê reset às estatísitcas, pois estas correm o risco de estarem mal caculadas por terem os dados antigos!";

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

const TableStatsQuiz = (props) => {
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
  const gameConfig = gameInfo.data.config;
  let total_right_ans = 0;
  let total_wrong_ans = 0;
  let total_right_ans_perc = 0;
  let total_mean_resp_time = 0;
  let total_games = 1;
  let total_questions = 1;

  // verify length questions != length all answers

  console.log(gameData);

  if (gameData) {
    total_games = gameData.all_answers.length;
    total_questions = gameConfig.questions.length;

    for (let i = 0; i < total_questions; i++) {
      let question_right_answers = 0;
      let question_wrong_answers = 0;
      let question_right_answers_perc = 0;
      let total_answers_time = 0;
      for (const game of gameData.all_answers) {
        game[i].correct ? question_right_answers++ : question_wrong_answers++;
        game[i].user_time
          ? (total_answers_time += game[i].user_time)
          : (total_answers_time += 0);
      }
      total_right_ans += question_right_answers;
      total_wrong_ans += question_wrong_answers;

      question_right_answers_perc +=
        (question_right_answers / total_games) * 100;

      total_right_ans_perc += question_right_answers / total_games;

      total_answers_time = total_answers_time / gameData.all_answers.length;
      total_mean_resp_time += total_answers_time;

      rows.push(
        createData(
          gameConfig.questions[i].question,
          question_right_answers,
          question_wrong_answers,
          question_right_answers_perc,
          gameConfig.timer ? total_answers_time : 0
        )
      );
    }
  }

  return (
    <>
      <Typography variant="h5" component="h2">
        Estatísticas do Quiz
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
          {gameData && (
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.num_right}</TableCell>
                  <TableCell align="center">{row.num_wrong}</TableCell>
                  <TableCell align="center">{`${row.perc_right.toFixed(
                    decimals
                  )}%`}</TableCell>
                  <TableCell align="center">{`${row.mean_time_resp.toFixed(
                    decimals
                  )} s`}</TableCell>
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
                  {`${((total_right_ans_perc / total_questions) * 100).toFixed(
                    decimals
                  )}%`}
                </TableCell>
                <TableCell align="center">{`${(
                  total_mean_resp_time / total_questions
                ).toFixed(decimals)} s`}</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => resetStats.mutate(gameId)}
      >
        Reset Estatísitcas
      </Button>
    </>
  );
};

export default TableStatsQuiz;
