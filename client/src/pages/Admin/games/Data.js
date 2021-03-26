export const puzzleCRUD = [
  {
    ref: "title",
    name: "Título",
    info: "Nome do jogo",
    type: "text",
  },
  {
    ref: "pieces_size",
    name: "Tamanho das peças",
    info:
      "Tamanho das peças do puzzle em pixéis. ex: 100 poucas peças, 70 número considerável de peças, 50 muitas peças",
    type: "text",
  },
  {
    ref: "src",
    name: "Imagem do Puzzle",
    info: "Substituição da imagem atual do puzzle",
    type: "img",
  },
];

export const gameEdit = [
  {
    ref_name: "Título",
    ref: "title",
    type: "String",
  },
  {
    ref_name: "Descrição",
    ref: "description",
    type: "String",
    multiline: true,
  },
  {
    ref_name: "Idade",
    ref: "age",
    type: "Object",
    range: {
      min: 6,
      max: 12,
    },
  },
  {
    ref_name: "Dificuldade",
    ref: "difficulty",
    type: "Number",
    limited: {
      inf: 0,
      sup: 2,
    },
  },
];

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
