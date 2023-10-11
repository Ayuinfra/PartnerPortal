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

const GetAllPlanProducts = async () => {
  try 
  { const res = await BackendApi.get( `${ApiUrl.ManagePlanProducts}`);
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


const TeamDetails = async (profileId : string) => {
  try {
    const res = await BackendApi.post(`${ApiUrl.TeamDetails}?profileId=${profileId}`);
    return res.data;
  } catch (ex: any) {
    console.error(ex);
  }
};


const SendTeamInvitation = async (body :any) => {
  try{
    const res = await BackendApi.post(`${ApiUrl.SendTeamInvitation}`,body);
    return res.data;
  } catch (ex:any){
    console.error(ex);
  }
}

const UpdateTeamRole = async (body :any) => {
  try{
    const res = await BackendApi.post(`${ApiUrl.UpdateTeamRole}`,body);
    return res.data;
  } catch (ex:any){
    console.error(ex);
  }
}
const addWalletPlan = async (body :any) => {
  try{
    const res = await BackendApi.post(`${ApiUrl.addWalletPlan}`,body);
    return res.data;
  } catch (ex:any){
    console.error(ex);
  }
}
const EditProfile = async (body: any) => {
  try {
    const res = await BackendApi.patch(`${ApiUrl.EditProfile}`, body);
    return res.data;
  } catch (ex) {
    console.log(ex);
  }
};
const UserProfileDetails = async (userName: string) => {
  try {
    const res = await BackendApi.get(
      `${ApiUrl.UserProfileDetails}?username=${userName}`
    );
    return res.data;
  } catch (ex) {
    console.log(ex);
  }
};

const ProfileDeleteAccount = async (userName:string) => {
  try {
    const res = await BackendApi.delete(`${ApiUrl.ProfileDeleteAccount}?username=${userName}`);
    return res.data;
  } catch (ex) {
    console.log(ex);
  }
};
const ProfilePicture = async (body :any,profileId : string) => {
  try {
    const res = await BackendApi.post(`${ApiUrl.ProfilePicture}?profileId=${profileId}`,body);
    return res.data;
  } catch (ex) {
    console.log(ex);
  }
};
export const AuthServices = {
  Login,
  SignUp,
  ForgotPassword,
  ChangePassword,
  ManagePlanProducts,
  TeamDetails,
  SendTeamInvitation,
  UpdateTeamRole,
  GetAllPlanProducts,
  addWalletPlan,
  EditProfile,
  UserProfileDetails,
  ProfileDeleteAccount,
  ProfilePicture
  

};
       