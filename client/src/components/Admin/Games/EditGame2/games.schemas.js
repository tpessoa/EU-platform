import * as yup from "yup";
import {
  getRequiredFileSchema,
  getOptionalFileSchema,
} from "../../../Form/data.schemas";

let createNew;
export const setCreateNew = (value) => (createNew = value);

export const schemaPuzzle = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
  config: yup.object().shape({
    pieces_size: yup.number().required(),
    background_puzzle_image: yup.boolean(),
    piece_position_helper: yup.boolean(),
    move_pieces_freely: yup.boolean(),
    time: yup.boolean(),
    time_to_complete: yup.number().when("time", {
      is: true,
      then: yup
        .number()
        .nullable(true)
        .transform((_, val) => (val === val ? val : null))
        .when("time", {
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
    // .when("time", {
    //   is: false,
    //   then: yup.string(),
    // }),
  }),
  assets: yup.object().shape({
    puzzle_image: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
  }),
});

export const schemaColorGame = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
});

export const schemaWordSearch = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
  config: yup.object().shape({
    words: yup.array().required(),
    num_horizontal_cells: yup.number().required(),
    num_vertical_cells: yup.number().required(),
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

export const schemaQuiz = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
});

export const schemaMemory = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
  config: yup.object().shape({
    // destroy_card: yup.bool(),
    // max_attempts: yup.number().required(),
    // total_images: yup.number().required(),
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

export const schemaInteractiveMaps = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
});

export const schemaCrossWords = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: createNew ? getRequiredFileSchema() : getOptionalFileSchema(),
});
