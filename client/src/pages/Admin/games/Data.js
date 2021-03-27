export const gameEdit = [
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
];

export const puzzleCRUD = {
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
