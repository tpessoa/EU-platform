import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import EditButton from "../Buttons/Edit";
import DeleteButton from "../Buttons/Delete";
import Image from "../Card";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const ActionTable = (props) => {
  const { rows, cols, editURL, onlineImage, setDeleteRow } = props;

  return (
    <Container>
      <TableCustom component={Paper}>
        <Table aria-label="simple table">
          <TableHeadCustom>
            <TableRow>
              {cols.map((col, index) => {
                return (
                  <TableCell key={index} align={col.align}>
                    {col.name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHeadCustom>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="center">
                  <ImageWrapper>
                    <Image
                      imageObj={row.thumbnail}
                      onlineImage={onlineImage}
                      width={"100px"}
                      height={"100px"}
                    />
                  </ImageWrapper>
                </TableCell>
                <TableCell align="center">
                  {row.actions.map((action, index) => {
                    if (action === "Editar") {
                      return (
                        <EditButton
                          url={editURL}
                          objId={row.id}
                          redirect={true}
                          key={index}
                        >
                          {action}
                        </EditButton>
                      );
                    } else if (action === "Eliminar") {
                      return (
                        <DeleteButton
                          key={index}
                          deleteHandler={() => setDeleteRow(row)}
                        >
                          {action}
                        </DeleteButton>
                      );
                    }
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCustom>
    </Container>
  );
};

export default ActionTable;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const TableCustom = styled(Table)`
  && {
    width: 80%;
    margin: 1rem;
  }
`;

const TableCellCustom = styled.div``;

const TableHeadCustom = styled(TableHead)`
  && {
    background-color: #c9c9c9;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
