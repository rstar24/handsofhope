import AttachmentsContext from "../../../contexts/AttachmentsContext";
import { doDelete } from "../../../features/cyfms/attachments/slice";
import { useAppDispatch, useAppSelector } from "../../../library/hooks";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import type { FC, MouseEventHandler } from "react";

const ITEM_HEIGHT = 48;

/**
 * `EditIcon` is used to show edit options on `/edit` \
 * page of an `/attachment` of `CYFMS` aka \
 * `Child, Youth, Family, and Management Services` module.
 * @returns `ReactElement`
 */
const EditIcon: FC = () => {
  const context = useContext(AttachmentsContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.cyfmsAttachments.data);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openDropDown = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close MoreHorIcon Popup
  const handleCloseDropDown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleEdit: MouseEventHandler<HTMLElement> = (event) => {
    handleCloseDropDown(event);
    navigate("../attachments/edit");
  };

  const handleDelete: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    dispatch(doDelete(data[context.selected].participantAttachmentId))
      .unwrap()
      .then(() => {
        navigate("../attachments");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    navigate("../attachments");
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
            maxWidth: "10ch",
          },
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Close</MenuItem>
      </Menu>
    </div>
  );
};

export default EditIcon;
