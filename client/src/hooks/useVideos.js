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
