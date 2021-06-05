import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

import Loading from "../../components/UI/Loading";
import Error from "../../components/UI/Error";
import VideosGenerator from "../../components/Videos/VideosGenerator";
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

const Videos = () => {
  const { isLoading, error, data } = useQuery("categories_and_videos", () =>
    axios("/api/videos/get_categories_and_videos")
  );

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <ThemeProvider theme={theme}>
      <VideosGenerator categoriesData={data.data} />;
    </ThemeProvider>
  );
};

export default Videos;
