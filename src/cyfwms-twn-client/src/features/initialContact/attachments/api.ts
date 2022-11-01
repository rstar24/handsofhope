import axiosInstance from "../../../library/axiosInstance";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  initialContactId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `initialcontactservice/attachments/read_all/${initialContactId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doGetOneAPI = async (
  icFileId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `initialcontactservice/attachments/read_one/${icFileId}`,
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
    "initialcontactservice/attachments/save_one",
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
  icFileId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.delete(
    `initialcontactservice/attachments/remove_one/${icFileId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
