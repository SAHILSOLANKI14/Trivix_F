import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import appRoute from "../modules/App/Router/Router";
import authRoute from "../modules/Auth/Router/index";
const AppRouter = () => {
  const route = [...appRoute, ...authRoute];
  return (
    <>
      <Routes>
        {route.map(({ Name, component: Component, url }) => {
          return <Route exact key={url} path={url} element={<Component />} />;
        })}
      </Routes>
    </>
  );
};

export default AppRouter;
