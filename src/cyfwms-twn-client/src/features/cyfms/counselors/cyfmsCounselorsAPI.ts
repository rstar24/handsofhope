import axios from "axios";
import type { cyfmsCounselorsRecord } from "./cyfmsCounselorsSlice";
import type { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/participantservice/`,
});

export const doGetCounselorsAPI = async (
  participantId: number,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "getAllCounselorCFSWorkers/" + participantId,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostCounselorsAPI = async (
  cyfmsCounselorsFormData: cyfmsCounselorsRecord[],
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "saveAllCounselorCFSWorkers/",
    cyfmsCounselorsFormData,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
