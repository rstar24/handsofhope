import axiosInstance from "../../../library/axiosInstance";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  cgCareProviderId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `caregiverservice/attachments/read_all/${cgCareProviderId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doGetOneAPI = async (
  cgFileId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `caregiverservice/attachments/read_one/${cgFileId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doPostAPI = async (
  attachment: FormData,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "caregiverservice/attachments/save_one",
    attachment,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};

export const doDeleteAPI = async (
  cgFileId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.delete(
    `caregiverservice/attachments/remove_one/${cgFileId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
