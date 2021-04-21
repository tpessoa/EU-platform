import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const CustomButton = (props) => {
  const { btnText, clickHandler, filled } = props;

  let variant = "";
  if (filled) {
    variant = "contained";
  } else {
    variant = "outlined";
  }
  return (
    <Container>
      <Button
        variant={variant}
        size="medium"
        color="primary"
        onClick={clickHandler}
      >
        {btnText}
      </Button>
    </Container>
  );
};

export default CustomButton;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
`;
