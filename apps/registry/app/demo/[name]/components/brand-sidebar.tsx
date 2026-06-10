import { BrandSidebar } from "@/components/brand-sidebar";
import { SidebarProvider } from "@ui";

export const brandSidebar = {
  name: "brand-sidebar",
  components: {
    Default: (
      <SidebarProvider>
        <BrandSidebar />
      </SidebarProvider>
    ),
  },
};
