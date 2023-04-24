import React from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdparty";
import { Button } from "@mui/material";

export default function Logout() {
  const session = useSessionContext();

  async function logoutClicked() {
    localStorage.clear();
    sessionStorage.clear();
    // document.cookie =
    //   "sFrontToken" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    await signOut();
    window.location.href = "https://localhost:3000/admin/auth";
    // navigate("/admin/auth");
  }

  if (session.loading) return null;

  return (
    <>
      <Button onClick={logoutClicked} variant="contained">
        Logout
      </Button>
    </>
  );
}
