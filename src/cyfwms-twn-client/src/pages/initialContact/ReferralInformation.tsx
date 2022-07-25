import { CYFSWMSNextButton } from "../../components/CYFSWMSButtons";
import ICDropdown from "../../components/initialContact/ICDropdown";
import ICInput from "../../components/initialContact/ICInput";
import ICLayout from "../../components/initialContact/ICLayout";
import {
  doGet,
  doPost,
} from "../../features/initialContact/referralInformation/slice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Data } from "../../features/initialContact/referralInformation/slice";
import type { FormEvent, ReactElement } from "react";

/**
 * The ReferralInformation functional component.
 * @returns ReferralInformation component skeleton.
 */
const ReferralInformation = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const initialContactID = useAppSelector(
    (state) => state.icFileDetails.data.fileDetailsId
  );
  const data = useAppSelector((state) => state.icReferralInformation.data);

  useEffect(() => {
    dispatch(doGet(initialContactID))
      .unwrap()
      .then((data) => {
        console.log("ReferralInformation GET backend API was successful!");
      })
      .catch((err) => {
        console.log("ReferralInformation GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      fileDetailsId: initialContactID,
      referralInfoId: data.referralInfoId,
      referral: form.referral.value,
      agencyName: form.agencyName.value,
      address: form.address.value,
      phone: form.phone.value,
      email: form.eMail.value,
    };
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("ReferralInformation POST backend API was successful!");
        navigate("/initial_contact/incident_report");
      })
      .catch((err) => {
        console.log("ReferralInformation POST backend API didn't work!");
        console.log(err);
      });
  };

  return (
    <ICLayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          <Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <ICDropdown
                    autofill={data.referral}
                    id="referral"
                    value="Referral"
                    optionsList={["Yes", "No"]}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  flexGrow: 5,
                }}
              >
                <Box sx={{ flexBasis: 0, flexGrow: 0.5 }}>
                  <ICInput
                    autofill={data.agencyName}
                    id="agencyName"
                    value="Agency Name"
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 0.5 }}>
                  <ICInput
                    autofill={data.address}
                    id="address"
                    value="Address"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <ICInput autofill={data.phone} id="phone" value="Phone" />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                  <ICInput autofill={data.email} id="eMail" value="Email" />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0 1rem",
                }}
              >
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </ICLayout>
  );
};

export default ReferralInformation;
