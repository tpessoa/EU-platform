import React from "react";

import TextField from "../../TextInput/TextField";
import ListField from "../../TextInput/ListField";
import ImageField from "../ImageField";

import styled from "styled-components";

const AgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 89%;
`;

const AgeWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const generateLimitedNumbers = (inf, sup) => {
  let temp = [];
  for (let i = inf; i <= sup; i++) temp.push(i);
  return temp;
};

const FieldType = (props) => {
  let display = "";
  const {
    obj,
    label,
    value,

    textChange,
    listChange,
    ageChange,
    imageChange,

    type,
    setUploaded,
  } = props;

  if (obj.type === "String") {
    // check if its a multiline string
    let multiline = obj.multiline ? true : false;
    display = (
      <TextField
        field_ref={obj.ref}
        label={label}
        value={value}
        parentChangeHandler={textChange}
        multi={multiline}
        paramType={type}
      />
    );
  } else if (obj.type === "Number") {
    if (obj.limited) {
      const arr = generateLimitedNumbers(obj.limited.inf, obj.limited.sup);
      display = (
        <ListField
          arr={arr}
          field_ref={obj.ref}
          label={label}
          value={value}
          parentChangeHandler={listChange}
          paramType={type}
        />
      );
    } else {
      display = (
        <TextField
          field_ref={obj.ref}
          label={label}
          value={value}
          parentChangeHandler={textChange}
          paramType={type}
        />
      );
    }
  } else if (obj.type === "Object") {
    display = (
      <AgeContainer>
        <AgeWrapper>
          <TextField
            field_ref={"min"}
            label={label + " Mínima"}
            value={obj.range.min}
            parentChangeHandler={ageChange}
            paramType={type}
          />
        </AgeWrapper>
        <AgeWrapper>
          <TextField
            field_ref={"max"}
            label={label + " Máxima"}
            value={obj.range.max}
            parentChangeHandler={ageChange}
            paramType={type}
          />
        </AgeWrapper>
      </AgeContainer>
    );
  } else if (obj.type === "Image") {
    display = (
      <ImageField
        field_ref={obj.ref}
        imageObj={value}
        parentChangeHandler={imageChange}
      />
    );
  }

  return <>{display}</>;
};

export default FieldType;
