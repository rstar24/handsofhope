import type { Record } from "./slice";
import type { AxiosResponse } from "axios";
import axiosInstance from "../../../library/axiosInstance";

export const doGetAPI = async (
  data: Record,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `culturalprogandactservice/culturalProgAndActSearch/${data.referenceId}/${data.name}/${data.type}/${data.caseworker}/${data.startDate}/${data.status}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
