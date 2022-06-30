import axios from "axios";
import type { AxiosResponse } from "axios";
import { WorkerGetData, WorkerPostData } from "./workerSlice";

const axiosInstance = axios.create({
  baseURL: "https://cyfwms-twn.azurewebsites.net/v1/participantservice/",
});

export const doGetWorkerAPI = async (
  data: WorkerGetData,
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

export const doPostWorkerAPI = async (
  data: WorkerPostData,
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
