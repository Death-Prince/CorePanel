// config/nav.ts
import { IconDashboard } from "@tabler/icons-react";
import { Bot, Box, SquareTerminal } from "lucide-react";

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

export const navMyProject = [
  {
    title: "Playground",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Starred",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
  {
    title: "Models",
    url: "#",
    icon: Bot,
    items: [
      {
        title: "Genesis",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Quantum",
        url: "#",
      },
    ],
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
