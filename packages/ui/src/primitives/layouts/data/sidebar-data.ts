import {
  IconBuilding,
  IconChartBarPopular,
  IconChecklist,
  IconDatabase,
  IconHeadphones,
  IconInnerShadowTop,
  IconListCheck,
  IconMessage,
  IconSignalE,
  IconSpeakerphone,
} from "@tabler/icons-react";
import type { ElementType } from "react";

type User = {
  name: string;
  email: string;
  avatar: string;
};

type Team = {
  name: string;
  logo: ElementType;
  plan: string;
};

type BaseNavItem = {
  title: string;
  badge?: string;
  icon?: ElementType;
};

type NavLink = BaseNavItem & {
  url: string;
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarData = {
  user: User;
  teams: Team[];
  navGroups: NavGroup[];
};

export const sidebarData: SidebarData = {
  user: {
    name: "",
    email: "",
    avatar: "",
  },
  teams: [
    {
      name: "Portfolio / All Properties",
      logo: IconInnerShadowTop,
      plan: "Portfolio View",
    },
    {
      name: "Property A",
      logo: IconBuilding,
      plan: "Hotel",
    },
    {
      name: "Property B",
      logo: IconBuilding,
      plan: "Hotel",
    },
  ],
  navGroups: [
    {
      title: "Metrics",
      items: [
        {
          title: "Metrics",
          url: "/dashboard",
          icon: IconChartBarPopular,
        },
        {
          title: "Properties",
          url: "/properties",
          icon: IconBuilding,
        },
        {
          title: "Growth Plan",
          url: "/tasks",
          icon: IconListCheck,
        },
        {
          title: "Broadcast",
          url: "/campaigns",
          icon: IconSpeakerphone,
        },
        {
          title: "Signals",
          url: "/metric-library",
          icon: IconSignalE,
        },
        {
          title: "Data Library",
          url: "/data-library",
          icon: IconDatabase,
        },
        {
          title: "The Playbook",
          url: "/strategies",
          icon: IconChecklist,
        },
        {
          title: "Threads",
          url: "/chats",
          icon: IconMessage,
        },
        {
          title: "Help Desk",
          url: "/help-desk",
          icon: IconHeadphones,
        },
      ],
    },
  ],
};
