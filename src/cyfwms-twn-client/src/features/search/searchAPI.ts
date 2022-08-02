import axios from "axios";
import type { AxiosResponse } from "axios";

import { SearchGetData } from "./searchSlice";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/participantservice/`,
});

export const doGetSearchAPI = async (
  data: SearchGetData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `searchParticipants/${data.readUser.referenceId}/${data.readUser.firstname}/${data.readUser.middleName}/${data.readUser.surname}/${data.readUser.dateOfBirth}/${data.readUser.maritalStatus}/${data.readUser.city}/${data.readUser.phoneNumber}`,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
