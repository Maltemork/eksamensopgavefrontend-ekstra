import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
// NOTE: Sidebar data is loaded in sequence together with Routes.tsx ("../Routes.tsx").
// This means that the order of the routes and the order of the sidebar items HAS to be the same - otherwise the items will route to other routes when clicked on...
// If you want to change the order, you will have to do it both in the Routes.tsx and in the SidebarData.

export const SidebarData = [
  {
    title: "Athletes",
    icon: <DirectionsRunIcon />,
    route: "/athletes",
  },
  {
    title: "Disciplines",
    icon: <EmojiEventsIcon />,
    route: "/disciplines",
  },
  {
    title: "Results",
    icon: <AccessAlarmIcon />,
    route: "/results",
  },
];
