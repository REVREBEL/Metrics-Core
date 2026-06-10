"use client";

import {
  IconBell,
  IconDeviceDesktop,
  IconPalette,
  IconTool,
  IconUserCog,
} from "@tabler/icons-react";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ThemeSwitch } from "@/components/theme-switch";
import { Separator } from "@/components/ui/separator";
import { ContentSection } from "./components/content-section";
import { SidebarNav } from "./components/sidebar-nav";
import { ProfileForm } from "./profile/profile-form";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
    icon: <IconUserCog size={20} strokeWidth={1.5} />,
  },
  {
    title: "Account",
    href: "/settings/account",
    icon: <IconTool size={20} strokeWidth={1.5} />,
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
    icon: <IconPalette size={20} strokeWidth={1.5} />,
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: <IconBell size={20} strokeWidth={1.5} />,
  },
  {
    title: "Display",
    href: "/settings/display",
    icon: <IconDeviceDesktop size={20} strokeWidth={1.5} />,
  },
];

export default function SettingsPage() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
        </div>
      </Header>

      <Main fixed>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-4 lg:my-6" />
        <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
          <aside className="top-0 lg:sticky lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex w-full overflow-y-hidden p-1">
            <ContentSection
              title="Profile"
              desc="This is how others will see you on the site."
            >
              <ProfileForm />
            </ContentSection>
          </div>
        </div>
      </Main>
    </>
  );
}
