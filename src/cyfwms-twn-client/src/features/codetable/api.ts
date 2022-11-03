import axiosInstance from "../../library/axiosInstance";
import type { AxiosResponse } from "axios";

export const doGenderGetAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("dataservice/gender", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
  return res;
};
export const doGetAppointmentStatusAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("dataservice/appoinmentstatus", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
  return res;
};
export const doGetReminderStatusAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("dataservice/reminderstatus", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
  return res;
};
export const doGetFrequencyAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("dataservice/frequency", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
  return res;
};

export const doGetMaritalStatusAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "dataservice/maritalstatus",
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doGetProvinceAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("dataservice/province", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
  return res;
};

export const doGetRoleAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("dataservice/role", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
  return res;
};

export const doGetEducationAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("dataservice/education", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
  return res;
};

export const doGetTypeOfEmployeeAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "dataservice/typeofemployee",
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

//Initial Contact Progress or closed

export const doGetInitialContactStatusAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "dataservice/initialContactStatus",
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

// Initial Contact Referral
export const doGetInitialContactReferralAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "dataservice/initialContactReferral",
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

// Initital Contact risk
export const doGetInitialContactRiskAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("dataservice/risk", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
  return res;
};

// Initial Contact typeOfPatient
export const doGetInitialContactTypeOfPatientAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "dataservice/typeOfPatient",
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

// Initial Contact mentalHealthOrSubstanceAbuse
export const doGetICMentalHealthOrSubstanceAbuseAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "dataservice/mentalHealthOrSubstanceAbuse",
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

//Initial Contac presentConcerns
export const doGetICPresentConcernsAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "dataservice/presentConcerns",
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

//Initial Contact ContactMethod
export const doGetICContactMethodAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "dataservice/contactMethod",
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
//  Cultural program activity cultural type codetable
export const doGetCPACulturalTypeAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "dataservice/culturaltype",
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
//Cultural program activity cultural Status codetable
export const doGetCPACulturalStatusAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "dataservice/culturalstatus",
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

//CareGivers Status codetable
export const doGetCGStatusAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "dataservice/caregiverstatus",
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

//CareGivers type codetable
export const doGetCGTypeAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "dataservice/caregivertype",
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

//CareGivers background check status codetable
export const doGetCgBgCheckStatusAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "dataservice/caregiverbackgroundstatus",
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
