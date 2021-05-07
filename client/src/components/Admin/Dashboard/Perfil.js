import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import styled from "styled-components";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MainContainer from "./Form/MainContainer";
import Form from "./Form/Form";
import Input from "./Form/Input";
import PrimaryButton from "./Form/PrimaryButton";
import { Typography } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required(),
  old_password: yup.string(),
  new_password: yup.string(),
  confir_new_password: yup.string(),
});

const Perfil = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const mutation = useMutation((obj) =>
    axios({
      method: "post",
      url: "/api/user/user-edit",
      data: JSON.stringify({
        userId: userId,
        username: obj.username,
        old_password: obj.old_password,
        new_password: obj.new_password,
        confir_new_password: obj.confir_new_password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  const onSubmit = (data) => {
    mutation.mutate({ ...data });
  };
  const { data: user } = useQuery(
    "getUserTokenData",
    () =>
      axios({
        method: "get",
        url: "/api/user/secret",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const userId = user?.data.id;

  const { isIdle, data: userData, isSuccess, isError } = useQuery(
    "getUserData",
    () =>
      axios({
        method: "get",
        url: "/api/user/user-data",
        params: { userId: userId },
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!userId,
    }
  );

  // if (isSuccess) {
  //   console.log(userData);
  // }
  // if (isError) {
  //   console.log("erro");
  // }
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Editar User
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("username")}
          name="username"
          type="text"
          label="Novo Username"
          error={!!errors.username}
          helperText={errors?.username?.message}
        />
        <Input
          {...register("old_password")}
          name="old_password"
          type="password"
          label="Password Antiga"
          error={!!errors.old_password}
          helperText={errors?.old_password?.message}
        />
        {mutation.isSuccess && <p>{mutation.data.data.message}</p>}
        <Input
          {...register("new_password")}
          name="new_password"
          type="password"
          label="Password Nova"
          error={!!errors.new_password}
          helperText={errors?.new_password?.message}
        />
        <Input
          {...register("confir_new_password")}
          name="confir_new_password"
          type="password"
          label="Confirmar Password Nova"
          error={!!errors.confir_new_password}
          helperText={errors?.confir_new_password?.message}
        />
        <PrimaryButton>Guardar</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Perfil;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 60vh;
  width: 100%;
`;

// const Form = styled.form`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   width: 40%;
// `;

const InputField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1rem;
`;

// <Container>
//   <Form onSubmit={handleSubmit(onSubmit)}>
//     <InputField>
//       <TextField
//         id="outlined-basic"
//         variant="outlined"
//         label="Novo Username"
//         inputProps={{ ...register("username", { required: true }) }}
//         fullWidth
//       />
//     </InputField>
//     <InputField>
//       <TextField
//         id="outlined-password-input"
//         label="Password antiga"
//         type="password"
//         autoComplete="current-password"
//         variant="outlined"
//         inputProps={{
//           ...register("old_password", {
//             required: true,
//             minLength: { value: 3, message: "Password muito pequena" },
//           }),
//         }}
//         fullWidth
//       />
//       {errors.old_password && errors.old_password.message}
//     </InputField>
//     <InputField>
//       <TextField
//         id="outlined-password-input"
//         label="Nova Password"
//         type="password"
//         autoComplete="current-password"
//         variant="outlined"
//         inputProps={{ ...register("new_password", { required: true }) }}
//         fullWidth
//       />
//     </InputField>
//     <InputField>
//       <TextField
//         id="outlined-password-input"
//         label="Confirmar nova Password"
//         type="password"
//         autoComplete="current-password"
//         variant="outlined"
//         inputProps={{
//           ...register("confirm_new_password", { required: true }),
//         }}
//         fullWidth
//       />
//     </InputField>
//     <Button type="submit" variant="contained" color="primary">
//       Guardar
//     </Button>
//   </Form>
// </Container>
