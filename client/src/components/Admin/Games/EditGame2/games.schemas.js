import * as yup from "yup";
import {
  getRequiredFileSchema,
  getOptionalFileSchema,
} from "../../../Form/data.schemas";

let createNew;
export const setCreateNew = (value) => (createNew = value);

export const schema = yup.object().shape({
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
