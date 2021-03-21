import axios from "axios";
import React, { useState, useEffect } from "react";
import GamesCRUD from "../GamesCRUD";
import ListGames from "../ListGames";
import Table from "../Table";

const getColumns = (db_resp) => {
  let columns_arr = [];
  if (db_resp.data.games.length > 0) {
    const temp = db_resp.data.games[0];
    for (const [key, value] of Object.entries(temp)) {
      if (!(key == "_id" || key == "ref")) {
        columns_arr.push(key);
      }
    }
  }
  return columns_arr;
};

const Dashboard = () => {
  const [columns, setColumns] = useState(null);
  const [gameSelected, setGameSelected] = useState(null);

  useEffect(() => {
    if (!gameSelected) return;
    axios
      .get("/api/games/" + gameSelected.refAll)
      .then(function (response) {
        setColumns(getColumns(response));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [gameSelected]);

  return (
    <div>
      <ListGames setGameSelected={setGameSelected} />
      {gameSelected && <Table gameColumns={columns} />}
    </div>
  );
};

export default Dashboard;
