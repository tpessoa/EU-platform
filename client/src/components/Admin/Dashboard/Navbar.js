import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BarChartIcon from "@material-ui/icons/BarChart";

const Navbar = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const tabName = location.pathname.split("/")[2];
  let tabVal;
  if (tabName === "content") {
    tabVal = 0;
  } else if (tabName === "statistics") {
    tabVal = 1;
  } else if (tabName === "perfil") {
    tabVal = 2;
  }
  const [value, setValue] = React.useState(tabVal);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            label="Conteúdo"
            component={Link}
            to={`${url}/content`}
          />
          <Tab
            icon={<BarChartIcon />}
            label="Estatísticas"
            component={Link}
            to={`${url}/statistics`}
          />
          <Tab
            icon={<PersonPinIcon />}
            label="Perfil"
            component={Link}
            to={`${url}/perfil`}
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
