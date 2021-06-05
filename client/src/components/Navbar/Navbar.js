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
  ImageWrapper,
  Image,
} from "./Navbar.elements";

import flagEU from "../../assets/images/navbar/eu-flag.png";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/" onClick={closeMobileMenu}>
          <ImageWrapper>
            <Image src={flagEU} alt={"flag-eu"} />
          </ImageWrapper>
        </NavLogo>
        <MobileIcon onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </MobileIcon>
        <NavMenu onClick={handleClick} click={click}>
          <NavItem>
            <NavLink to="/games/puzzle">Jogos</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/videos">Vídeos</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/book">Livro</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/polls">Votações</NavLink>
          </NavItem>
          {localStorage.getItem("token") && (
            <NavItem>
              <NavLink to="/admin/content">Admin</NavLink>
            </NavItem>
          )}
        </NavMenu>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
