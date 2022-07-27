import { cleanCodetableState } from "../../features/codetable/codetableSlice";
import { cleanContactState } from "../../features/cyfms/contact/cyfmsContactSlice";
import { cleanCriminalHistoryState } from "../../features/cyfms/criminalHistory/cyfmsCriminalHistorySlice";
import { cleanEducationAndEmploymentState } from "../../features/cyfms/educationAndEmployment/educationAndEmploymentSlice";
import { cleanFamilyPhysiciansState } from "../../features/cyfms/familyPhysicians/cyfmsFamilyPhysiciansSlice";
import { cleanHouseholdMembersState } from "../../features/cyfms/householdMembers/cyfmsHouseholdMembersSlice";
import { cleanOtherInformationState } from "../../features/cyfms/otherInformation/cyfmsOtherInformationSlice";
import { cleanRegisterState } from "../../features/cyfms/register/cyfmsRegisterSlice";
import { cleanSearchState } from "../../features/search/searchSlice";
import { cleanCounselorsState } from "../../features/cyfms/counselors/cyfmsCounselorsSlice";
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
    dispatch(cleanContactState(null));
    dispatch(cleanCriminalHistoryState(null));
    dispatch(cleanEducationAndEmploymentState());
    dispatch(cleanFamilyPhysiciansState(null));
    dispatch(cleanHouseholdMembersState(null));
    dispatch(cleanOtherInformationState(null));
    dispatch(cleanRegisterState());
    dispatch(cleanSearchState());
    dispatch(cleanCounselorsState(null));
  };

  return (
    <Modal {...props}>
      <Box
        sx={{
          position: "relative",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "95%",
          maxWidth: "80%",
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
