import { SidebarProvider } from "@ui";
import { BrandSidebar } from "@/components/brand-sidebar";

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
