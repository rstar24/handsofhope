import axiosInstance from "../../../library/axiosInstance";
import type { Record } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  participantID: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `participantservice/getAllCounselorCFSWorkers/${participantID}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doPostAPI = async (
  recordsList: Record[],
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "participantservice/saveAllCounselorCFSWorkers/",
    recordsList,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doDeleteAPI = async (
  counselorID: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.delete(
    `participantservice/removeAddMoreCounselorCFSWorker/${counselorID}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
