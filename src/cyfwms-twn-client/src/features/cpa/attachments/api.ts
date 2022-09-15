import axiosInstance from "../../../library/axiosInstance";
import type { Record } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  cpaId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `culturalprogandactservice/getAllFiles/${cpaId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doPostAPI = async (
  attachment: Record,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "culturalprogandactservice/upload",
    attachment,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};

export const doDeleteAPI = async (
  cpaFileId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.delete(
    `culturalprogandactservice/removeCulturalProgImage/${cpaFileId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
