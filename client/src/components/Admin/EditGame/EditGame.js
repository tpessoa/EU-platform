import React from "react";

import GamesCRUD from "../GamesCRUD";

const EditGame = ({ gamesInfo }) => {
  console.log(gamesInfo);
  return (
    <div>
      <GamesCRUD gamesInfo={gamesInfo} />
    </div>
  );
};

export default EditGame;
