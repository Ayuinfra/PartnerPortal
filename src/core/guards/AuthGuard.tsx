import { Navigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../api/shared/CommonApi";

const AuthGuard = ({children} : any) => {
  const user = getUserFromLocalStorage();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AuthGuard;
