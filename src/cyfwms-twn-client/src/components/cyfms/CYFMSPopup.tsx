import CYFMSFamilyPhysician from "../../pages/cyfms/CYFMSFamilyPhysician";
import CYFMSContact from "../../pages/cyfms/CYFMSContact";
import CYFMSCriminalHistory from "../../pages/cyfms/CYFMSCriminalHistory";
import CYFMSEducationAndEmployment from "../../pages/cyfms/CYFMSEducationAndEmployment";
import CYFMSHouseholdMembers from "../../pages/cyfms/CYFMSHouseholdMembers";
import CYFMSOtherInformation from "../../pages/cyfms/CYFMSOtherInformation";
import CYFMSRegister from "../../pages/cyfms/CYFMSRegister";
import CYFMSSearch from "../../pages/cyfms/CYFMSSearch";
import CYFMSWorker from "../../pages/cyfms/CYFMSWorker";
import { Box, Modal } from "@mui/material";
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
  return (
    <Modal open={props.open} onClose={props.onClose}>
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
        <Routes>
          <Route path="register" element={<CYFMSRegister />} />
          <Route path="contact" element={<CYFMSContact />} />
          <Route path="household_members" element={<CYFMSHouseholdMembers />} />
          <Route
            path="education_and_employment"
            element={<CYFMSEducationAndEmployment />}
          />
          <Route path="criminal_history" element={<CYFMSCriminalHistory />} />
          <Route path="family_physician" element={<CYFMSFamilyPhysician />} />
          <Route path="cyfms_worker" element={<CYFMSWorker />} />
          <Route path="other_information" element={<CYFMSOtherInformation />} />
          <Route path="search" element={<CYFMSSearch />} />
        </Routes>
      </Box>
    </Modal>
  );
};

export default CYFMSPopup;
