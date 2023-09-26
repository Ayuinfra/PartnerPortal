import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { FC } from "react";

import CloseIcon from "@mui/icons-material/Close";

interface ICustomDialogProps {
  open: boolean;

  child: any;

  primaryBtn: string;

  secondryBtn?: string;

  primaryBtnAction: () => void;

  secondryBtnAction?: () => void;

  title: string;

  onClose: () => void;
}

const CustomDialog: FC<ICustomDialogProps> = (props) => {
  const {
    child,
    onClose,
    open,
    primaryBtn,
    primaryBtnAction,
    title,
    secondryBtn,
    secondryBtnAction,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ textAlign: "right" }}>
        <CloseIcon onClick={onClose} />
      </div>

      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {child}
        </DialogContentText>
      </DialogContent>

      <DialogActions style={{ justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={primaryBtnAction}>
          {primaryBtn}
        </Button>

        {secondryBtn && (
          <Button variant="outlined" onClick={secondryBtnAction}>
            {secondryBtn}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
