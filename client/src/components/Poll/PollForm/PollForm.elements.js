import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* background-color: #d9d9d9; */

  @media screen and (max-width: 960px) {
  }
`;

export const Form = styled.form`
  margin: 5px;
  width: 100%;
  height: 100%;
  margin: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const FormInputs = styled.div`
  margin-bottom: 0.5rem;
  width: 80%;

  p {
    font-size: 0.8rem;
    margin-top: 0.5rem;
    color: #f00e0e;
  }
`;

export const Label = styled.label`
  display: inline-block;
  font-size: 0.8rem;
  margin-bottom: 6px;
  color: #fff;
`;
export const Input = styled.input`
  display: block;
  padding-left: 10px;
  outline: none;
  border-radius: 2px;
  height: 40px;
  width: 100%;
  border: none;

  &::placeholder {
    color: #595959;
    font-size: 12px;
  }
`;

export const FormInputBtn = styled.button`
  width: 80%;
  height: 50px;
  margin-top: 10px;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    rgb(39, 176, 255) 0%,
    rgb(0, 232, 236) 100%
  );
  outline: none;
  border: none;
  color: #fff;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    background: linear-gradient(
      90deg,
      rgb(39, 143, 255) 0%,
      rgb(12, 99, 250) 100%
    );
    transition: all 0.4s ease-out;
  }
`;
