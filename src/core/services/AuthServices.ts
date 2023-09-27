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

  
const ForgotPassword = async (body: any) => {
  try {
    const res = await BackendApi.post(`${ApiUrl.ForgotPassword}`, body);
    return res.data;
  } catch (ex: any) {
    console.error(ex);
  }
};
  const ChangePassword = async (body: any) => {
    try {
      const res = await BackendApi.post(`${ApiUrl.ChangePassword}`, body);
      return res.data;
    } catch (ex: any) {
      console.error(ex);
    }
};

const ManagePlanProducts = async (productName : string , productId : number) => {
  try 
  { const res = await BackendApi.get( `${ApiUrl.ManagePlanProducts}?productName=${productName}&productId=${productId}`);
    return res.data;
  } catch (ex: any) {
    console.error(ex);
  }
};


const TeamDetails = async () => {
  try {
    const res = await BackendApi.post(`${ApiUrl.TeamDetails}`);
    return res.data;
  } catch (ex: any) {
    console.error(ex);
  }
};
export const AuthServices = {
  Login,
  SignUp,
  ForgotPassword,
  ChangePassword,
  ManagePlanProducts,
  TeamDetails
};
       