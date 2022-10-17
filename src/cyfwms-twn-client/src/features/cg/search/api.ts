import axiosInstance from "../../../library/axiosInstance";
import type { Record } from "./slice";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  data: Record,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `caregiverservice/careGiverProviderSearch/${data.referenceId}/${data.name}/${data.type}/${data.priCaregiver}/${data.secCaregiver}/${data.status}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
