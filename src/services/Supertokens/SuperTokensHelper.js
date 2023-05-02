import { useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdparty";

export const useCheckLoginStatus = () => {
  const session = useSessionContext();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!session.loading && session.doesSessionExist);
    setIsLoading(true);
  }, [session.loading]);

  return { isLoggedIn, isLoading };
};

export const checkLoadingStatus = () => {
  const session = useSessionContext();
  return session.loading;
};

export const fetchAdminId = () => {
  const { userId: adminID } = useSessionContext();
  return adminID;
};

export const logoutApp = async () => {
  await signOut();
  localStorage.clear();
  sessionStorage.clear();
  // document.cookie =
  //   "sFrontToken" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/";
};
