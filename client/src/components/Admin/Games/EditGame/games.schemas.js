import * as yup from "yup";
import {
  getRequiredFileSchema,
  getOptionalFileSchema,
} from "../../../Form/data.schemas";

import {
  questionsRequiredMsg,
  answerRequiredMsg,
  wordSearchWordRequiredMsg,
  wordSearchWordsRequiredMsg,
  colorRequiredMsg,
  colorsRequiredMsg,
  geralNotEmpty,
  geralNumCellsWordSearch,
} from "./errorMessages";

export const getSchemaPuzzle = (createNew) => {
  return yup.object().shape({
    title: yup.string().required(geralNotEmpty),
    description: yup.string().required(geralNotEmpty),
    difficulty: yup.number().required(),
    thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
    config: yup.object().shape({
      pieces_size: yup.number().required(),
      background_puzzle_image: yup.boolean(),
      piece_position_helper: yup.boolean(),
      move_pieces_freely: yup.boolean(),
      timer: yup.boolean(),
      time_to_complete: yup.number().when("timer", {
        is: true,
        then: yup
          .number()
          .min(0)
          .max(3 * 60) // 3 min
          .required(
            "O tempo deve ser superior a 0 segundos e inferior a 200 segundos"
          ),
      }),
    }),
    assets: yup.object().shape({
      puzzle_image: createNew
        ? getRequiredFileSchema()
        : getOptionalFileSchema(),
    }),
  });
};

export const getSchemaColorGame = (createNew) => {
  return yup.object().shape({
    title: yup.string().required(geralNotEmpty),
    description: yup.string().required(geralNotEmpty),
    difficulty: yup.number().required(),
    thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
    config: yup.object().shape({
      colors: yup
        .array()
        .of(
          yup.object().shape({
            code: yup.string().required(colorRequiredMsg),
          })
        )
        .min(7, colorsRequiredMsg)
        .required(),
      sensibility: yup.number().required(),
    }),
    assets: yup.object().shape({
      blank_img: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
      colored_img: createNew
        ? getRequiredFileSchema()
        : getOptionalFileSchema(),
    }),
  });
};
export const getSchemaWordSearch = (createNew) => {
  return yup.object().shape({
    title: yup.string().required(geralNotEmpty),
    description: yup.string().required(geralNotEmpty),
    difficulty: yup.number().required(),
    thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
    config: yup.object().shape({
      words: yup
        .array()
        .of(
          yup.object().shape({
            word: yup.string().required(wordSearchWordRequiredMsg),
          })
        )
        .min(3, wordSearchWordsRequiredMsg)
        .required(),
      num_horizontal_cells: yup
        .number()
        .min(5)
        .max(30)
        .required(geralNumCellsWordSearch),
      num_vertical_cells: yup
        .number()
        .min(5)
        .max(30)
        .required(geralNumCellsWordSearch),
      timer: yup.boolean(),
      time_to_complete: yup.number().when("timer", {
        is: true,
        then: yup
          .number()
          .min(0)
          .max(3 * 60) // 3 min
          .required(
            "O tempo deve ser superior a 0 segundos e inferior a 200 segundos"
          ),
      }),
    }),
  });
};
export const getSchemaQuiz = (createNew) => {
  return yup.object().shape({
    title: yup.string().required(geralNotEmpty),
    description: yup.string().required(geralNotEmpty),
    difficulty: yup.number().required(),
    thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
    config: yup.object().shape({
      questions: yup
        .array()
        .of(
          yup.object().shape({
            question: yup.string().required(),
            answer1: yup.string().required(answerRequiredMsg),
            answer2: yup.string().required(answerRequiredMsg),
            answer3: yup.string().required(answerRequiredMsg),
            answer4: yup.string().required(answerRequiredMsg),
            right_answer: yup.number().required(),
            justification: yup.string().required(),
          })
        )
        .min(1, questionsRequiredMsg)
        .required(),
      timer: yup.boolean(),
      time_to_resp_question: yup.number().when("timer", {
        is: true,
        then: yup
          .number()
          .min(0)
          .max(3 * 60) // 3 min
          .required(
            "O tempo deve ser superior a 0 segundos e inferior a 200 segundos"
          ),
      }),
    }),
  });
};
export const getSchemaMemory = (createNew) => {
  return yup.object().shape({
    title: yup.string().required(geralNotEmpty),
    description: yup.string().required(geralNotEmpty),
    difficulty: yup.number().required(),
    thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
    config: yup.object().shape({
      destroy_card: yup.bool(),
      max_attempts: yup.number(),
      total_images: yup.number(),
      turn_speed: yup.number(),
      timer: yup.boolean(),
      time_to_complete: yup.number().when("timer", {
        is: true,
        then: yup
          .number()
          .min(0)
          .max(3 * 60) // 3 min
          .required(
            "O tempo deve ser superior a 0 segundos e inferior a 200 segundos"
          ),
      }),
    }),
    assets: yup.object().shape({
      front_cards: yup.array().required(),
    }),
  });
};
export const getSchemaInteractiveMaps = (createNew) => {
  return yup.object().shape({
    title: yup.string().required(geralNotEmpty),
    description: yup.string().required(geralNotEmpty),
    difficulty: yup.number().required(),
    thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
    config: yup.object().shape({
      questions: yup
        .array()
        .of(
          yup.object().shape({
            question: yup.string().required(),
            right_answer: yup.number().required(),
            justification: yup.string().required(),
          })
        )
        .min(1, questionsRequiredMsg)
        .required(),
    }),
  });
};
export const getSchemaCrossWords = (createNew) => {
  return yup.object().shape({
    title: yup.string().required(geralNotEmpty),
    description: yup.string().required(geralNotEmpty),
    difficulty: yup.number().required(),
    thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
    config: yup.object().shape({
      crossword_data: yup.object().shape({
        across: yup
          .array()
          .of(
            yup.object().shape({
              num: yup
                .number()
                .min(0, "deve ser um número positivo")
                .required(),
              clue: yup.string().required(),
              answer: yup
                .string()
                .uppercase("A resposta deverá ser em letras maiúsculas")
                .required(),
              row: yup.number().min(0).required(),
              col: yup.number().min(0).required(),
            })
          )
          .min(1, questionsRequiredMsg)
          .required(),
        down: yup
          .array()
          .of(
            yup.object().shape({
              num: yup
                .number()
                .min(0, "deve ser um número positivo")
                .required(),
              clue: yup.string().required(),
              answer: yup
                .string()
                .uppercase("A resposta deverá ser em letras maiúsculas")
                .required(),
              row: yup.number().min(0).required(),
              col: yup.number().min(0).required(),
            })
          )
          .min(1, questionsRequiredMsg)
          .required(),
      }),
    }),
  });
};
