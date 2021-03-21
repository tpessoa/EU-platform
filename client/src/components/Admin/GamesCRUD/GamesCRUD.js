import React from "react";
import Table from "../Table";

const GamesCRUD = ({ type }) => {
  return (
    <div>
      <p>CRUD {type}</p>
      <Table />
    </div>
  );
};

export default GamesCRUD;
