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
  return useQuery("polls", () => getAllPolls(), {
    refetchOnWindowFocus: false,
  });
};

const getPoll = async (pollId) => {
  const { data } = await axios.get(`/api/polls/poll/${pollId}`);
  return data;
};
export const usePoll = (pollId, flag) => {
  return useQuery(["poll", pollId], () => getPoll(pollId), {
    refetchOnWindowFocus: false,
    enabled: flag,
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

const getWork = async (workId) => {
  const { data } = await axios.get(`/api/polls/work/${workId}`);
  return data;
};
export const useWork = (workId, flag) => {
  return useQuery(["work", workId], () => getWork(workId), {
    refetchOnWindowFocus: false,
    enabled: flag,
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
