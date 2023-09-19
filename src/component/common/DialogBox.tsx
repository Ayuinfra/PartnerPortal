import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type ModalProps = {
  open: boolean;
  child: any;
  addBtnName: string;
  icon: any;
  title: string;
  handleModalClose: () => void;
};

const DialogBox = ({
  open,
  child,
  addBtnName,
  icon,
  handleModalClose,
  title,
}: ModalProps) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ textAlign: "center" }}>{icon}</div>

        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {child}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleModalClose}>{addBtnName}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogBox;
