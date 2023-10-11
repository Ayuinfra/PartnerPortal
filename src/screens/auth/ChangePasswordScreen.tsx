import { Container, Grid, Paper, Button } from "@mui/material";
import React, { useState, memo } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../component/common/Heading";
import InputField from "../../component/common/InputField";
import { passwordMessage, passwordPattern } from "../../config/helper-method";
import { AuthServices } from "../../core/services/AuthServices";
import logo from "../../assets/images/infrablok-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import DialogBox from "../../component/common/CustomDialog";

const ChangePasswordScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const handleClose = () => {
    setOpen(false);
    navigate(-2);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const validateConfirmPassword = (value: any) => {
    const password = getValues("password");

    if (password === value) {
      setConfirmPasswordError("");

      return true;
    } else {
      setConfirmPasswordError("Passwords do not match");

      return false;
    }
  };
  const handleChangePassword = async (data: any) => {
    delete data.confirmPassword;
    const body = {
      ...data,
      username: location?.state?.username,
      generatedOTP: location?.state?.generatedOTP,
    };
    await AuthServices.ChangePassword(body).then((res) => {
      if (res) {
      }
    });
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <Grid item xs={12}>
            <Paper elevation={3}>
              <Container component="div" maxWidth="xs">
                <img
                  src={logo}
                  alt="InfraBlok"
                  style={{ width: "200px", marginTop: "7px" }}
                />
                <Heading text="Change Password" />

                <form onSubmit={handleSubmit(handleChangePassword)}>
                  <InputField
                    controlName="password"
                    register={register}
                    label="Password"
                    type="password"
                    errors={errors}
                    rules={{
                      required: "Password is required",
                      pattern: passwordPattern,
                      message: passwordMessage,
                    }}
                  />
                  <InputField
                    controlName="confirmPassword"
                    register={register}
                    label="Confirm Password"
                    type="password"
                    errors={errors}
                    rules={{
                      required: "Confirm Password is required",
                      pattern: passwordPattern,
                      message: passwordMessage,
                      validate: validateConfirmPassword,
                    }}
                  />
                  {confirmPasswordError && (
                    <span style={{ color: "red" }}>{confirmPasswordError}</span>
                  )}
                  <InputField
                    controlName="userOTP"
                    register={register}
                    label="Verification"
                    type="verification"
                    errors={errors}
                    rules={{
                      required: "Otp is required",
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isValid}
                    style={{ marginBottom: "6px" }}
                    onClick={handleOpen}
                  >
                    Update Password
                  </Button>
                </form>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <DialogBox
        primaryBtnAction={handleClose}
        open={open}
        child={undefined}
        primaryBtn={"Proceed To Login"}
        title={"Password Updated"}
        onClose={handleClose}
      />
    </div>
  );
};

export default memo(ChangePasswordScreen);
