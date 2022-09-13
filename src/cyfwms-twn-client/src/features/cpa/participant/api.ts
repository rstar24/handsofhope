import axiosInstance from "../../../library/axiosInstance";
import type { Data } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  participantculturalprogid: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "culturalprogandactservice/readParticipantsCulturalAndAct/" +
      participantculturalprogid,
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
    "culturalprogandactservice/saveParticipantCulturalProg",
    formData,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doRemoveAPI = async (
  data: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.delete(
    `culturalprogandactservice/removeContactNotes/${data}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doSearchAPI = async (
  data: any,
  token: string
): Promise<AxiosResponse> => {
  console.log("data--------", data);
  const res: AxiosResponse = await axiosInstance.get(
    `culturalprogandactservice/participantCulturalProgSearch/${data}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
