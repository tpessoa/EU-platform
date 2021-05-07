import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Redirect } from "react-router-dom";

import Loading from "../UI/Loading";
import Error from "../UI/Error";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const mutation = useMutation((obj) =>
    axios({
      method: "post",
      url: "/api/user/login",
      data: JSON.stringify({
        username: obj.username,
        password: obj.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  const onSubmit = (data) => {
    mutation.mutate({ username: data.username, password: data.password });
  };

  let displaySave = "";
  if (mutation.isLoading) {
    displaySave = <Loading />;
  } else if (mutation.isError) {
    displaySave = <Error error={mutation.error} />;
  } else if (mutation.isSuccess) {
    const res = mutation.data.data;
    if (res.token) {
      localStorage.setItem("token", res.token);
      return <Redirect to="/admin" />;
    }
    displaySave = <p>{res.message}</p>;
  }

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Username"
            inputProps={{ ...register("username", { required: true }) }}
            fullWidth
          />
        </InputField>
        <InputField>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            inputProps={{ ...register("password", { required: true }) }}
            fullWidth
          />
        </InputField>
        <Button type="submit" variant="contained" color="primary">
          Entrar
        </Button>
      </Form>
      {displaySave}
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 60vh;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30%;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1rem;
`;
