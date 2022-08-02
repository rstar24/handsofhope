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
import FamilyPhysicians from "../../pages/cyfms/FamilyPhysicians";
import Contact from "../../pages/cyfms/Contact";
import CriminalHistory from "../../pages/cyfms/CriminalHistory";
import Counselors from "../../pages/cyfms/Counselors";
import EducationAndEmployment from "../../pages/cyfms/EducationAndEmployment";
import HouseholdMembers from "../../pages/cyfms/HouseholdMembers";
import OtherInformation from "../../pages/cyfms/OtherInformation";
import Register from "../../pages/cyfms/Register";
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
          height: 500,
          maxWidth: 1000,
          bgcolor: "background.paper",
          border: "5px solid black",
          boxShadow: 24,
          //overflowY: "auto",
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
          <Route path="register" element={<Register />} />
          <Route path="contact" element={<Contact />} />
          <Route path="household_members" element={<HouseholdMembers />} />
          <Route
            path="education_and_employment"
            element={<EducationAndEmployment />}
          />
          <Route path="criminal_history" element={<CriminalHistory />} />
          <Route path="family_physicians" element={<FamilyPhysicians />} />
          <Route path="counselors" element={<Counselors />} />
          <Route path="other_information" element={<OtherInformation />} />
        </Routes>
      </Box>
    </Modal>
  );
};

export default CYFMSPopup;
