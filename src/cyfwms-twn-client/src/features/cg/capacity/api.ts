import axiosInstance from "../../../library/axiosInstance";
import type { Data } from "./slice";
import type { AxiosResponse } from "axios";

/**
 * Fetch one/single `Capacity` of `CG` module.
 * @param cgCareProviderId - `CG` module `Care Provider` ID.
 * @param token - JSON Web Token
 */
export const doGetAPI = async (
  cgCareProviderId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `cg/capacity/read/${cgCareProviderId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

/**
 * Save one/single `Capacity` of `CG` module.
 * @param formData
 * @param token - JSON Web Token
 */
export const doPostAPI = async (
  formData: Data,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "cg/capacity/save",
    formData,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
