import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthServices } from "../../core/services/AuthServices";
import { useForm } from "react-hook-form";
import InputField from "../../component/common/InputField";
import { Container, Grid, Paper, Button } from "@mui/material";
import Heading from "../../component/common/Heading";
import { emailPattern, emailMessage } from "../../config/helper-method";
import logo from "../../assets/images/infrablok-logo.png";
import { RoutePath } from "../../core/constants/RoutesPath";

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const handleForgotPassword = async (data: any) => {
    const body = { ...data, password: "" };
    await AuthServices.ForgotPassword(body).then((res) => {
      if (res) {
        navigate(`/${RoutePath.ChangePassword}`, {
          state: {
            username: getValues("username"),
            generatedOTP: res?.response.generatedOTP,
          },
        });
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
                <Heading text="Forgot Password" />

                <form onSubmit={handleSubmit(handleForgotPassword)}>
                  <InputField
                    controlName="username"
                    register={register}
                    label="Email"
                    type="email"
                    errors={errors}
                    rules={{
                      required: "Email is required",
                      pattern: emailPattern,
                      message: emailMessage,
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isValid}
                    style={{ marginBottom: "6px" }}
                  >
                    Recover Password
                  </Button>
                  <div style={{ flexDirection: "row" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => navigate(`/`)}
                      style={{ marginBottom: "6px" }}
                    >
                      Go back To Login
                    </Button>
                  </div>
                </form>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ForgotPasswordScreen;
