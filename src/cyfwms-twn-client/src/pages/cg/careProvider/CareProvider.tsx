import { CYFSWMSSaveButton } from "../../../components/CYFSWMSButtons";
import Input from "../../../components/Input";
import CYFMSDropdown from "../../../components/cyfms/CYFMSDropdown";
import SearchClientName from "../../../components/cyfms/searchClient/SearchClientName";
import CgLayout from "../../../components/cg/CgLayout";
import { onKeyDown } from "../../../library/app";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import { handleEffect, handleSubmit } from "./careProvider_";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  FormControl,
  FormLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FC } from "react";

/**
 * `CG` aka `Caregivers` module.
 * Sub page: `Care Provider`.
 * @returns `ReactElement`
 */
const CareProvider: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cgStatus, cgType } = useAppSelector((state) => state.codetable);
  const state = useAppSelector((state) => state.cgCareProvider);
  const edit = useAppSelector((state) => state.popup.edit);

  const [click, setClick] = useState(false);
  const [disableOtherType, setDisableOtherType] = useState<boolean>(
    state.data.type !== "" ? false : true
  );

  useEffect(() => handleEffect(dispatch, state.data.id), []);

  return (
    <CgLayout>
      <Box
        component="form"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem 0",
          "> div": { display: "flex", gap: "0 1rem" },
          "> div > div": { flex: "1 1 0" },
        }}
        onChange={(event: SyntheticEvent<HTMLFormElement>) => {
          if (event.currentTarget.type.value === "Other") {
            setDisableOtherType(false);
          } else {
            event.currentTarget.otherType.value = "";
            setDisableOtherType(true);
          }
        }}
        onSubmit={(event) =>
          handleSubmit(event, navigate, dispatch, state.data, edit)
        }
        onKeyDown={onKeyDown}
      >
        {state.data.referenceId! >= 0 ? (
          <Typography paddingLeft={1}>
            Reference ID : {state.data.referenceId}
          </Typography>
        ) : (
          <></>
        )}
        <div>
          <div>
            <Input autofill={state.data.name} id="naam" value="Name" required />
          </div>
          <div>
            <CYFMSDropdown
              autofill={state.data.status}
              id="status"
              optionsList={Object.values(cgStatus).map(
                (cgStatus: any) => cgStatus.en
              )}
              value="Status"
              required
            />
          </div>
        </div>
        <div>
          <div>
            <CYFMSDropdown
              autofill={state.data.type}
              id="type"
              optionsList={Object.values(cgType).map(
                (cgType: any) => cgType.en
              )}
              value="Type"
              required
            />
          </div>
          <div>
            <Input
              autofill={state.data.otherType}
              id="otherType"
              value="Please specify"
              disabled={disableOtherType}
            />
          </div>
        </div>
        <div>
          <div>
            <Input autofill={state.data.address} id="address" value="Address" />
          </div>
          <div>
            <Input autofill={state.data.city} id="city" value="City" />
          </div>
        </div>
        <div>
          <div>
            <Input
              autofill={state.data.postalCode}
              id="postalCode"
              value="Postal Code"
            />
          </div>
          <div>
            <Input
              autofill={state.data.province}
              id="province"
              value="Province"
            />
          </div>
        </div>
        <div>
          <div>
            <Input
              autofill={state.data.phoneNumber}
              id="phoneNumber"
              value="Phone Number"
            />
          </div>
          <div>
            <Input
              autofill={state.data.email}
              type="email"
              id="eMail"
              value="Email"
            />
          </div>
        </div>
        <div>
          <div>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <FormLabel
                sx={{ p: 1, flexBasis: 0, flexGrow: 1, color: "black" }}
              >
                Primary Caregiver
              </FormLabel>
              <OutlinedInput
                sx={{
                  borderRadius: 0,
                  flexBasis: 0,
                  flexGrow: 1.9,
                }}
                id="primaryCaregiver"
                size="small"
                value={state.data.primaryCaregiver}
                style={{ backgroundColor: "#dfdada" }}
                required
                endAdornment={<SearchIcon onClick={() => setClick(true)} />}
              />
            </FormControl>
          </div>
          <div>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <FormLabel
                sx={{ p: 1, flexBasis: 0, flexGrow: 1, color: "black" }}
              >
                Secondary Caregiver
              </FormLabel>
              <OutlinedInput
                sx={{
                  borderRadius: 0,
                  flexBasis: 0,
                  flexGrow: 1.9,
                }}
                id="secondaryCaregiver"
                size="small"
                value={state.data.secondaryCaregiver}
                style={{ backgroundColor: "#dfdada" }}
                endAdornment={<SearchIcon onClick={() => setClick(true)} />}
              />
            </FormControl>
          </div>
        </div>
        <Box sx={{ justifyContent: "right" }}>
          <CYFSWMSSaveButton />
        </Box>
      </Box>
      {click && (
        <SearchClientName
          click={click}
          setClick={setClick}
          moduleName="initialContact"
        />
      )}
    </CgLayout>
  );
};

export default CareProvider;
