export const gamesIDsRefs = [
  {
    game_ref_id: 1,
    game_ref_name: "colorGame",
    game_name: "Jogo de Colorir",
  },
  {
    game_ref_id: 2,
    game_ref_name: "puzzle",
    game_name: "Puzzle",
  },
  {
    game_ref_id: 3,
    game_ref_name: "quiz",
    game_name: "Quiz",
  },
  {
    game_ref_id: 4,
    game_ref_name: "wordSearch",
    game_name: "Sopa de Letras",
  },
];

export const geralGameEdit = {
  /**
   * Object that is present in all the games and that have:
   * - labels for displaying in the UI
   * - ref that is the key to get the values inside the object from database
   * - type to dynamically generate the inputs in UI for the user interaction
   */
  info: [
    {
      label: "Título",
      ref: "title",
      type: "String",
    },
    {
      label: "Descrição",
      ref: "description",
      type: "String",
      multiline: true,
    },
    {
      label: "Idade",
      ref: "age",
      type: "Object",
      range: {
        min: 6,
        max: 12,
      },
    },
    {
      label: "Dificuldade",
      ref: "difficulty",
      type: "Number",
      limited: {
        inf: 0,
        sup: 2,
      },
    },
  ],
  /**
   * Empty object generic for all the games for the user fill in
   */
  defaultInputs: {
    title: "",
    description: "",
    age: {},
    difficulty: 0,
    assets: { images: [] },
    config: [],
  },
};

export const puzzleInfo = {
  assets: {
    images: [
      {
        label: "Imagem do puzzle",
        ref: "final_img",
        type: "Image",
      },
    ],
  },
  config: [
    {
      label: "Tamanho das peças",
      ref: "pieces_size",
      type: "Number",
    },
  ],
};

export const puzzleDefaultInputs = {
  assets: {
    images: {
      final_img: {
        id: "defaultImage",
        path: "",
        server_path: "",
      },
    },
  },
  config: {
    pieces_size: 0,
  },
};

/**
 * Object with all games information
 */

export const SpecificGameEdit = {
  puzzle: {
    info: { ...puzzleInfo },
    defaultInputs: { ...puzzleDefaultInputs },
  },
};
