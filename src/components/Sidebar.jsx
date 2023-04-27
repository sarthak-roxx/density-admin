import React from "react";
import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleDrawer } from "../redux/layout/menu";
import { useTheme } from "@mui/material/styles";
import densityLogo from "../footerlogo.svg";

const sidabarItems = [
  { listText: "Dashboard", listRoute: "/" },
  {
    listText: "KYC Details",
    listRoute: "/kycUsers",
  },
  {
    listText: "Deposit Requests",
    listRoute: "/deposit-records",
  },
  {
    listText: "Withdraw Requests",
    listRoute: "/withdraw",
  },
  {
    listText: "Reward",
    listRoute: "/reward",
  },
  {
    listText: "Admins",
    listRoute: "/admin",
  },
];

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SideList = () => (
    <Box component="div">
      <List>
        {sidabarItems.map((listItem, idx) => (
          <ListItem
            sx={{
              "&:hover": { cursor: "pointer", backgroundColor: "#87CEEB" },
            }}
            onClick={() => {
              dispatch(toggleDrawer());
              navigate(listItem.listRoute);
            }}
            key={idx}
          >
            <ListItemText
              sx={{
                mt: 2,
                "& .MuiTypography-root": {
                  color: "whitesmoke",
                  fontSize: 18,
                },
              }}
              primary={listItem.listText}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const isSidebarOpen = useSelector((state) => state.appMenu.drawerOpen);
  return (
    <>
      <Drawer
        open={isSidebarOpen}
        anchor="left"
        onClose={() => dispatch(toggleDrawer())}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "260px",
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: "inherit",
            backgroundColor: "#333333",
          },
        }}
      >
        <Box display="flex" m={2} justifyContent="center" alignItems="center">
          <img
            src={densityLogo}
            style={{ maxWidth: "100%" }}
            alt="Logo of density"
          />
        </Box>
        <SideList />
      </Drawer>
    </>
  );
}
