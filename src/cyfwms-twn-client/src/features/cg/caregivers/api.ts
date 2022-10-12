import axiosInstance from "../../../library/axiosInstance";
import type { CaregiversDetails } from "./slice";
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
    `cg/caregivers/read/${cgCareProviderId}`,
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
  formData: CaregiversDetails,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "cg/caregivers/save",
    formData,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
