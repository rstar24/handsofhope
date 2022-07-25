import axiosInstance from "../../../library/axiosInstance";
import type { Data } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  initialContactID: number,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "initialcontactservice/readAllFileDetails/" + initialContactID,
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
    "initialcontactservice/saveAllFileDetails",
    formData,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
