import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// NOTE: Sidebar data is loaded in sequence together with Routes.tsx ("../Routes.tsx").
// This means that the order of the routes and the order of the sidebar items HAS to be the same - otherwise the items will route to other routes when clicked on...
// If you want to change the order, you will have to do it both in the Routes.tsx and in the SidebarData.

export const SidebarData = [
  {
    title: "Log in",
    icon: <AccountCircleIcon />,
    route: "/login",
  },
];
