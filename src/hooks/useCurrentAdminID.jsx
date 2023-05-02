import { useSessionContext } from "supertokens-auth-react/recipe/session";

export default function useCurrentAdminID() {
  const { userId: adminID } = useSessionContext();
  return adminID;
}
