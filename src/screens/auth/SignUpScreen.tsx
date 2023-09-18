import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Checkbox,
  Link,
} from "@mui/material";
import logo from "../../assets/images/infrablok-logo.png";
import Heading from "../../component/common/Heading";
import InputField from "../../component/common/InputField";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthServices } from "../../core/services/AuthServices";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../config/helper-method";
import CommonSnackBar from "../../component/common/CommonSnackBar";
import { useState } from "react";

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<any>(false);
  const [message, setMessage] = useState<any>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleSignup = async (data: any) => {
    console.log(data);
    const body = { ...data, otp: true };
    await AuthServices.SignUp(body).then((res) => {
      if (res) {
        console.log(res?.response);
      }
      setOpen(true);
      setMessage("Data Saved");
    });
  };

  const validateConfirmPassword = (value: any) => {
    const password = getValues("password");
    return password === value || "Passwords do not match";
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
                <img src={logo} alt="InfraBlok" style={{ width: "200px" }} />
                <Heading text="Create New Account" />

                <form onSubmit={handleSubmit(handleSignup)}>
                  <InputField
                    controlName="name"
                    register={register}
                    label="Name"
                    type="Name"
                    errors={errors}
                    rules={{
                      required: "Name is required",
                      pattern: {
                        value: validateName,
                        message: "Invalid Name",
                      },
                    }}
                  />
                  <InputField
                    controlName="username"
                    register={register}
                    label="Email"
                    type="Email"
                    errors={errors}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: validateEmail,
                        message: "Invalid email address",
                      },
                    }}
                  />
                  <InputField
                    controlName="password"
                    register={register}
                    label="Password"
                    type="password"
                    errors={errors}
                    rules={{
                      required: "Password is required",
                      pattern: {
                        value: validatePassword,
                        message: "Invalid Password",
                      },
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
                      validate: validateConfirmPassword,
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="I accept the"
                  />
                  <NavLink
                    style={{ fontSize: "12px" }}
                    to={"https://infrablok.com/terms-and-conditions/"}
                  >
                    Terms And Conditions
                  </NavLink>

                  <label style={{ fontSize: "12px" }}> and </label>

                  <NavLink
                    style={{ fontSize: "12px" }}
                    to={"https://infrablok.com/privacy-policy/"}
                  >
                    Privacy Policy
                  </NavLink>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    SignUp
                  </Button>
                  <div style={{ flexDirection: "row" }}>
                    <label>
                      Already have an account{" "}
                      <Link onClick={() => navigate("/")}>Login</Link>
                    </label>
                  </div>
                </form>
              </Container>
            </Paper>
          </Grid>
        </Grid>
        <CommonSnackBar
          open={open}
          message={message}
          onClose={() => setOpen(false)}
        />
      </Container>
    </div>
  );
};

export default SignUpScreen;
