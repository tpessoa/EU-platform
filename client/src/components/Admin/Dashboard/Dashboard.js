import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import GamesCRUD from "../GamesCRUD";
import ListGames from "../ListGames";
import Table from "../Table";

const getColumns = (db_resp) => {
  return [
    { name: "Título", ref: "title" },
    { name: "Ações", ref: "actions" },
  ];
};

const getRows = (db_resp) => {
  let rows_arr = [];
  db_resp.data.games.forEach((row) => {
    rows_arr.push({ title: row.title, actions: "Editar" });
  });
  return rows_arr;
};

const Dashboard = () => {
  const [gameData, setGameData] = useState({
    columns: [],
    rows: [],
  });
  const [gameSelected, setGameSelected] = useState(null);

  useEffect(() => {
    if (!gameSelected) return;
    axios
      .get("/api/games/" + gameSelected.refAll)
      .then(function (response) {
        setGameData({
          columns: getColumns(response),
          rows: getRows(response),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [gameSelected]);

  return (
    <div>
      <ListGames setGameSelected={setGameSelected} />
      <Route
        path="/admin/games/:game"
        component={() => <Table gameData={gameData} />}
      />
      {/* {gameSelected && <Table gameData={gameData} />} */}
    </div>
  );
};

export default Dashboard;
