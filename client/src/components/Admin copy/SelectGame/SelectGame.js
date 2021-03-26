import React from "react";
import { Route } from "react-router-dom";

import ListGames from "../ListGames";
import Table from "../Table";

const SelectGame = () => {
  return (
    <div>
      <ListGames listType={"selectGame"} />
      <Route path="/admin/games/:allGameRef" component={Table} />
    </div>
  );
};

export default SelectGame;
