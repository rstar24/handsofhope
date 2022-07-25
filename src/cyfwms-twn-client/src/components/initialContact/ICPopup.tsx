import { cleanState as cleanFileDetailsState } from "../../features/initialContact/fileDetails/icFdSlice";
import { cleanState as cleanIncidentReportState } from "../../features/initialContact/incidentReport/icIrSlice";
import { cleanState as cleanPatientCareInformationState } from "../../features/initialContact/patientCareInformation/slice";
import { cleanState as cleanPresentConcernsState } from "../../features/initialContact/presentConcerns/slice";
import { cleanState as cleanReferralInformationState } from "../../features/initialContact/referralInformation/icRiSlice";
import { initiate } from "../../features/initiatorSlice";
import ICFileDetails from "../../pages/initialContact/ICFileDetails";
import ICREferralInformation from "../../pages/initialContact/ICReferralInformation";
import ICIncidentReport from "../../pages/initialContact/ICIncidentReport";
import ICPresentConcerns from "../../pages/initialContact/ICPresentConcerns";
import ICPatientCareInformation from "../../pages/initialContact/ICPatientCareInformation";
import { hideTabs } from "../../features/navBarSlice";
import { useAppDispatch } from "../../library/hooks";
import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { ModalUnstyledProps } from "@mui/material";
import type { ReactElement } from "react";

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

  const handleClose = () => {
    dispatch(cleanFileDetailsState(null));
    dispatch(cleanReferralInformationState(null));
    dispatch(cleanIncidentReportState(null));
    dispatch(cleanPresentConcernsState(null));
    dispatch(cleanPatientCareInformationState(null));
  };

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
        <IconButton
          color="primary"
          aria-label="Close the popup box."
          onClick={(e) => {
            dispatch(hideTabs(null));
            dispatch(initiate(null));
            handleClose();
            props.onClose!(e, "escapeKeyDown");
          }}
          sx={{ position: "absolute", right: 0 }}
        >
          <CloseIcon />
        </IconButton>
        <Routes>
          <Route path="file_details" element={<ICFileDetails />} />
          <Route
            path="referral_information"
            element={<ICREferralInformation />}
          />
          <Route path="incident_report" element={<ICIncidentReport />} />
          <Route path="present_concerns" element={<ICPresentConcerns />} />
          <Route
            path="patient_care_information"
            element={<ICPatientCareInformation />}
          />
        </Routes>
      </Box>
    </Modal>
  );
};

export default ICPopup;
