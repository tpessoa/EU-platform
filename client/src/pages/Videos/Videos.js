import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

import Loading from "../../components/UI/Loading";
import Error from "../../components/UI/Error";
import VideosGenerator from "../../components/Videos/VideosGenerator";

const Videos = () => {
  const { isLoading, error, data } = useQuery("categories_and_videos", () =>
    axios("/api/videos/get_categories_and_videos")
  );

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return <VideosGenerator categoriesData={data.data} />;
};

export default Videos;
