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
import { useNavigate } from "react-router-dom";
import { AuthServices } from "../../core/services/AuthServices";
import { RoutePath } from "../../core/constants/RoutesPath";
import { validateEmail, validatePassword } from "../../config/helper-method";


const LoginScreen = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data: any) => {
    console.log(data);
    const body = { ...data, name: "", otp: true };
    await AuthServices.Login(body).then((res) => {
      if (res) {
        console.log(res?.response);
        navigate(`${RoutePath.DashboardScreen}`)
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
                <Heading text="Login" />

                <form onSubmit={handleSubmit(handleLogin)}>
                  <InputField
                    controlName="username"
                    register={register}
                    label="Email"
                    type="email"
                    errors={errors}
                    rules={{
                      required: "Email is required",
                      pattern :  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
                      message: " At least one uppercase letter, one lowercase letter, one number and @ character and space literals",
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
                      pattern:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message:

                      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                    // //   pattern: {
                    // //     value: validatePassword, 
                    // //     message: "Invalid password",
                    // //   },
                    }}
                  />

                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Keep me logged In"
                  />

                  <Link>Forgot Password?</Link>

                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    Login
                  </Button>
                  <div style={{ flexDirection: "row" }}>
                    <label>
                      Don’t have an account?{" "}
                      <Link onClick={() => navigate(`${RoutePath.SignUp}`)}>
                        Create an account
                      </Link>
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

export default LoginScreen;
