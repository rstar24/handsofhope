import axiosInstance from "../../../library/axiosInstance";
import type { Record } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  data: Record,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `participantservice/searchParticipants/${data.referenceId}/${data.firstname}/${data.middleName}/${data.surname}/${data.dateOfBirth}/${data.maritalStatus}/${data.city}/${data.workPhone}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
