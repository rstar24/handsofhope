import axiosInstance from "../../library/axiosInstance";
import type { PostData } from "./slice";
import type { AxiosResponse } from "axios";

export const doPostAPI = async (data: PostData): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.post(
    "login/authenticate",
    data
  );
  return res;
};
