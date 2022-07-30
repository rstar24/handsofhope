import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../library/hooks";
import { Box, Button, Modal } from "@mui/material";
import { PopupContext } from "./CYFMS";
import { doGet as doGetRegister } from "../../features/cyfms/register/slice";
import { doGet as doGetContact } from "../../features/cyfms/contact/slice";
import { doGet as doGetCounselors } from "../../features/cyfms/counselors/slice";
import { doGet as doGetEducationAndEmployment } from "../../features/cyfms/educationAndEmployment/slice";
import { doGet as doGetOtherInformation } from "../../features/cyfms/otherInformation/slice";
import { doGet as doGetCriminalHistory } from "../../features/cyfms/criminalHistory/slice";
import { doGet as doGetHouseholdMembers } from "../../features/cyfms/householdMembers/slice";
import { doGet as doGetFamilyPhysicians } from "../../features/cyfms/familyPhysicians/slice";
import {
  doGetGender,
  doGetMaritalStatus,
} from "../../features/codetable/codetableSlice";
const options = ["Edit", "Delete"];
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
export default function EditIcon(props: any) {
  const dispatch = useAppDispatch();
  const { open, setOpen } = useContext(PopupContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [openModel, setOpenModel] = React.useState(false);
  const openDropDown = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close MoreHorIcon Popup
  const handleCloseDropDown = (event: React.MouseEvent<HTMLElement>) => {
    console.log("current", props.value);

    if (event.currentTarget.tabIndex !== 0) {
      setOpenModel(true);
    } else {
      setOpen(true);
      dispatch(doGetRegister(props.value));
      dispatch(doGetGender());
      dispatch(doGetMaritalStatus());
      dispatch(doGetContact(props.value));
      dispatch(doGetEducationAndEmployment(props.value));
      dispatch(doGetOtherInformation(props.value));
      dispatch(doGetCriminalHistory(props.value));
      dispatch(doGetHouseholdMembers(props.value));
      dispatch(doGetFamilyPhysicians(props.value));
      dispatch(doGetCounselors(props.value)).then(() => {
        navigate("/cyfms/register", { state: openPopup });
      });
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
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={handleCloseDropDown}>
            {option}
          </MenuItem>
        ))}
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
}
