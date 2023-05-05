import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import * as routerConfig from "react-router-dom";
import { densityAdminRoutes } from "./routes";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {getSuperTokensRoutesForReactRouterDom(routerConfig)}
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
                // element={route.component}
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
