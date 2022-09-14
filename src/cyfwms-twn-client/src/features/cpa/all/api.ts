import axiosInstance from "../../../library/axiosInstance";
import type { AxiosResponse } from "axios";

export const doDeleteAPI = async (
  culturalProgramID: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.delete(
    `culturalprogandactservice/removeCulturalProgAndAct/${culturalProgramID}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
