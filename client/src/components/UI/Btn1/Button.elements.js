import styled from "styled-components";

export const Btn = styled.button`
  box-sizing: border-box;
  border: 2px solid $red;
  cursor: pointer;
  border-radius: 10px;
  color: #fff;
  background: #ffcc00;

  padding: 10px 20px;
  font-size: 1rem;

  text-decoration: none;
  text-align: center;
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
