import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { Menu } from "lucide-react";
import Newsletter from "./Newsletter";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Test produit",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Comparatif",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  // ... autres composants
];

const navStyles =
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50";

export default function Navbar() {
  return (
    <>
      {/* Version Desktop */}
      <nav>
        <div className="max-sm:hidden flex items-center justify-between flex-wrap bg-white p-6 border-b">
          <div>
            <a href="/">
              <img
                src="/logo-sanpoil.png"
                alt="SanPoil"
                className="max-w-[230px] mx-auto"
              />
            </a>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="/" className={navStyles}>
                    Accueil
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Catégories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div>
            <Newsletter />
          </div>
        </div>
      </nav>

      {/* Version Mobile */}
      <div className="sm:hidden fixed top-0 w-full bg-white border-b z-50">
        <div className="container flex items-center justify-between py-4">
          <a href="/" className="flex items-center">
            <img
              src="/logo-sanpoil.png"
              alt="SanPoil"
              className="max-w-[150px]"
            />
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <a href="/" className="flex items-center text-lg font-medium">
                  Accueil
                </a>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-medium">Catégories</h2>
                  <div className="flex flex-col gap-2">
                    {components.map((component) => (
                      <a
                        key={component.title}
                        href={component.href}
                        className="text-sm hover:underline"
                      >
                        {component.title}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <Newsletter />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

const ListItem = forwardRef<
  ElementRef<"a">,
  ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
