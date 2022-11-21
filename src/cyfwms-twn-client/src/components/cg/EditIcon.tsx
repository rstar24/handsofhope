import { doDelete } from "../../features/initialContact/all/slice";
import { initiate } from "../../features/initiatorSlice";
import { setEdit, setOpen } from "../../features/popupSlice";
import { unhideTabs } from "../../features/navBarSlice";
import { doGet as doGetCaregiverProvider } from "../../features/cg/careProvider/slice";
import { spliceRecord } from "../../features/initialContact/search/slice";
import {
  doGet as doGetCp,
  clean as cleanStateCp,
} from "../../features/cg/careProvider/slice";
import {
  doGet as doGetCapacity,
  clean as cleanStateCapacity,
} from "../../features/cg/capacity/slice";
import {
  doGet as doGetCaregiver,
  cleanState as cleanStateCaregiver,
} from "../../features/cg/caregivers/slice";
import {
  doGet as doGetContactNotes,
  cleanState as cleanStateContactNotes,
} from "../../features/cg/contactNotes/slice";
import {
  doGet as doGetAttachment,
  clean as cleanStateAttachment,
} from "../../features/cg/attachments/slice";
import {
  doGet as doGetAppointment,
  cleanState as cleanStateAppointment,
} from "../../features/cg/appointment/slice";
import {
  doGet as doGetReminders,
  cleanState as cleanStateReminders,
} from "../../features/cg/reminders/slice";
import { useAppDispatch } from "../../library/hooks";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Button, IconButton, Modal, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { doSearch } from "../../features/cg/contactNotes/slice";
import type { FC } from "react";

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

const EditIcon: FC<any> = (props) => {
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
          to="care_provider"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            handleCloseDropDown(event);
            dispatch(doSearch({ id: props.cgProviderId, data: "" }));
            dispatch(doGetCaregiverProvider(props.cgProviderId))
              .unwrap()
              .then(() => {
                dispatch(initiate(null));
                dispatch(unhideTabs(null));
                dispatch(setEdit(true));
                dispatch(setOpen(true));
                dispatch(doGetCp(props.value));
                dispatch(doGetCapacity(props.value));
                dispatch(doGetCaregiver(props.value));
                dispatch(doGetContactNotes(props.value));
                dispatch(doGetAttachment(props.value));
                dispatch(doGetAppointment(props.value));
                dispatch(doGetReminders(props.value));
              })
              .catch((err) => {
                console.log("Unable to edit!");
                console.log(err);
              });
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          to="#"
          component={Link}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            handleCloseDropDown(event);
          }}
        >
          Delete
        </MenuItem>
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
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(doDelete(props.cgProviderId))
                  .unwrap()
                  .then(() => {
                    dispatch(spliceRecord(props.cgProviderId));
                    setOpenModel(false);
                    dispatch(cleanStateCp(null));
                    dispatch(cleanStateCapacity(null));
                    dispatch(cleanStateCaregiver(null));
                    dispatch(cleanStateContactNotes(null));
                    dispatch(cleanStateAttachment(null));
                    dispatch(cleanStateAppointment(null));
                    dispatch(cleanStateReminders(null));
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Yes
            </Button>
            <Button onClick={handleCloseModel}>No</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditIcon;
