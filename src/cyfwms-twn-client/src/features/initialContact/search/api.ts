import axiosInstance from "../../../library/axiosInstance";
import type { Data } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  data: Data,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `initialcontactservice/searchParticipants/${data.clientName}/${data.fileNumber}/${data.caseworker}/${data.date}/${data.status}`,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
