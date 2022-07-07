import {
  CYFMSCounselorsGetData,
  CYFMSCounselorsPostData,
} from "./cyfmsCounselorsSlice";
import axios from "axios";
import type { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/participantservice/`,
});

export const doGetCYFMSCounselorsAPI = async (
  data: CYFMSCounselorsGetData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "getAllCounselorCFSWorkers/" + data,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostCYFMSCounselorsAPI = async (
  data: CYFMSCounselorsPostData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "saveAllCounselorCFSWorkers/",
    data.user,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
