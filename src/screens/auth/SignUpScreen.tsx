import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../component/common/InputField";
import {
  Button,
  Link,
  Grid,
  Container,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { useNavigate, NavLink } from "react-router-dom";
import { AuthServices } from "../../core/services/AuthServices";
import logo from "../../assets/images/infrablok-logo.png";
import Heading from "../../component/common/Heading";

import {
  emailMessage,
  emailPattern,
  passwordMessage,
  passwordPattern,
} from "../../config/helper-method";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false); 

  const handleSignup = async (data: any) => {
    if (!acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

   

    const body = { ...data, otp: true };

    await AuthServices.SignUp(body).then((res: any) => {
      if (res) {
  
      }
    });

    navigate(`${"/"}`);
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

  return (
    <>
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
                  className="mb-4"
                  src={logo}
                  alt="not found"
                  style={{ width: "200px" }}
                />

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
                      pattern: emailPattern,
                      message: emailMessage,
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

                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={acceptTerms}
                        onChange={() => setAcceptTerms(!acceptTerms)}
                      />
                    }
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
                    fullWidth
                    style={{ backgroundColor: "white" }}
                    variant="outlined"
                    type="submit"
                    disabled={!isValid } 
                  >
                    Sign Up
                  </Button>

                  <div className="mb-4">
                    <label>
                      Already have an account{" "}
                      <Link
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Login
                      </Link>
                    </label>
                  </div>
                </form>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SignUp;
