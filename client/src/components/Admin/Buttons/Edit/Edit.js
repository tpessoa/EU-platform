import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  edit: {
    background: theme.palette.primary.main,
    color: "#fff",
    margin: theme.spacing(0.5),
    "&:hover": {
      background: theme.palette.primary.light,
    },
  },
}));

const Edit = (props) => {
  const { url, objId, search, redirect } = props;
  const classes = useStyles();

  let display = "";
  if (redirect) {
    if (search) {
      display = (
        <Button
          size="small"
          variant="contained"
          className={classes.edit}
          component={Link}
          to={{
            pathname: url,
            search: `?id=${objId}`,
          }}
        >
          {props.children}
        </Button>
      );
    } else {
      display = (
        <Button
          size="small"
          variant="contained"
          className={classes.edit}
          component={Link}
          to={`${url}/${objId}`}
        >
          {props.children}
        </Button>
      );
    }
  } else {
    display = (
      <Button variant="contained" size="small" className={classes.edit}>
        {props.children}
      </Button>
    );
  }
  return <>{display}</>;
};

export default Edit;
