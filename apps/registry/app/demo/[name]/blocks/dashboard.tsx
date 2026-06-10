import DashboardPage from "./dashboard-page";
import ShellLayout from "./shell-layout";

export const dashboard = {
  name: "dashboard",
  components: {
    Default: (
      <ShellLayout>
        <DashboardPage />
      </ShellLayout>
    ),
  },
};
