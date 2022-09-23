import { CYFSWMSNextButton } from "../../components/CYFSWMSButtons";
import ICInput from "../../components/initialContact/ICInput";
import ICDropdown from "../../components/initialContact/ICDropdown";
import ICLayout from "../../components/initialContact/ICLayout";
import ICTextArea from "../../components/initialContact/ICTextArea";
import {
  doGet,
  doPost,
} from "../../features/initialContact/incidentReport/slice";
import { onKeyDown } from "../../library/app";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Data } from "../../features/initialContact/incidentReport/slice";
import type { FormEvent, ReactElement } from "react";

/**
 * The IncidentReport functional component.
 * @returns IncidentReport component skeleton.
 */
const IncidentReport = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { risk } = useAppSelector((state: any) => state.codetable);
  const initialContactID = useAppSelector(
    (state: any) => state.icFileDetails.getData.fileDetailsId
  );
  const data = useAppSelector((state: any) => state.icIncidentReport.data);

  useEffect(() => {
    dispatch(doGet(initialContactID))
      .unwrap()
      .then((data) => {
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
    const formData: Data = {
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
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("IncidentReport POST backend API was successful!");
        navigate("../present_concerns");
      })
      .catch((err) => {
        console.log("IncidentReport POST backend API didn't work!");
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
        onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <ICInput
              autofill={data.dateOfReport}
              id="incidentReport_DateOfReport"
              value="Date of Report"
              type="date"
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
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
              maxDate={new Date().toISOString().substring(0, 10)}
              minDate="1900-01-01"
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
              optionsList={Object.values(risk).map((status: any) => status.en)}
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

export default IncidentReport;
