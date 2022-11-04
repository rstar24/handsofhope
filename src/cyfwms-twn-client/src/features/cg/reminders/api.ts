import axiosInstance from "../../../library/axiosInstance";
import type { Data } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  cgReminderId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "caregiverservice/readCGReminder/" + cgReminderId,
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
    "caregiverservice/saveCareGiverReminder",
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
    `caregiverservice/removeCGReminder/${data}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doSearchAPI = async (
  id: number,
  data: any,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `caregiverservice/searchCGReminder/${id}/${data ? data : null}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
