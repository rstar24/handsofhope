import axiosInstance from "../../../library/axiosInstance";
import type { Data } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  participantID: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `culturalprogandactservice/readCulturalProgAndAct/${participantID}`,
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
  console.log("data cultural--", formData);
  const res: AxiosResponse = await axiosInstance.put(
    "culturalprogandactservice/saveCulturalProgAndAct/",
    formData,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
