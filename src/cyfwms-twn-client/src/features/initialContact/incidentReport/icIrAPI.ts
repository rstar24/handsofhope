import axiosInstance from "../../../library/axiosInstance";
import type { icIrData } from "./icIrSlice";
import type { AxiosResponse } from "axios";

export const doGetIcIrAPI = async (
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

export const doPostIcIrAPI = async (
  icIrFormData: icIrData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "initialcontactservice/saveAllIncidentReports",
    icIrFormData,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
