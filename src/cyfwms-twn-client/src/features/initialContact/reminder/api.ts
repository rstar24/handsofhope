import axiosInstance from "../../../library/axiosInstance";
import type { Data } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  fileDetailsId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "initialcontactservice/readICReminder/" + fileDetailsId,
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
    "initialcontactservice/saveICReminder",
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
    `initialcontactservice/removeICReminder/${data}`,
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
    `initialcontactservice/searchICReminder/${id}/${data ? data : null}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
