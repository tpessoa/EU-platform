import {
  setCreateNew,
  schemaPuzzle,
  schemaColorGame,
  schemaWordSearch,
  schemaQuiz,
  schemaMemory,
  schemaInteractiveMaps,
  schemaCrossWords,
} from "./games.schemas";

export const getDefValues = (game, fields) => {
  const { title, description, difficulty, config, assets } = fields;
  let defValues = {};
  if (game === "puzzle") {
    defValues = {
      title: title,
      description: description,
      difficulty: difficulty,
      config: {
        timer: config.timer,
        time_to_complete: config.time_to_complete,
        pieces_size: config.pieces_size,
        background_puzzle_image: config.background_puzzle_image,
        piece_position_helper: config.piece_position_helper,
        move_pieces_freely: config.move_pieces_freely,
        directions: config.time,
      },
    };
  } else if (game === "colorGame") {
    defValues = {
      title: title,
      description: description,
      difficulty: difficulty,
      config: {
        colors: config.colors,
        sensibility: config.sensibility,
      },
      assets: {
        colored_img: config.colored_img,
        blank_img: config.blank_img,
      },
    };
  } else if (game === "wordSearch") {
    defValues = {
      title: title,
      description: description,
      difficulty: difficulty,
      config: {
        words: config.words,
        directions: config.directions,
        num_horizontal_cells: config.num_horizontal_cells,
        num_vertical_cells: config.num_vertical_cells,
        time_to_complete: config.time_to_complete,
        timer: config.timer,
      },
    };
  } else if (game === "quiz") {
    defValues = {
      title: title,
      description: description,
      difficulty: difficulty,
      config: {
        questions: config.questions,
        timer: config.timer,
        time_to_resp_question: config.time_to_resp_question,
      },
    };
  } else if (game === "memory") {
    defValues = {
      title: title,
      description: description,
      difficulty: difficulty,
      config: {
        destroy_card: config.destroy_card,
        turn_speed: config.turn_speed,
        timer: config.timer,
        time_to_complete: config.time_to_complete,
        max_attempts: config.max_attempts,
        total_images: config.total_images,
      },
      assets: {
        front_cards: assets.front_cards,
      },
    };
  } else if (game === "interactiveMaps") {
    defValues = {
      title: title,
      description: description,
      difficulty: difficulty,
      config: {
        questions: config.questions,
      },
    };
  } else if (game === "crossWords") {
    defValues = {
      title: title,
      description: description,
      difficulty: difficulty,
      config: {
        crossword_data: {
          across: config.crossword_data.across,
          down: config.crossword_data.down,
        },
      },
    };
  }
  return defValues;
};

export const getSchemas = (game) => {
  let gameSchema;
  if (game === "puzzle") {
    gameSchema = schemaPuzzle;
  } else if (game === "colorGame") {
    gameSchema = schemaColorGame;
  } else if (game === "wordSearch") {
    gameSchema = schemaWordSearch;
  } else if (game === "quiz") {
    gameSchema = schemaQuiz;
  } else if (game === "memory") {
    gameSchema = schemaMemory;
  } else if (game === "interactiveMaps") {
    gameSchema = schemaInteractiveMaps;
  } else if (game === "crossWords") {
    gameSchema = schemaCrossWords;
  }
  return gameSchema;
};
