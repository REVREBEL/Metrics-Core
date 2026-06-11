import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./menubar"
import { IconFileFilled, IconFolderFilled, IconInfoSquareRoundedFilled, IconDeviceFloppyFilled, IconSettingsFilled, IconTrashFilled } from "@tabler/icons-react"

export function MenubarIcons() {
  return (
    <Menubar className="w-72">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <IconFileFilled />
            New File <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <IconFolderFilled />
            Open Folder
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <IconDeviceFloppyFilled />
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>More</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              <IconSettingsFilled />
              Settings
            </MenubarItem>
            <MenubarItem>
              <IconInfoSquareRoundedFilled />
              Help
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">
              <IconTrashFilled />
              Delete
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
