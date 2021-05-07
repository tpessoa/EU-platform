import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import styled from "styled-components";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MainContainer from "../../Form/MainContainer";
import Form from "../../Form/Form";
import Input from "../../Form/Input";
import PrimaryButton from "../../Form/PrimaryButton";
import { Typography } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Perfil = () => {
  const schema = yup.object().shape({
    username: yup.string().required("Username é obrigatório"),
    old_password: yup
      .string("Confirmação da Password antiga é obrigatória")
      .test(
        "password_async_validation",
        "Password incorreta",
        async (value) => {
          let flag = false;
          await axios({
            method: "post",
            url: "/api/user/user-verification",
            data: { userId: userId, password: value },
          }).then(
            (res) => {
              flag = res.data.message;
            },
            (error) => {
              console.log(error);
            }
          );
          return flag;
        }
      ),
    new_password: yup.string().required("Password é obrigatória"),
    confir_new_password: yup
      .string()
      .oneOf([yup.ref("new_password"), null], "Passwords não são iguais!")
      .required("Confirmação da password é obrigatória"),
  });

  const mutation = useMutation((obj) =>
    axios({
      method: "post",
      url: "/api/user/user-edit",
      data: JSON.stringify({
        userId: userId,
        username: obj.username,
        password: obj.new_password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  const onSubmit = (data) => {
    mutation.mutate({ ...data });
  };
  const { data: user, isSuccess: isUser } = useQuery(
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let feedback = "";
  if (mutation.isLoading) {
    feedback = <Loading />;
  } else if (mutation.isSuccess) {
    console.log(mutation.data.data);
    feedback = <p>Sucesso</p>;
    // set the new token
    localStorage.setItem("token", mutation.data.data.token);
  } else if (mutation.isError) {
    feedback = <p>Ocorreu um erro</p>;
  }

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
        {feedback}
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
