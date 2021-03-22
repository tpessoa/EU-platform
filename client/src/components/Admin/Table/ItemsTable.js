import React from "react";
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

const ItemsTable = ({ gameData }) => {
  // console.log(gameData);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
                            <EditButton variant="contained" color="primary">
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
      <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={gameData.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ItemsTable;

{
  /* {column.format && typeof value === "number"
                            ? column.format(value)
                            : value} */
}
