export const gameObj = {
  title: "",
  description: "",
  thumbnail: {
    id: "defaultImage",
    path: "",
    server_path: "",
  },
  // age: { min: "", max: "" },
  // difficulty: "",
};

export const puzzleObj = {
  game_ref_name: "puzzle",
  config: {
    pieces_size: "",
    background_puzzle_image: true,
    piece_position_helper: true,
    move_pieces_freely: true,
    timer: false,
    time_to_complete: 0,
  },
  assets: {
    puzzle_image: {
      id: "defaultImage",
      path: "",
      server_path: "",
    },
  },
};

export const colorGameObj = {
  game_ref_name: "colorGame",
  config: {
    colors: [],
    sensibility: 50,
  },
  assets: {
    colored_img: {
      id: "defaultImage",
      path: "",
      server_path: "",
    },
    blank_img: {
      id: "defaultImage",
      path: "",
      server_path: "",
    },
  },
};

export const wordSearchObj = {
  game_ref_name: "wordSearch",
  config: {
    words: [],
    directions: {
      down: true,
      right: true,
      right_down: false,
      left_down: false,
    },
    num_horizontal_cells: "",
    num_vertical_cells: "",
    time_to_complete: 0,
    timer: false,
  },
};

export const quizObj = {
  game_ref_name: "quiz",
  config: {
    questions: [],
    timer: false,
    time_to_resp_question: 0,
  },
};

export const memoryObj = {
  game_ref_name: "memory",
  config: {
    destroy_card: false,
    timer: false,
    time_to_complete: 0,
    max_attempts: 0,
    total_images: 0,
    default_images: 3,
  },
  assets: {
    back_card: {
      id: "defaultImage",
      path: "",
      server_path: "",
    },
    front_cards: [],
  },
};

export const interactiveMapsObj = {
  game_ref_name: "interactiveMaps",
  config: {
    questions: [],
  },
};

export const crossWordsObj = {
  game_ref_name: "crossWords",
  config: {
    crossword_data: {
      across: [],
      down: [],
    },
  },
};
