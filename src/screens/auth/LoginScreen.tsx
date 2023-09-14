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
    await AuthServices.Login(body).then((res: any) => {
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
                <Heading text="Login" />

                <form onSubmit={handleSubmit(handleLogin)}>
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
                      <Link onClick={() => navigate(`${RoutePath.signup}`)}>
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
