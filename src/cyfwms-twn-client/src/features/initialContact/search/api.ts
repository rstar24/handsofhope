import axiosInstance from "../../../library/axiosInstance";
import type { Record } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  data: Record,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `initialcontactservice/searchInitialContacts/${data.referenceId}/${data.clientName}/${data.fileNumber}/${data.caseworker}/${data.startingDate}/${data.status}`,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
