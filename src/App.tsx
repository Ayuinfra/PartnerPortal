import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthRoutes } from "./core/routes/Routes";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Routes>
        {AuthRoutes.map((route: any) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
}

export default App;
