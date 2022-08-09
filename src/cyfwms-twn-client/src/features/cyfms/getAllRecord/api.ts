import axios from "axios";
import type { AxiosResponse } from "axios";
import { GetAllData } from "./slice";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/participantservice/`,
});

export const doGetAllRecordAPI = async (
  data: GetAllData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `readAllOutputParticipant/${data}`,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
