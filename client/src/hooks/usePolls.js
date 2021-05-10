import { useQuery } from "react-query";
import axios from "axios";

/**
 *
 * POLL
 */

const getAllPolls = async () => {
  const { data } = await axios.get("/api/polls/all-polls");
  return data;
};
export const usePolls = () => {
  return useQuery("all-polls", () => getAllPolls(), {
    refetchOnWindowFocus: false,
  });
};

/**
 *
 * WORK
 *
 */

const getAllWorksInPoll = async (pollId) => {
  const { data } = await axios.get(`/api/polls/all-poll-works/${pollId}`);
  return data;
};
export const useWorksInPoll = (pollId) => {
  return useQuery(["works", pollId], () => getAllWorksInPoll(pollId), {
    refetchOnWindowFocus: false,
  });
};

const deleteWork = async (workId) => {
  const { data } = await axios({
    method: "post",
    url: `/api/poll/delete-work/${workId}`,
  });
  return data;
};
export const useDeleteWork = (workId) => {
  return useQuery(["delete-work", workId], () => deleteWork(workId), {
    refetchOnWindowFocus: false,
  });
};
