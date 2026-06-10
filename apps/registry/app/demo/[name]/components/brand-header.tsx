import { BrandHeader } from "@/components/brand-header";
import { SidebarProvider } from "@ui";

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
