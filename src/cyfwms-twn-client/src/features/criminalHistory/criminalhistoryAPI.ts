import axios from "axios";
import type { AxiosResponse } from "axios";
import {
  CriminalHistoryGetData,
  CriminalHistoryPostData,
} from "./criminalhistorySlice";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/participantservice/`,
});

export const doGetCriminalHistoryAPI = async (
  data: CriminalHistoryGetData,
  jwtToken: string
): Promise<AxiosResponse> => {
  console.log(data);
  const res: AxiosResponse = await axiosInstance.get(
    "readCriminalHistory/" + data,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostCriminalHistoryAPI = async (
  data: CriminalHistoryPostData,
  jwtToken: string
): Promise<AxiosResponse> => {
  console.log(data);
  const res: AxiosResponse = await axiosInstance.put(
    "saveCriminalHistory/",
    data.user,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
