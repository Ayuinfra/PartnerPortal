import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthRoute, CredentsRoute } from "./core/routes/Routes";
import BackendApi from "./api/shared/BackendApi";
import DrawerLayout from "./component/layout/DrawerLayout";
import NotFoundScreen from "./screens/NotFoundScreen";
import CommonSnackBar from "./component/common/CommonSnackBar";

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    BackendApi.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response) {
          const status = error.response.status;
          if (status === error.response.status) {
            setSnackbarMessage("Validation error message");
            setSnackbarOpen(true);
          }
        } else {
          console.error("Network Error:", error.message);
        }
        return Promise.reject(error);
      }
    );

    BackendApi.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <React.Fragment>
      <Routes>
        
        {AuthRoute.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))}
        {CredentsRoute.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))}
        <Route path="/" element={<DrawerLayout outlet={<Outlet />} />}>
        </Route>
        <Route path="/*" element={<NotFoundScreen />} />
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
