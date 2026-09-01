import { SidebarProvider } from "@ui";
import { BrandHeader } from "@/components/brand-header";

export const brandHeader = {
  name: "brand-header",
  components: {
    Default: (
      <SidebarProvider>
        <BrandHeader />
      </SidebarProvider>
    ),
  },
};
