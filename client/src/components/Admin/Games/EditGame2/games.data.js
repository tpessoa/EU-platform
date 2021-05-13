export const gameObj = {
  title: "",
  description: "",
  thumbnail: {
    id: "defaultImage",
    path: "",
    server_path: "",
  },
  age: { min: "", max: "" },
  difficulty: "",
};

export const puzzleObj = {
  game_ref_name: "puzzle",
  config: {
    pieces_size: "",
    background_puzzle_image: true,
    piece_position_helper: true,
    move_pieces_freely: true,
    time: false,
    time_to_complete: null,
  },
  assets: {
    puzzle_image: {
      id: "defaultImage",
      path: "",
      server_path: "",
    },
  },
};
