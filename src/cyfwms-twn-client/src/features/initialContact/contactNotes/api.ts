import axiosInstance from "../../../library/axiosInstance";
import type { Data, Record } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  filedetailsid: number,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "initialcontactservice/readAllContactNotes/" + filedetailsid,
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
    "initialcontactservice/saveAllContactNotes",
    formData,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doSearchAPI = async (
  data: any,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `initialcontactservice/searchContactNotes/${data}`,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
