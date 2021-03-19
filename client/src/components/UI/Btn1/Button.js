import React from "react";
import { BtnWrapper, Btn } from "./Button.elements";

const Button = (props) => {
  return (
    <BtnWrapper>
      <Btn>{props.children}</Btn>
    </BtnWrapper>
  );
};

export default Button;
