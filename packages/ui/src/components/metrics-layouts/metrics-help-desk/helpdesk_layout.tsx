import { ProductAreaPage } from "@/app/(app)/product-area-page";

export default function HelpDeskPage() {
  return (
    <ProductAreaPage
      title="Help Desk"
      description="Support, documentation, and REVREBEL contact paths."
      items={["Support", "Documentation", "Contact REVREBEL"]}
    />
  );
}
