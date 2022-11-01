import axiosInstance from "../../../library/axiosInstance";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  participantId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `participantservice/attachments/read_all/${participantId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doGetOneAPI = async (
  cyfmsFileId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `participantservice/attachments/read_one/${cyfmsFileId}`,
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
    "participantservice/attachments/save_one",
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
  cyfmsFileId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.delete(
    `participantservice/attachments/remove_one/${cyfmsFileId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
