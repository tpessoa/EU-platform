import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

import ConfirmDialog from "../ConfirmDialog";

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

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const initTableColumns = () => {
  const cols = [
    { name: "Título", ref: "title" },
    { name: "Ações", ref: "actions" },
  ];
  return cols;
};
const initTableRows = () => {
  const rows = [
    {
      title: "(sem informação)",
      actions: "-",
    },
  ];
  return rows;
};
const formatRows = (arr) => {
  let temp_arr = [];
  arr.forEach((obj) => {
    temp_arr.push({ title: obj.title, game_id: obj._id });
  });
  return temp_arr;
};

const getGameInfoNames = (arr, name_ref) => {
  return arr.find((elem) => elem.game_ref_name === name_ref);
};

const GamesTable = (props) => {
  // const { selectedGame } = props;
  const { gamesNames, setGame } = props;
  const { game } = useParams();
  const selectedGame = getGameInfoNames(gamesNames, game);

  const [tableData, setTableData] = useState({
    columns: initTableColumns(),
    rows: initTableRows(),
  });
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteGame, setDeleteGame] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    axios
      .get("/api/games/" + selectedGame.game_ref_id)
      .then(function (res) {
        if (res.data.length > 0) {
          setTableData({
            columns: initTableColumns(),
            rows: formatRows(res.data),
          });
        } else {
          setTableData({
            columns: initTableColumns(),
            rows: initTableRows(),
          });
        }

        setGame(game);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [selectedGame]);

  useEffect(() => {
    if (confirmDelete) {
      // delete request
      axios
        .delete(`/api/games/${deleteGame.game_id}`)
        .then(function (res) {
          // verify success, if the deletedCount is 1 the document was successfully deleted
          if (res.data.deletedCount != 1) return;
          // copy the old rows
          const tempObj = { ...tableData };
          const rowObjIndex = tempObj.rows.findIndex(
            (obj) => obj.game_id === deleteGame.game_id
          );
          tempObj.rows.splice(rowObjIndex, 1);
          // TODO delete image in server!!
          // update the rows
          setTableData(tempObj);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [confirmDelete]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [];
  tableData.columns.forEach((element) => {
    columns.push({
      id: element.ref,
      label: element.name,
      minWidth: 100,
      align: "left",
    });
  });

  let displayDialog = "";
  if (deleteGame) {
    console.log(deleteGame);
    displayDialog = (
      <ConfirmDialog
        contentText={`De certeza que pretende eliminar o jogo com o título ${deleteGame.title}?`}
        gameInfo={deleteGame}
        setDelete={setDeleteGame}
        setConfirm={setConfirmDelete}
      />
    );
  }

  return (
    <>
      {displayDialog}
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
            {tableData.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, r_index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={r_index}>
                    {columns.map((column, c_index) => {
                      const value = row[column.id];
                      if (column.id === "actions") {
                        return (
                          <TableCell key={c_index} align={column.align}>
                            <EditButton
                              variant="contained"
                              color="primary"
                              component={Link}
                              to={{
                                pathname: `/admin/edit/game/${selectedGame.game_ref_name}`,
                                search: `?id=${row.game_id}`,
                              }}
                            >
                              Editar
                            </EditButton>
                            <DeleteButton
                              variant="contained"
                              color="primary"
                              onClick={() => setDeleteGame(row)}
                            >
                              Eliminar
                            </DeleteButton>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={c_index} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TabeleUtils>
        <AddGameWrapper>
          <AddGameButton
            variant="contained"
            color="primary"
            component={Link}
            to={{
              pathname: `/admin/edit/game/${selectedGame.game_ref_name}`,
              search: "?id=createNew",
            }}
          >
            Adicionar Jogo
          </AddGameButton>
        </AddGameWrapper>
        {tableData && (
          <TablePagination
            rowsPerPageOptions={[2, 5, 10]}
            component="div"
            count={tableData.rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </TabeleUtils>
    </>
  );
};

export default GamesTable;

const TabeleUtils = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const AddGameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  && {
    justify-content: flex-start;
  }
`;

const EditButton = styled(Button)`
  && {
    font-size: 0.75rem;
  }
`;
const DeleteButton = styled(Button)`
  && {
    font-size: 0.75rem;
    background-color: #880000;
  }
`;

const AddGameButton = styled(Button)`
  && {
    font-size: 0.75rem;
    background-color: green;
  }
`;