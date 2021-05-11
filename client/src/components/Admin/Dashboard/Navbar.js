import React from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Navbar = (props) => {
  const { setTab } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    setTab(newValue);
  };

  return (
    <Container>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="primary"
        >
          <Tab
            icon={<DashboardIcon />}
            label="Dashboard"
            component={Link}
            to={"/admin"}
          />
          <Tab
            icon={<PersonPinIcon />}
            label="Perfil"
            component={Link}
            to={"/admin/perfil"}
          />
          <Tab
            icon={<ExitToAppIcon />}
            label="Logout"
            onClick={() => {
              localStorage.removeItem("token");
            }}
            component={Link}
            to={"/"}
          />
        </Tabs>
      </Paper>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10vh;
  margin-bottom: 2rem;
`;
