import axiosInstance from "../../../library/axiosInstance";
import type { AxiosResponse } from "axios";

export const doDeleteAPI = async (
  fileNumber: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.delete(
    `initialcontactservice/remove/${fileNumber}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doGetAPI = async (
  fileNumber: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `initialcontactservice/readAll/${fileNumber}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
