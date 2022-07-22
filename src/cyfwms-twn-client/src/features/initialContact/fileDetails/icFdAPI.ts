import axiosInstance from "../../../library/axiosInstance";
import type { icFdData } from "./icFdSlice";
import type { AxiosResponse } from "axios";

export const doGetIcFdAPI = async (
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

export const doPostIcFdAPI = async (
  icFdFormData: icFdData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "initialcontactservice/saveAllFileDetails",
    icFdFormData,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
