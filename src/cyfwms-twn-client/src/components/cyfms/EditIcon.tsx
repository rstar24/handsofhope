import {
  doGetGender,
  doGetMaritalStatus,
  doGetEducation,
  doGetTypeOfEmployee,
  doGetRole,
} from "../../features/codetable/codetableSlice";
import { initiate } from "../../features/initiatorSlice";
import { setEdit, setOpen } from "../../features/popupSlice";
import { unhideTabs } from "../../features/navBarSlice";
import { doGet as doGetRegister } from "../../features/cyfms/register/slice";
import { useAppDispatch } from "../../library/hooks";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Button, IconButton, Modal, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import type { ReactElement } from "react";
import { doGet } from "../../features/cyfms/contact/slice";
import { doGet as doGetHouseholdMembers } from "../../features/cyfms/householdMembers/slice";
import { doGet as doGetEducationAndEmployment } from "../../features/cyfms/educationAndEmployment/slice";
import { doGet as doGetCriminalHistory } from "../../features/cyfms/criminalHistory/slice";
import { doGet as doGetFamilyPhysicians } from "../../features/cyfms/familyPhysicians/slice";
import { doGet as doGetCounselors } from "../../features/cyfms/counselors/slice";
import { doGet as doGetOtherInformation } from "../../features/cyfms/otherInformation/slice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const ITEM_HEIGHT = 48;
export const openPopup = true;

const EditIcon = (props: any): ReactElement => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModel, setOpenModel] = React.useState(false);
  const openDropDown = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close MoreHorIcon Popup
  const handleCloseDropDown = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.tabIndex !== 0) {
      setOpenModel(true);
    }
    setAnchorEl(null);
  };

  const handleCloseModel = () => {
    setOpenModel(false);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={openDropDown ? "long-menu" : undefined}
        aria-expanded={openDropDown ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={openDropDown}
        onClose={(event, reason) => {
          setAnchorEl(null);
        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          component={Link}
          to="register"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            handleCloseDropDown(event);
            dispatch(doGetGender());
            dispatch(doGetMaritalStatus());
            dispatch(doGetEducation());
            dispatch(doGetTypeOfEmployee());
            dispatch(doGetRole());
            dispatch(doGet(props.value));
            dispatch(doGetHouseholdMembers(props.value));
            dispatch(doGetEducationAndEmployment(props.value));
            dispatch(doGetCriminalHistory(props.value));
            dispatch(doGetFamilyPhysicians(props.value));
            dispatch(doGetCounselors(props.value));
            dispatch(doGetOtherInformation(props.value));
            dispatch(doGetRegister(props.value))
              .unwrap()
              .then(() => {
                dispatch(initiate(null));
                dispatch(unhideTabs(null));
                dispatch(setEdit(true));
                dispatch(setOpen(true));
              })
              .catch((err) => {
                console.log("Unable to edit!");
                console.log(err);
              });
          }}
        >
          Edit
        </MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
      <Modal
        open={openModel}
        onClose={(event, reason) => {
          switch (reason) {
            case "backdropClick":
              return;
            case "escapeKeyDown":
              handleCloseModel();
          }
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400, paddingLeft: "5%" }}>
          <p id="parent-modal-description">
            Are you sure ? You want to delete ?
          </p>
          <Box paddingLeft={7}>
            <Button>Yes</Button>
            <Button onClick={handleCloseModel}>No</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditIcon;
