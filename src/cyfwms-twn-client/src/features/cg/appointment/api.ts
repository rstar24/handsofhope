import axiosInstance from "../../../library/axiosInstance";
import type { Data } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  CGAppointmentId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "caregiverservice/readOneAppointment/" + CGAppointmentId,
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
    "caregiverservice/saveCGAppointment",
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
    `caregiverservice/deleteCGAppointment/${data}`,
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
    `caregiverservice/searchCGAppointment/${id}/${data ? data : null}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
