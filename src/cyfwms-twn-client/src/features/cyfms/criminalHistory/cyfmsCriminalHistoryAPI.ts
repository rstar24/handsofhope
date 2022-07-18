import axios from "axios";
import type { cyfmsCHData } from "./cyfmsCriminalHistorySlice";
import type { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/participantservice/`,
});

export const doGetCriminalHistoryAPI = async (
  participantId: number,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "readCriminalHistory/" + participantId,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostCriminalHistoryAPI = async (
  cyfmsCriminalHistoryFormData: cyfmsCHData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "saveCriminalHistory/",
    cyfmsCriminalHistoryFormData,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
