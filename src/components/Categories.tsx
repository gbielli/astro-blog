import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavigationProps {
  pathname: string;
  categories: { name: string; path: string }[];
}

export default function Navigation({ pathname, categories }: NavigationProps) {
  // Retiré le async ici
  const isActiveRoute = (categoryPath: string) => {
    return (
      pathname === categoryPath ||
      (pathname === "/" && categoryPath === "/") ||
      (pathname.startsWith(categoryPath) && categoryPath !== "/")
    );
  };

  // Ajouter la catégorie "Tous" au début du tableau
  const allCategories = [{ name: "Tous", path: "/" }, ...categories];

  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList className="gap-4">
        {allCategories.map((category) => {
          const isActive = isActiveRoute(category.path);
          return (
            <NavigationMenuItem
              key={category.path}
              className="border rounded-md"
            >
              <NavigationMenuLink
                className={navigationMenuTriggerStyle({ isActive })}
                href={category.path}
              >
                {category.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
