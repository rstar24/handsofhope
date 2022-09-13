import { Box, Button, IconButton, Modal } from "@mui/material";
import React, { useState } from "react";
import CYFMSDropdown from "../CYFMSDropdown";
import Input from "../../Input";
import CloseIcon from "@mui/icons-material/Close";
import CYFMSHeader from "../CYFMSHeader";
import ClientResults from "./ClientResults";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import type { ReactElement } from "react";
import { doGet, Record } from "../../../features/cyfms/search/slice";
const SearchClientName = ({
  moduleName,
  setDisabled,
  setAddNew,
  contactId,
  targetValue,
  click,
  setClick,
}: any): ReactElement => {
  const dispatch = useAppDispatch();
  const [show, setShown] = useState(false);
  const { maritalstatus } = useAppSelector((state) => state.codetable);
  const handleClose = () => {
    setClick(false);
  };

  const hide = () => {
    setShown(false);
  };

  const handleSubmit: AppFormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setShown(true);
    const formData: Record = {
      participantId: null,
      referenceId: event.currentTarget.referenceId.value || null,
      firstname: event.currentTarget.firstName.value || null,
      surname: event.currentTarget.lastName.value || null,
      middleName: event.currentTarget.middleName.value || null,
      dateOfBirth: event.currentTarget.dateOfBirth.value || null,
      maritalStatus: event.currentTarget.maritalStatus.value || null,
      city: event.currentTarget.city.value || null,
      workPhone: event.currentTarget.phoneNo.value || null,
    };
    dispatch(doGet(formData))
      .unwrap()
      .then(() => {
        console.log("CYFMS Search POST backend API was successful!");
      })
      .catch((err) => {
        console.log("InitialContact Search POST backend API didn't work!");
        console.log(err);
      });
  };
  return (
    <div>
      <Modal
        open={click}
        onClose={(_event, reason) => {
          switch (reason) {
            case "backdropClick":
              return;
            case "escapeKeyDown":
              return;
          }
        }}
      >
        <Box
          sx={{
            position: "relative",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: 500,
            maxWidth: 1000,
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
              handleClose();
            }}
            sx={{ position: "absolute", right: 0 }}
          >
            <CloseIcon />
          </IconButton>

          <CYFMSHeader />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              p: "1rem",
              gap: "1rem",
              "& div": { width: { xs: "100%", md: 350 } },
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Button
                sx={{
                  background: "lightgrey",
                  color: "black",
                  border: "1px solid black",
                  maxWidth: 300,
                  textTransform: "none",
                  mx: "auto",
                  mb: "auto",
                }}
              >
                Search for a Child, Youth, or Family Member
              </Button>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem 0",
              }}
              onSubmit={handleSubmit}
            >
              <Input
                id="referenceId"
                validationPattern={`^[^a-zA-Z]*$`}
                validationTitle="Alphabets are not allowed!"
                value="Reference Id"
              />
              <Input
                id="firstName"
                minChars={2}
                validationPattern={`^[a-zA-Z ]*$`}
                validationTitle="Digits are not allowed!"
                value="First Name"
              />
              <Input
                id="middleName"
                minChars={2}
                validationPattern={`^[a-zA-Z ]*$`}
                validationTitle="Digits are not allowed!"
                value="Middle Name"
              />
              <Input
                id="lastName"
                minChars={2}
                validationPattern={`^[a-zA-Z ]*$`}
                validationTitle="Digits are not allowed!"
                value="Last Name"
              />
              <Input
                id="dateOfBirth"
                maxDate={new Date().toISOString().substring(0, 10)}
                minDate="1900-01-01"
                type="date"
                value="Date Of Birth"
              />
              <CYFMSDropdown
                id="maritalStatus"
                autofill={""}
                optionsList={Object.values(maritalstatus).map(
                  (status: any) => status.en
                )}
                value="Marital Status"
              />
              <Input
                id="phoneNo"
                minChars={2}
                validationPattern={`^[^a-zA-Z]*$`}
                validationTitle="Alphabets are not allowed!"
                value="Phone No"
                name="phoneNo"
              />
              <Input
                id="city"
                minChars={2}
                validationPattern={`^[a-zA-Z ]*$`}
                validationTitle="Digits are not allowed!"
                value="City"
                name="city"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ flex: "1.08 1 0" }}></Box>
                <Box
                  sx={{
                    flex: "2 1 0",
                    display: "flex",
                    justifyContent: "center",
                    gap: "0 1rem",
                  }}
                >
                  <Button variant="contained" type="submit">
                    Search
                  </Button>
                  <Button variant="contained" type="reset" onClick={hide}>
                    Reset
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          {show && (
            <ClientResults setClick={setClick} moduleName={moduleName} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default SearchClientName;
