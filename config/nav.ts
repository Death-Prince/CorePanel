// config/nav.ts
import { IconDashboard } from "@tabler/icons-react";
import { Box } from "lucide-react";

export const navMain = [
  {
    title: "Dashboard",
    url: "/",
    icon: IconDashboard,
  },
  {
    title: "Stack Shelf",
    url: "/stackshelf", 
    icon: Box,
  },
];

export const navSecondary = [
  {
    title: "Settings",
    url: "#",
    icon: require("@tabler/icons-react").IconSettings,
  },
  {
    title: "Get Help",
    url: "#",
    icon: require("@tabler/icons-react").IconHelp,
  },
  {
    title: "Search",
    url: "#",
    icon: require("@tabler/icons-react").IconSearch,
  },
];
