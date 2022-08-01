import { CYFSWMSNextButton } from "../../components/CYFSWMSButtons";
import ICDropdown from "../../components/initialContact/ICDropdown";
import ICLayout from "../../components/initialContact/ICLayout";
import ICTextArea from "../../components/initialContact/ICTextArea";
import {
  doGet,
  doPost,
} from "../../features/initialContact/presentConcerns/slice";
import { useAppDispatch, useAppSelector } from "../../library/hooks";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Data } from "../../features/initialContact/presentConcerns/slice";
import type { FormEvent, ReactElement } from "react";
import ICMultiSelectDropdown from "../../components/initialContact/ICMultiSelectDropdown";

/**
 * The PresentConcerns functional component.
 * @returns PresentConcerns component skeleton.
 */
const PresentConcerns = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialContactID = useAppSelector(
    (state) => state.icFileDetails.data.fileDetailsId
  );
  const { mentalHealthOrSubstanceAbuse, presentConcerns } = useAppSelector(
    (state: any) => state.codetable
  );
  const data = useAppSelector((state) => state.icPresentConcerns.data);

  useEffect(() => {
    dispatch(doGet(initialContactID))
      .unwrap()
      .then((data) => {
        console.log("PresentConcerns GET backend API was successful!");
      })
      .catch((err) => {
        console.log("PresentConcerns GET backend API didn't work!");
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
      presentConcernsId: data.presentConcernsId,
      selectPresentConcerns: form.selectPresentConcerns.value,
      situation: form.situation.value,
      substanceAbuse: form.substanceAbuse.value,
      explainMentalHealth: form.explainMentalHealth.value,
    };
    dispatch(doPost(formData))
      .unwrap()
      .then(() => {
        console.log("PresentConcerns POST backend API was successful!");
        navigate("/initial_contact/patient_care_information");
      })
      .catch((err) => {
        console.log("PresentConcerns POST backend API didn't work!");
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
          <Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
                  <ICMultiSelectDropdown
                    autofill={data.selectPresentConcerns}
                    id="selectPresentConcerns"
                    value="Please Select Present Concerns"
                    optionsList={Object.values(presentConcerns).map(
                      (substance: any) => substance.en
                    )}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
              <ICTextArea
                autofill={data.situation}
                id="situation"
                value="Briefly Explain Situation"
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0 1rem" }}>
                <Box sx={{ flexBasis: 0, flexGrow: 2 }}>
                  <ICMultiSelectDropdown
                    autofill={data.substanceAbuse}
                    id="substanceAbuse"
                    value="Mental Health or Alcohol / Substance Abuse"
                    optionsList={Object.values(
                      mentalHealthOrSubstanceAbuse
                    ).map((substance: any) => substance.en)}
                  />
                </Box>
                <Box sx={{ flexBasis: 0, flexGrow: 1 }}></Box>
              </Box>
              <ICTextArea
                autofill={data.explainMentalHealth}
                id="explainMentalHealth"
                value="Briefly Explain"
              />
            </Box>
          </Box>
          <Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            ></Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <CYFSWMSNextButton />
        </Box>
      </Box>
    </ICLayout>
  );
};

export default PresentConcerns;
