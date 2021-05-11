import * as yup from "yup";
import { verifyImageFileType } from "../../../../globalFuncUtils";

export const schemaCreateNew = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  // thumbnail: yup.object().required(),
  thumbnail: yup
    .mixed()
    .test("null", "Deve inserir um ficheiro", (value) => {
      if (value.length) return true;
      if (!value.length) return false; // attachment is optional
    })
    .test(
      "fileType",
      "Tipo de ficheiro não suportado, apenas .jpg, .jpeg e .png",
      (value) => {
        if (!value.length) return false; // attachment is optional
        return verifyImageFileType(value[0].type);
      }
    )
    .test("fileSize", "Ficheiro muito grande, 5 MB Máx.", (value) => {
      if (!value.length) return false; // attachment is optional
      return value[0].size <= 5 * 1024 * 1024; // 8MB
    }),
});

export const schemaEdit = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: yup.object().required(),
  // thumbnail: yup
  //   .mixed()
  //   // .test("null", "Deve inserir um ficheiro", (value) => {
  //   //   if (!value.length) return false; // attachment is optional
  //   //   if (value.length) return true; // attachment is optional
  //   // })
  //   .test(
  //     "fileType",
  //     "Tipo de ficheiro não suportado, apenas .jpg, .jpeg e .png",
  //     (value) => {
  //       if (!value.length) return true; // attachment is optional
  //       return verifyImageFileType(value[0].type);
  //     }
  //   )
  //   .test("fileSize", "Ficheiro muito grande, 5 MB Máx.", (value) => {
  //     if (!value.length) return true; // attachment is optional
  //     return value[0].size <= 5 * 1024 * 1024; // 8MB
  //   }),
});
