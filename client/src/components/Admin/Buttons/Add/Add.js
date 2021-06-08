import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  add: {
    background: theme.palette.success.dark,
    color: "#fff",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),

    "&:hover": {
      background: theme.palette.success.main,
    },
  },
}));

const Add = (props) => {
  const { url, objId, search } = props;
  const classes = useStyles();

  let displayBtn = "";
  if (search) {
    displayBtn = (
      <Button
        variant="contained"
        className={classes.add}
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
    displayBtn = (
      <Button
        variant="contained"
        className={classes.add}
        component={Link}
        to={`${url}/${objId}`}
      >
        {props.children}
      </Button>
    );
  }

  return <>{displayBtn}</>;
};

export default Add;
