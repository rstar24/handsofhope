import { CYFSWMSNextButton } from "../../components/CYFSWMSButtons";
import ICInput from "../../components/initialContact/ICInput";
import ICDropdown from "../../components/initialContact/ICDropdown";
import ICLayout from "../../components/initialContact/ICLayout";
import ICTextArea from "../../components/initialContact/ICTextArea";
import {
  doGetIcIR,
  doPostIcIR,
} from "../../features/initialContact/incidentReport/icIrSlice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { icIrData } from "../../features/initialContact/incidentReport/icIrSlice";
import type { FormEvent, ReactElement } from "react";

/**
 * The ICIncidentReport functional component.
 * @returns ICIncidentReport component skeleton.
 */
const ICIncidentReport = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const initialContactID = useAppSelector(
    (state: any) => state.icFileDetails.data.fileDetailsId
  );
  const data = useAppSelector((state: any) => state.icIncidentReport.data);

  useEffect(() => {
    dispatch(doGetIcIR(initialContactID))
      .unwrap()
      .then((fileDetailsDataFromAPI) => {
        console.log("IncidentReport GET backend API was successful!");
      })
      .catch((err) => {
        console.log("IncidentReport GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: icIrData = {
      fileDetailsId: initialContactID,
      incidentReportId: data.incidentReportId,
      dateOfReport: form.incidentReport_DateOfReport.value,
      reportedBy: form.incidentReport_ReportedBy.value,
      partiesInvolved: form.incidentReport_PartiesInvolved.value,
      witnesses: form.incidentReport_Witnesses.value,
      incidentDate: form.incidentReport_IncidentDate.value,
      incidentTime: form.incidentReport_IncidentTime.value,
      incidentLocation: form.incidentReport_IncidentLocation.value,
      risk: form.incidentReport_Risk.value,
      actionTaken: form.incidentReport_ActionTaken.value,
      actionPlan: form.incidentReport_ActionPlan.value,
    };
    dispatch(doPostIcIR(formData))
      .unwrap()
      .then(() => {
        console.log("criminalHistory POST backend API was successful!");
        navigate("/initial_contact/present_concerns");
      })
      .catch((err) => {
        console.log("criminalHistory POST backend API didn't work!");
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
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={data.dateOfReport}
              id="incidentReport_DateOfReport"
              value="Date of Report"
              type="date"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={data.reportedBy}
              id="incidentReport_ReportedBy"
              value="Reported By"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={data.partiesInvolved}
              id="incidentReport_PartiesInvolved"
              value="Parties Involved"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={data.witnesses}
              id="incidentReport_Witnesses"
              value="Witnesses"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={data.incidentDate}
              id="incidentReport_IncidentDate"
              value="Incident Date"
              type="date"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={data.incidentTime}
              id="incidentReport_IncidentTime"
              value="Incident Time"
              type="time"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={data.incidentLocation}
              id="incidentReport_IncidentLocation"
              value="Incident Location"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICDropdown
              autofill={data.risk}
              id="incidentReport_Risk"
              optionsList={["Low", "Medium", "High"]}
              value="Risk"
            />
          </Box>
        </Box>
        <ICTextArea
          autofill={data.actionTaken}
          id="incidentReport_ActionTaken"
          value="Action Taken"
        />
        <ICTextArea
          autofill={data.actionPlan}
          id="incidentReport_ActionPlan"
          value="Action Plan"
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </ICLayout>
  );
};

export default ICIncidentReport;
