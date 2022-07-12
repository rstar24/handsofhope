import CYFMSFamilyPhysicians from "../../pages/cyfms/CYFMSFamilyPhysicians";

import CYFMSCriminalHistory from "../../pages/cyfms/CYFMSCriminalHistory";
import CYFMSCYFMSCounselors from "../../pages/cyfms/CYFMSCYFMSCounselors";
import CYFMSEducationAndEmployment from "../../pages/cyfms/CYFMSEducationAndEmployment";
import CYFMSHouseholdMembers from "../../pages/cyfms/CYFMSHouseholdMembers";
import CYFMSOtherInformation from "../../pages/cyfms/CYFMSOtherInformation";

import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import type { ModalUnstyledProps } from "@mui/material";
import type { ReactElement } from "react";
import { useAppDispatch } from "../../library/hooks";
import { ICSideNavContext } from "./ICSideNav";
import ICFileDetails from "../../pages/initialContact/ICFileDetails";
import ICREferralInformation from "../../pages/initialContact/ICReferralInformation";
import ICIncidentReport from "../../pages/initialContact/ICIncidentReport";
import ICPresentConcerns from "../../pages/initialContact/ICPresentConcerns";
import ICPatientCareInformation from "../../pages/initialContact/ICPatientCareInformation";

/**
 * The ICPopup functional component.
 * @example
 * ```tsx
 * <ICPopup
 *   open={boolean}
 *   onClose={yourCloseHandler}
 *   ...
 * />
 * ```
 * @returns ICPopup component skeleton.
 */
const ICPopup = (props: ModalUnstyledProps): ReactElement => {
  const dispatch = useAppDispatch();
  const [hideTabs, setHideTabs] = useState<boolean>(true);

  const handleClose = () => {};

  return (
    <Modal {...props} sx={{ width: "100%", maxHeight: 1000 }}>
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
        <ICSideNavContext.Provider
          value={{ hideTabs: hideTabs, setHideTabs: setHideTabs }}
        >
          <IconButton
            color="primary"
            aria-label="Close the popup box."
            onClick={(e) => {
              setHideTabs(true);
              handleClose();
              props.onClose!(e, "escapeKeyDown");
            }}
            sx={{ position: "absolute", right: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <Routes>
            <Route path="fileDetails" element={<ICFileDetails />} />
            <Route path="referral" element={<ICREferralInformation />} />
            <Route path="incident_report" element={<ICIncidentReport />} />
            <Route path="presentConcerns" element={<ICPresentConcerns />} />
            <Route
              path="patientCareInformation"
              element={<ICPatientCareInformation />}
            />
          </Routes>
        </ICSideNavContext.Provider>
      </Box>
    </Modal>
  );
};

export default ICPopup;
