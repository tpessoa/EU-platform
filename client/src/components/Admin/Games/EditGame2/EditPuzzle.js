import React, { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import Form from "../../../Form/Form";
import MainContainer from "../../../Form/MainContainer";
import Input from "../../../Form/Input";
import UploadImage from "../../../Form/UploadImage";
import SaveButton from "../../../Form/PrimaryButton";
import Select from "../../../Form/SelectInput";
import { Typography, MenuItem } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";

import { uploadImages } from "../../../../hooks/useUpload";

import * as yup from "yup";
import {
  getRequiredFileSchema,
  getOptionalFileSchema,
} from "../../../Form/data.schemas";
import { usePolls } from "../../../../hooks/usePolls";

export const schemaCreateNew = yup.object().shape({
  poll_id: yup
    .number()
    .required("categoria de votação é obrigatória")
    .moreThan(-1),
  title: yup.string().required(),
  description: yup.string().required(),
  photo: getRequiredFileSchema(),
});

export const schemaEdit = yup.object().shape({
  poll_id: yup
    .number()
    .required("categoria de votação é obrigatória")
    .moreThan(-1),
  title: yup.string().required(),
  description: yup.string().required(),
  photo: getOptionalFileSchema(),
});

const EditPuzzle = (props) => {
  return <div></div>;
};

export default EditPuzzle;
