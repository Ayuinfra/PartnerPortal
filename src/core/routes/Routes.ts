import { FC } from "react";
import BillingScreen from "../../screens/accounts/billing/BillingScreen";
import ProfileScreen from "../../screens/accounts/profile/ProfileScreen";
import TeamsScreen from "../../screens/accounts/teams/TeamsScreen";
import UsageScreen from "../../screens/accounts/usage/Usage";
import DashboardScreen from "../../screens/dashboard/DashboardScreen";
import { RoutePath } from "../constants/RoutesPath";
import SignUpScreen from "../../screens/auth/SignUpScreen";
import LoginScreen from "../../screens/auth/LoginScreen";
import ManagePlanScreen from "../../screens/accounts/managePlan/ManagePlanScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
import ChangePasswordScreen from "../../screens/auth/ChangePasswordScreen";
interface Routes {
  key: string;
  path: string;
  component: FC<Record<string, string>>;
  navigatePath?: any;
}

export const AuthRoute: Array<Routes> = [
  {
    key: "signup",
    path: `/${RoutePath.SignUp}`,
    component: SignUpScreen,
  },
  {
    key: "login",
    path: `/`,
    component: LoginScreen,
  },
  {
    key: "forgotpassword",
    path: `/${RoutePath.ForgotPassword}`,
    component: ForgotPasswordScreen,
  },
  {
    key: "changepassword",
    path: `/${RoutePath.ChangePassword}`,
    component: ChangePasswordScreen,
  },
];

export const CredentsRoute: Array<Routes> = [
  {
    key: "dashboard",
    path: `/${RoutePath.DashboardScreen}`,
    component: DashboardScreen,
  },

  {
    key: "profile",
    path: `/${RoutePath.Profile}`,
    component: ProfileScreen,
  },
  {
    key: "billing",

    path: `/${RoutePath.Billing}`,

    component: BillingScreen,
  },
  {
    key: "manage-plan",
    path: `/${RoutePath.ManagePlan}`,
    component: ManagePlanScreen,
  },
  {
    key: "usage",
    path: `/${RoutePath.Usage}`,
    component: UsageScreen,
  },

  {
    key: "teams",
    path: `/${RoutePath.Teams}`,
    component: TeamsScreen,
  },
];






