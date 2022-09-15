import { FormEvent, ReactElement, useEffect } from "react";
import CPAInput from "../../../components/cpa/CPAInput";
import { Box, Button, OutlinedInput } from "@mui/material";
import CPALayout from "../../../components/cpa/CPALayout";
import CPATextArea from "../../../components/cpa/CPATextArea";
import { CYFSWMSSaveButton } from "../../../components/CYFSWMSButtons";
import { useNavigate } from "react-router-dom";

import { unhideTabs } from "../../../features/navBarSlice";
import { initiate } from "../../../features/initiatorSlice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import {
  Data,
  doGet,
  doPost,
} from "../../../features/cpa/culturalProgramActivity/slice";
import { setOpen } from "../../../features/popupSlice";
import CPADropdown from "../../../components/cpa/CPADropdown";
/**
 * The CulturalProgramOrActivity functional component.
 * @returns CulturalProgramOrActivity component skeleton.
 */
const CulturalProgramOrActivity = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { initialContactStatus } = useAppSelector(
    (state: any) => state.codetable
  );
  const isInitiated = useAppSelector(
    (state: any) => state.initiator.isInitiated
  );
  const state = useAppSelector((state) => state.cpa);
  const edit = useAppSelector((state) => state.popup.edit);
  const { culturalType, culturalStatus } = useAppSelector(
    (state) => state.codetable
  );
  useEffect(() => {
    dispatch(doGet(state.data.culturalProgramId))
      .unwrap()
      .then((data) => {
        console.log("CPA GET backend API was successful!");
      })
      .catch((err) => {
        console.log("CPA GET backend API didn't work!");
        console.log(err);
      });
  }, []);

  // Handles the form data submission and other
  // activities.
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const form: any = e.currentTarget;
    const formData: Data = {
      culturalProgramId: state.data.culturalProgramId,
      referenceId: state.data.referenceId | 0,
      name: form.name.value,
      type: form.type.value,
      status: form.status.value,
      caseworker: form.caseworker.value,
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      totalCost: form.totalCost.value,
      totalParticipation: form.totalParticipation.value,
      sessionDetails: form.sessionDetails.value,
      costOrParticipationDetails: form.costOrParticipationDetails.value,
      outcomes: form.outcomes.value,
      notes: form.notes.value,
    };
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("FileDetails POST backend API was successful!");
        dispatch(unhideTabs(null));
        dispatch(initiate(null));
        if (edit) {
          nextClickHandler();
        }
      })
      .catch((err) => {
        console.log("FileDetails POST backend API didn't work!");
        console.log(err);
      });
  };

  const nextClickHandler = () => {
    dispatch(setOpen(false));
    navigate("/cpa/view");
  };

  return (
    <CPALayout>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
        }}
        onSubmit={submitHandler}
        //onKeyDown={onKeyDown}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ p: 1, flexBasis: 0, flexGrow: 1, color: "black" }}>
                Reference ID
              </Box>
              <OutlinedInput
                size="small"
                readOnly={true}
                sx={{ borderRadius: 0, flexBasis: 0, flexGrow: 2, ml: -1 }}
                defaultValue={state.data.referenceId}
                value={state.data.referenceId}
                style={{ backgroundColor: "#dfdada" }}
              />
            </Box>
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput
              autofill={state.data.name}
              id="name"
              value="Name"
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPADropdown
              autofill={state.data.type}
              id="type"
              value="Type"
              optionsList={Object.values(culturalType).map(
                (type: any) => type.en
              )}
              required
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPADropdown
              autofill={state.data.status}
              id="status"
              value="Status"
              optionsList={Object.values(culturalStatus).map(
                (type: any) => type.en
              )}
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput
              autofill={state.data.caseworker}
              id="caseworker"
              value="Caseworker"
              required
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput
              autofill={state.data.startDate}
              id="startDate"
              value="Start Date"
              type="Date"
              required
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput
              autofill={state.data.endDate}
              id="endDate"
              value="End Date"
              type="Date"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput
              autofill={state.data.totalParticipation}
              id="totalParticipation"
              value="Total Participation"
            />
          </Box>
          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
            <CPAInput
              autofill={state.data.totalCost}
              id="totalCost"
              value="Total Cost"
            />
          </Box>
        </Box>
        <CPATextArea
          autofill={state.data.sessionDetails}
          id="sessionDetails"
          value="Session Details"
        />
        <CPATextArea
          autofill={state.data.costOrParticipationDetails}
          id="costOrParticipationDetails"
          value="Participation / Cost Details"
        />
        <CPATextArea
          autofill={state.data.costOrParticipationDetails}
          id="outcomes"
          value="Outcomes"
        />
        <CPATextArea autofill={state.data.notes} id="notes" value="Notes" />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          {isInitiated ? (
            <>
              {edit ? (
                <>
                  <CYFSWMSSaveButton />
                </>
              ) : (
                <>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={nextClickHandler}
                  >
                    View
                  </Button>
                </>
              )}
            </>
          ) : (
            <CYFSWMSSaveButton />
          )}
        </Box>
      </Box>
    </CPALayout>
  );
};

export default CulturalProgramOrActivity;
