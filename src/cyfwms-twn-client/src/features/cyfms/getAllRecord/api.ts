import axiosInstance from "../../../library/axiosInstance";
import { GetAllData } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAllRecordAPI = async (
  data: GetAllData,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `participantservice/readAllOutputParticipant/${data}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
