import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

const EditButton = styled(Button)`
  && {
    font-size: 0.75rem;
  }
`;

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const getColumns = (db_resp) => {
  return [
    { name: "Título", ref: "title" },
    { name: "Ações", ref: "actions" },
  ];
};

const getRows = (db_resp) => {
  let rows_arr = [];
  db_resp.data.games.forEach((row) => {
    rows_arr.push({ title: row.title, actions: "Editar", game_ref: row.ref });
  });
  return rows_arr;
};

const ItemsTable = ({ gameSelected }) => {
  const [gameData, setGameData] = useState({
    columns: [],
    rows: [],
    game_name: "",
  });
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("/api/games/" + gameSelected.refAll)
      .then(function (response) {
        setGameData({
          columns: getColumns(response),
          rows: getRows(response),
          game_name: response.data.name,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [gameSelected]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [];
  gameData.columns.forEach((element) => {
    columns.push({
      id: element.ref,
      label: element.name,
      minWidth: 100,
      align: "left",
    });
  });

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {gameData.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, r_index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={r_index}>
                    {columns.map((column, c_index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={c_index} align={column.align}>
                          {value === "Editar" ? (
                            <EditButton
                              variant="contained"
                              color="primary"
                              component={Link}
                              to={{
                                pathname: `games/edit/${gameData.game_name}`,
                                search: `?id=${row.game_ref}`,
                              }}
                            >
                              {value}
                            </EditButton>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {gameData && (
        <TablePagination
          rowsPerPageOptions={[2, 5, 10]}
          component="div"
          count={gameData.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default ItemsTable;
