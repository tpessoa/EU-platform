import { useQuery } from "react-query";
import axios from "axios";

const getAllCategories = async () => {
  const { data } = await axios.get("/api/videos/all-categories");
  return data;
};
export const useCategories = () => {
  return useQuery(["video-categories"], () => getAllCategories(), {
    refetchOnWindowFocus: false,
  });
};

const getCategory = async (catId) => {
  const { data } = await axios.get(`/api/videos/category/${catId}`);
  return data;
};
export const useCategory = (catId, flag) => {
  return useQuery(["video-category", catId], () => getCategory(catId), {
    refetchOnWindowFocus: false,
    enabled: flag,
  });
};

const getCategoryVideos = async (catId) => {
  const { data: category } = await axios.get(`/api/videos/category/${catId}`);
  const { data: videos } = await axios.get(
    `/api/videos/category-videos/${category._id}`
  );
  return videos;
};
export const useCategoryVideos = (catId, flag) => {
  return useQuery(
    ["all-videos-in-category", catId],
    () => getCategoryVideos(catId),
    {
      refetchOnWindowFocus: false,
      enabled: flag,
    }
  );
};

const getVideo = async (videoId) => {
  const { data } = await axios.get(`/api/videos/video/${videoId}`);
  return data;
};
export const useVideo = (videoId, flag) => {
  return useQuery(["video", videoId], () => getVideo(videoId), {
    refetchOnWindowFocus: false,
    enabled: flag,
  });
};
