import axiosInstance from "../../../library/axiosInstance";
import type { Data } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  participantID: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `participantservice/readCriminalHistory/${participantID}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doPostAPI = async (
  formData: Data,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "participantservice/saveCriminalHistory/",
    formData,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doDeleteAPI = async (
  recordID: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.delete(
    `participantservice/removeAddMoreCriminalHistory/${recordID}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
