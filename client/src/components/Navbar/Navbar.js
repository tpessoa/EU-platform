import React, { useState, useEffect } from "react";
import { FaTimes, FaBars } from "react-icons/fa";

import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLink,
  NavBtn,
  NavBtnLink,
} from "./Navbar.elements";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/" onClick={closeMobileMenu}>
            Navbar
          </NavLogo>
          <MobileIcon onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </MobileIcon>
          <NavMenu onClick={handleClick} click={click}>
            <NavItem>
              <NavLink to="/games">Jogos</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/videos">Vídeos</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/book">Livro</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/polling">Trabalhos</NavLink>
            </NavItem>
          </NavMenu>
          {/* <NavBtn>
            <NavBtnLink>Sign In</NavBtnLink>
          </NavBtn> */}
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
