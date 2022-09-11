import axiosInstance from "../../../library/axiosInstance";
import type { AxiosResponse } from "axios";

export const doDeleteAPI = async (
  referenceID: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.delete(
    `participantservice/removeParticipant/${referenceID}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doGetAPI = async (
  referenceID: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `participantservice/readAllOutputParticipant/${referenceID}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
