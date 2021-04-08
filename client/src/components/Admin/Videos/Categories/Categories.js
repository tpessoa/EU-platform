import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Table from "../../Table";
import AddCategory from "../../Buttons/Add";
import BackBtn from "../../Buttons/Back";
import Snackbar from "../../../Snackbar";

const createData = (id, title, thumbnail, actions) => {
  return { id, title, thumbnail, actions };
};

// const rows_hc = [
//   createData(12345, "Frozen yoghurt", 159, actionsCURD),
//   createData(67890, "Ice cream sandwich", 237, actionsCURD),
// ];

const cols_hc = [
  {
    name: "Título",
    align: "left",
  },
  {
    name: "Thumbnail",
    align: "center",
  },
  {
    name: "Ações",
    align: "center",
  },
];

const actionsCURD = ["Editar", "Eliminar"];

const Categories = () => {
  const { state } = useLocation();
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const [displayInfoMessage, setDisplayInfoMessage] = useState(false);
  const [displayDeleteInfo, setDisplayDeleteInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/videos/categories`)
      .then(function (res) {
        const tempRows = [];
        res.data.forEach((elem) => {
          const { _id, title, thumbnail } = elem;
          tempRows.push(createData(_id, title, thumbnail, actionsCURD));
        });

        setRows(tempRows);
        setCols(cols_hc);

        setLoadingCompleted(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // display status message
    if (state) {
      setDisplayInfoMessage({
        info: state.info,
        message: state.message,
      });
    }
  }, [state]);

  const deleteHandler = (row) => {
    axios
      .delete(`/api/videos/category/${row.id}`)
      .then(function (res) {
        // console.log(res.data);
        // update table
        const tempRows = [...rows];
        const rowIndex = tempRows.findIndex((elem) => elem.id === row.id);
        tempRows.splice(rowIndex, 1);
        setRows(tempRows);

        // do confirm

        // display message
        setDisplayDeleteInfo({
          info: "success",
          message: "Categoria eliminada com sucesso",
        });
      })
      .catch(function (error) {
        console.log(error);
        setDisplayDeleteInfo({
          info: "error",
          message: "Ocorreu um erro ao eliminar a categoria",
        });
      });
  };

  let displayTable = "";
  if (loadingCompleted) {
    displayTable = (
      <Table
        rows={rows}
        cols={cols}
        editURL={"/admin/edit/category"}
        setDeleteRow={deleteHandler}
      />
    );
  }

  let displayMessage = "";
  if (displayInfoMessage) {
    displayMessage = (
      <Snackbar
        info={displayInfoMessage.info}
        message={displayInfoMessage.message}
      />
    );
  }

  let displayDeleteMessage = "";
  if (displayDeleteInfo) {
    displayDeleteMessage = (
      <Snackbar
        info={displayDeleteInfo.info}
        message={displayDeleteInfo.message}
      />
    );
  }

  return (
    <Container>
      <BackBtn url={"/admin/videos/menu"}>Voltar</BackBtn>
      {displayTable}
      <AddCategory url={"/admin/edit/category"} objId={"createNew"}>
        Adicionar nova categoria
      </AddCategory>
      {displayMessage}
      {displayDeleteMessage}
    </Container>
  );
};

export default Categories;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
