import React from "react";
import UserKycData from "../components/UserKycData";
import WithDraw from "../components/WithDraw";
import DepositRecords from "../components/DepositRecords";
import KycUsers from "../components/KycUsers";
import Dashboard from "../components/Dashboard";
import RewardScreen from "../components/RewardScreen";
import AdminUsersTable from "../components/AdminUsersTable";

const densityAdminRoutes = [
  { path: "/", component: <Dashboard /> },
  { path: "/kycUsers", component: <KycUsers /> },
  { path: "/kycData", component: <UserKycData /> },
  { path: "/withdraw", component: <WithDraw /> },
  { path: "/deposit-records", component: <DepositRecords /> },
  { path: "/reward", component: <RewardScreen /> },
  { path: "/admin", component: <AdminUsersTable /> },
];

export { densityAdminRoutes };
