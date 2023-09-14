import { FC } from "react";
import LoginScreen from "../../screens/auth/LoginScreen";
import SignUpScreen from "../../screens/auth/SignUpScreen";

import { RoutePath } from "../constants/RoutesPath";

interface Routes {
  key: string;
  path: string;
  component: FC<Record<string, string>>;
  navigation?: string;
}

export const AuthRoutes: Array<Routes> = [
  {
    key: "login",
    path: `/`,
    component: LoginScreen,
  },
  {
    key: "signup",
    path: `/${RoutePath.signup}`,
    component: SignUpScreen,
  },
];
