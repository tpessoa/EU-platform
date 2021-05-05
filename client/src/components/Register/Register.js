import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Loading from "../UI/Loading";
import Error from "../UI/Error";

const Register = () => {
  const { register, handleSubmit, errors } = useForm();

  const mutation = useMutation((obj) =>
    axios({
      method: "post",
      url: "/api/user/register",
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
    }
    displaySave = <p>{res.message}</p>;
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <input type="submit" />
      </Form>
      {displaySave}
    </Container>
  );
};

export default Register;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 40vh;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
