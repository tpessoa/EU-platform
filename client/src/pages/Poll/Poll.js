import React from "react";

import PollGallery from "../../components/Poll/PollGallery/PollGallery";
import { pollObjOne } from "./Data";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ptPT } from "@material-ui/core/locale";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1e3c72",
      mainGradient: "linear-gradient(to right,  #2a5298, #1e3c72)",
      mainGradient: "-webkit-linear-gradient(to right,  #2a5298, #1e3c72)",
    },
    secondary: {
      main: "#fbb034",
      mainGradient: "linear-gradient(315deg, #fbb034 0%, #ffdd00 74%);",
      mainGradient: "-webkit-linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)",
    },
  },
  ptPT,
});

const Poll = () => {
  return (
    <ThemeProvider theme={theme}>
      <PollGallery pollList={pollObjOne} />
    </ThemeProvider>
  );
};

export default Poll;
