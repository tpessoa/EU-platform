import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import styled from "styled-components";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import Image from "../../Card";
import { useWorksInPoll, useDeleteWork } from "../../../../hooks/usePolls";

import { makeStyles } from "@material-ui/core/styles";
import TableMUI from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import DeleteBtn from "../../Buttons/Delete";

const createData = (id, title, photo, actions) => {
  return { id, title, photo, actions };
};

const generateRows = (data) => {
  const tempRows = [];
  data.forEach((elem) => {
    const { _id, title, photo } = elem;
    tempRows.push(createData(_id, title, photo));
  });
  return tempRows;
};

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    align: theme.right,
  },
  deleteBtn: {
    backgroundColor: red,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Table = (props) => {
  const classes = useStyles();
  const { poll } = props;

  const works = useWorksInPoll(poll);

  if (works.isLoading) return <Loading />;
  if (works.isError) return <Error error={works.error} />;

  const rows = generateRows(works.data);

  return (
    <TableContainer component={Paper}>
      <TableMUI className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Avatar do trabalho</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {works.data &&
            rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>
                  {/* <Avatar
                    className={classes.large}
                    alt={row.photo.id}
                    src={`${row.photo.path + row.photo.server_path}`}
                  /> */}
                  <ImageWrapper>
                    <Image
                      imageObj={row.photo}
                      width={"100px"}
                      height={"100px"}
                    />
                  </ImageWrapper>
                </TableCell>
                <TableCell>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`works/edit/${row.id}`}
                  >
                    Editar
                  </Button>
                  <DeleteBtn
                    deleteURL={`/api/polls/delete-work/${row.id}`}
                    fetchQuery={"works"}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </TableMUI>
    </TableContainer>
  );
};

export default Table;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
