import axiosInstance from "../../../library/axiosInstance";
import type { Record } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  participantID: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `participantservice/getAllFamilyPhysicians/${participantID}`,
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
    "participantservice/saveAllFamilyPhysicians/",
    recordsList,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doDeleteAPI = async (
  familyPhysicianID: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.delete(
    `participantservice/removeAddMoreFamilyPhysician/${familyPhysicianID}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
