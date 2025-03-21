import axiosInstance from "../../../library/axiosInstance";
import type { Data } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  initialContactID: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `initialcontactservice/readAllPatientCareInfo/${initialContactID}`,
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
    "initialcontactservice/saveAllPatientCareInfo",
    formData,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
