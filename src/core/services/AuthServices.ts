import BackendApi from "../../api/shared/BackendApi";
import { ApiUrl } from "../constants/ApiUrl";

const Login = async (body: any) => {
  try {
    const res = await BackendApi.post(`${ApiUrl.Login}`, body);
    return res.data;
  } catch (ex: any) {
    console.error(ex);
  }
};

const SignUp = async (body: any) => {
    try {
      const res = await BackendApi.post(`${ApiUrl.Signup}`, body);
      return res.data;
    } catch (ex: any) {
      console.error(ex);
    }
  };
export const AuthServices = {
  Login,
  SignUp,
};
       