import CYFMSFamilyPhysicians from "../../pages/cyfms/CYFMSFamilyPhysicians";
import CYFMSContact from "../../pages/cyfms/CYFMSContact";
import CYFMSCriminalHistory from "../../pages/cyfms/CYFMSCriminalHistory";
import CYFMSCYFMSCounselors from "../../pages/cyfms/CYFMSCYFMSCounselors";
import CYFMSEducationAndEmployment from "../../pages/cyfms/CYFMSEducationAndEmployment";
import CYFMSHouseholdMembers from "../../pages/cyfms/CYFMSHouseholdMembers";
import CYFMSOtherInformation from "../../pages/cyfms/CYFMSOtherInformation";
import CYFMSRegister from "../../pages/cyfms/CYFMSRegister";
import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import type { ModalUnstyledProps } from "@mui/material";
import type { ReactElement } from "react";
import { useAppDispatch } from "../../library/hooks";
import { cleanCodetableState } from "../../features/codetable/codetableSlice";
import { cleanContactState } from "../../features/contact/contactSlice";
import { cleanCriminalHistoryState } from "../../features/cyfms/criminalHistory/criminalhistorySlice";
import { cleanEducationAndEmploymentState } from "../../features/cyfms/educationAndEmployment/educationAndEmploymentSlice";
import { cleanFamilyPhysiciansState } from "../../features/cyfms/familyPhysicians/familyPhysiciansSlice";
import { cleanHouseHoldAndMemberState } from "../../features/cyfms/householdAndMembers/householdAndMembersSlice";
import { cleanOtherInformationState } from "../../features/cyfms/otherInformation/otherInformationSlice";
import { cleanRegisterState } from "../../features/register/registerSlice";
import { cleanSearchState } from "../../features/search/searchSlice";

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
    sessionStorage.removeItem("token");
    dispatch(cleanCodetableState());
    dispatch(cleanContactState());
    dispatch(cleanCriminalHistoryState());
    dispatch(cleanEducationAndEmploymentState());
    dispatch(cleanFamilyPhysiciansState());
    dispatch(cleanHouseHoldAndMemberState());
    dispatch(cleanOtherInformationState());
    dispatch(cleanRegisterState());
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
          onClick={(e) => props.onClose!(e, "escapeKeyDown")}
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
          <Route path="family_physician" element={<CYFMSFamilyPhysicians />} />
          <Route path="cyfms_worker" element={<CYFMSCYFMSCounselors />} />
          <Route path="other_information" element={<CYFMSOtherInformation />} />
        </Routes>
      </Box>
    </Modal>
  );
};

export default CYFMSPopup;
