import React, { useContext, useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthRoute, CredentsRoute } from "./core/routes/Routes";
import BackendApi from "./api/shared/BackendApi";
import DrawerLayout from "./component/layout/DrawerLayout";
import NotFoundScreen from "./screens/NotFoundScreen";
import CommonSnackBar from "./component/common/CommonSnackBar";
import { getUserFromLocalStorage } from "./api/shared/CommonApi";
import { CommonContext, CommonContextType } from "./core/context/CommonContext";
import AuthGuard from "./core/guards/AuthGuard";

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { setLoggedInUserData } = useContext(
    CommonContext
  ) as CommonContextType;

 
    BackendApi.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response) {
          // const status = error?.response?.status;
          //if (status === 401) {
          setSnackbarMessage(error?.response?.data?.message);
          setSnackbarOpen(true);
          // }
        } else {
          console.error("Network Error:", error.message);
        }
        return Promise.reject(error);
      }
    );

    BackendApi.interceptors.request.use(
      (config) => {
        console.log('config')
        const user: any = getUserFromLocalStorage();
        console.log(user?.access_token)
         if (user?.access_token) {
         
          config.headers.Authorization = `Bearer ${user?.access_token}`;
         }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );


  const user = getUserFromLocalStorage();
  useEffect(() => {
  
    if (user !== null) {
      setLoggedInUserData(JSON.stringify(user));
    }
  }, [setLoggedInUserData, user]);

  return (
    <React.Fragment>
      <Routes>
        {!user ? (
          <>
            {AuthRoute.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
            <Route path="/*" element={<NotFoundScreen />} />
          </>
        ) : (
          <>
            <Route path="/" element={<AuthGuard><DrawerLayout outlet={<Outlet />} /></AuthGuard>}>
              {CredentsRoute.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Route>
            <Route path="/*" element={<NotFoundScreen />} />
          </>
        )}
      </Routes>
      <CommonSnackBar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </React.Fragment>
  );
}

export default App;
