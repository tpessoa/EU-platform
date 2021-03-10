import styled from "styled-components";
import { Link } from "react-router-dom";
// import { Link as LinkS } from "react-scroll";

export const Nav = styled.nav`
  background: #000;

  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const NavbarContainer = styled.div`
  /* display: flex;
  justify-content: center;
  */
  min-height: 80px;
  max-width: 1100px;
  width: 100%;
  z-index: 2;
  padding: 0 24px;

  display: grid;
  grid-template-columns: 2fr 3fr 2fr;
`;

export const NavLogo = styled(Link)`
  color: #fff;
  display: flex;
  justify-self: flex-start;
  align-items: center;
  cursor: pointer;
  /* margin-left: 24px; */
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-self: center;
  text-align: center;
  list-style: none;
  /* margin-right: -22px; */

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: ${({ click }) => (click ? 0 : "-100%")};
    transition: all 0.5 ease;
    background: #101522;
    /* opacity: 0.9; */
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 2rem;
  height: 100%;
  cursor: pointer;

  &:hover {
    border-bottom: 3px solid #01bf71;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  justify-self: flex-end;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 50px;
  background: #ffcc00;
  white-space: nowrap;
  padding: 10px 22px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
