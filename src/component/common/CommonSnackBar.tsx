import * as React from "react";

import Stack from "@mui/material/Stack";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type props = {
  open: boolean;

  message: string;

  onClose: () => void;
};

const CommonSnackBar = ({ open, message, onClose }: props) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CommonSnackBar;
