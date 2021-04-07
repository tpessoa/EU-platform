import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "../../Table";
import AddCategory from "../../Buttons/Add";

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
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [loadingCompleted, setLoadingCompleted] = useState(false);

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
  let displayTable = "";
  if (loadingCompleted) {
    displayTable = <Table rows={rows} cols={cols} />;
  }

  return (
    <>
      {displayTable}
      <AddCategory url={"/admin/edit/category"} objId={"createNew"}>
        Adicionar nova categoria
      </AddCategory>
    </>
  );
};

export default Categories;
