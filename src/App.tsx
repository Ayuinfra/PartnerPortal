import React, { useContext, useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthRoute, CredentsRoute } from "./core/routes/Routes";
import BackendApi from "./api/shared/BackendApi";
import DrawerLayout from "./component/layout/DrawerLayout";
import NotFoundScreen from "./screens/NotFoundScreen";
import CommonSnackBar from "./component/common/CommonSnackBar";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserFromLocalStorage } from "./api/shared/CommonApi";
import { CommonContext, CommonContextType } from "./core/context/CommonContext";
import AuthGuard from "./core/guards/AuthGuard";

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { setLoggedInUserData } = useContext(
    CommonContext
  ) as CommonContextType;

  BackendApi.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      if (error?.response) {
        setSnackbarMessage(error?.response?.data?.message);
        setSnackbarOpen(true);
      } else {
        console.error("Network Error:", error.message);
      }
      return Promise.reject(error);
    }
  );

  BackendApi.interceptors.request.use(
    (config) => {
      const user: any = getUserFromLocalStorage();
      if (user?.access_token) {
        config.headers.Authorization = `Bearer ${user?.access_token}`;
      }
      setLoading(true);
      return config;
    },
    (error) => {
      setLoading(false);
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
      {loading && (
        <div className="loader">
             <div className="loader-container">
                <CircularProgress color = "primary"/>
            </div>
        </div>
 
      )}


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
            <Route
              path="/"
              element={
                <AuthGuard>
                  <DrawerLayout outlet={<Outlet />} />
                </AuthGuard>
              }
            >
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
