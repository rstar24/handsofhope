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
  //   firstname: "Neeraj",
  //   surname: "Sharma",
  //   middleName: "Mohan",
  //   dateOfBirth: "2007-12-03",
  //   maritalStatus: "divorced",
  //   city: "Indore",
  //   phoneNumber: "12345",
  const res: AxiosResponse = await axiosInstance.get(
    `searchParticipants/${data.readUser.firstname}/${data.readUser.middleName}/${data.readUser.surname}/${data.readUser.dateOfBirth}/${data.readUser.maritalStatus}/${data.readUser.city}/${data.readUser.phoneNumber}`,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
