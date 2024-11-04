import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navigation() {
  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem className="border rounded-md">
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
            Tous
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="border rounded-md">
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/beaute"
          >
            Beauté
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="border rounded-md">
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/rasage"
          >
            Rasage
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="border rounded-md">
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
            Sport
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
