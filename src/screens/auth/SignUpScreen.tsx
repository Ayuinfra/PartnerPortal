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

const SignUpScreen = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data: any) => {
    console.log(data);
    const body = { ...data, otp: true };
    await AuthServices.SignUp(body).then((res: any) => {
      if (res) {
        console.log(res?.response);
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
                <img src={logo} alt="InfraBlok" style={{ width: "200px" }} />
                <Heading text="Create New Account" />

                <form onSubmit={handleSubmit(handleSignup)}>
                  <InputField
                    controlName="name"
                    register={register}
                    label="Name"
                    type="Name"
                    errors={errors}
                    rules={{ required: true }}
                  />
                  <InputField
                    controlName="username"
                    register={register}
                    label="Email"
                    type="Email"
                    errors={errors}
                    rules={{ required: true }}
                  />
                  <InputField
                    controlName="password"
                    register={register}
                    label="Password"
                    type="password"
                    errors={errors}
                    rules={{ required: true }}
                  />
                  <InputField
                    controlName="Confirm Password"
                    register={register}
                    label="Confirm Password"
                    type="Confirm Password"
                    errors={errors}
                    rules={{ required: true }}
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
      </Container>
    </div>
  );
};

export default SignUpScreen;
