import axiosInstance from "../../../library/axiosInstance";
import type { Data } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  initialContactID: number,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "initialcontactservice/readAllIncidentReports/" + initialContactID,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostAPI = async (
  formData: Data,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "initialcontactservice/saveAllIncidentReports",
    formData,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
