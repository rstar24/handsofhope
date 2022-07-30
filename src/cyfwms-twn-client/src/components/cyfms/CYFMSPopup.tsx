import { cleanState as cleanContactState } from "../../features/cyfms/contact/slice";
import { cleanState as cleanCounselorsState } from "../../features/cyfms/counselors/slice";
import { cleanState as cleanCriminalHistoryState } from "../../features/cyfms/criminalHistory/slice";
import { cleanState as cleanEducationAndEmploymentState } from "../../features/cyfms/educationAndEmployment/slice";
import { cleanState as cleanFamilyPhysiciansState } from "../../features/cyfms/familyPhysicians/slice";
import { cleanState as cleanHouseholdMembersState } from "../../features/cyfms/householdMembers/slice";
import { cleanState as cleanOtherInformationState } from "../../features/cyfms/otherInformation/slice";
import { cleanState as cleanRegisterState } from "../../features/cyfms/register/slice";
import { cleanSearchState } from "../../features/search/searchSlice";
import { hideTabs } from "../../features/navBarSlice";
import { uninitiate } from "../../features/initiatorSlice";
import CYFMSFamilyPhysicians from "../../pages/cyfms/CYFMSFamilyPhysicians";
import CYFMSContact from "../../pages/cyfms/CYFMSContact";
import CYFMSCriminalHistory from "../../pages/cyfms/CYFMSCriminalHistory";
import CYFMSCounselors from "../../pages/cyfms/CYFMSCounselors";
import CYFMSEducationAndEmployment from "../../pages/cyfms/CYFMSEducationAndEmployment";
import CYFMSHouseholdMembers from "../../pages/cyfms/CYFMSHouseholdMembers";
import CYFMSOtherInformation from "../../pages/cyfms/CYFMSOtherInformation";
import CYFMSRegister from "../../pages/cyfms/CYFMSRegister";
import { useAppDispatch } from "../../library/hooks";
import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { ModalUnstyledProps } from "@mui/material";
import type { ReactElement } from "react";

/**
 * The CYFMSPopup functional component.
 * @example
 * ```tsx
 * <CYFMSPopup
 *   open={boolean}
 *   onClose={yourCloseHandler}
 *   ...
 * />
 * ```
 * @returns CYFMSPopup component skeleton.
 */
const CYFMSPopup = (props: ModalUnstyledProps): ReactElement => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(cleanRegisterState(null));
    dispatch(cleanContactState(null));
    dispatch(cleanHouseholdMembersState(null));
    dispatch(cleanEducationAndEmploymentState(null));
    dispatch(cleanCriminalHistoryState(null));
    dispatch(cleanFamilyPhysiciansState(null));
    dispatch(cleanCounselorsState(null));
    dispatch(cleanOtherInformationState(null));
    dispatch(cleanSearchState());
  };

  return (
    <Modal {...props}>
      <Box
        sx={{
          position: "relative",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: 500,
          maxWidth: 1000,
          bgcolor: "background.paper",
          border: "5px solid black",
          boxShadow: 24,
          overflowY: "auto",
        }}
      >
        <IconButton
          color="primary"
          aria-label="Close the popup box."
          onClick={(e) => {
            dispatch(hideTabs(null));
            dispatch(uninitiate(null));
            handleClose();
            props.onClose!(e, "escapeKeyDown");
          }}
          sx={{ position: "absolute", right: 0 }}
        >
          <CloseIcon />
        </IconButton>
        <Routes>
          <Route path="register" element={<CYFMSRegister />} />
          <Route path="contact" element={<CYFMSContact />} />
          <Route path="household_members" element={<CYFMSHouseholdMembers />} />
          <Route
            path="education_and_employment"
            element={<CYFMSEducationAndEmployment />}
          />
          <Route path="criminal_history" element={<CYFMSCriminalHistory />} />
          <Route path="family_physicians" element={<CYFMSFamilyPhysicians />} />
          <Route path="counselors" element={<CYFMSCounselors />} />
          <Route path="other_information" element={<CYFMSOtherInformation />} />
        </Routes>
      </Box>
    </Modal>
  );
};

export default CYFMSPopup;
