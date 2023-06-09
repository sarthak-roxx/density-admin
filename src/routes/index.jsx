import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import * as routerConfig from "react-router-dom";
import { densityAdminRoutes } from "./routes";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SignUp from "../components/SignUp";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {getSuperTokensRoutesForReactRouterDom(routerConfig)}
          <Route
            path="/"
            element={
              <SessionAuth requireAuth={false}>
                <SignUp />
              </SessionAuth>
            }
          />
          <Route
            element={
              <>
                <Navbar />
                <Sidebar />
              </>
            }
          >
            {densityAdminRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={<SessionAuth>{route.component}</SessionAuth>}
                // element={route.component}
                key={idx}
                exact={true}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
