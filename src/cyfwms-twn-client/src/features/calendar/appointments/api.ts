import axiosInstance from "../../../library/axiosInstance";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (token: string): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `commonservice/appointment/getAllCalenderData`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doGetByDateAPI = async (
  date: string,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `commonservice/appointment/getAllCalenderDate/${date}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
