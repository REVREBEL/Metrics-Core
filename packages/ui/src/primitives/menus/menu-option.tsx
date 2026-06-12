import {
  Menu,
  MenuCheckboxItem,
  MenuPopup,
  MenuTrigger,
} from "./menu";

export default function Particle() {
  return (
    <Menu>
      <MenuTrigger className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        Open menu
      </MenuTrigger>
      <MenuPopup>
        <MenuCheckboxItem defaultChecked>Auto save</MenuCheckboxItem>
        <MenuCheckboxItem>Notifications</MenuCheckboxItem>
      </MenuPopup>
    </Menu>
  );
}
