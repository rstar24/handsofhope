import axiosInstance from "../../../library/axiosInstance";
import type { icRiData } from "./icRiSlice";
import type { AxiosResponse } from "axios";

export const doGetIcRiAPI = async (
  initialContactID: number,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `initialcontactservice/readAllReferralInfo/${initialContactID}`,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostIcRiAPI = async (
  icRiFormData: icRiData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "initialcontactservice/saveAllReferralInfo",
    icRiFormData,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
