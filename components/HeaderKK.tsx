"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Gemini AI",
    href: "/docs/primitives/alert-dialog",
    description:
      "Gemini AI жобада қалай интеграцияланғаны және қандай мүмкіндіктері бар.",
  },
  {
    title: "Статистика және деректерді талдау",
    href: "/docs/primitives/hover-card",
    description:
      "Gemini AI-ды деректер мен статистиканы талдаушы ретінде пайдалану.",
  },
  {
    title: "Деректерді модельдеу",
    href: "/docs/primitives/progress",
    description:
      "GoogleGenerativeAI және Recharts арқылы деректерді модельдеу.",
  },
  {
    title: "Деректердің көздері және болжам жасау",
    href: "/docs/primitives/scroll-area",
    description: "WorldBank API-ды пайдаланып, деректерді болжам жасау.",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
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

const Header = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center ">
      <nav className="flex w-full screen-max-width justify-between items-center">
        <div className="flex justify-between items-center ">
          <span className="font-semibold text-2xl text-white  pr-1 cursor-pointer">
            Demographfy
          </span>

          {/* Logo Button */}

          <svg
            // Logo
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-world-pin cursor-pointer"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20.972 11.291a9 9 0 1 0 -8.322 9.686" />
            <path d="M3.6 9h16.8" />
            <path d="M3.6 15h8.9" />
            <path d="M11.5 3a17 17 0 0 0 0 18" />
            <path d="M12.5 3a16.986 16.986 0 0 1 2.578 9.018" />
            <path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" />
            <path d="M19 18v.01" />
          </svg>
        </div>
        <div className="flex flex-1 justify-center max-sm:hidden ">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Бастайық ...</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          {/*Logo*/}
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Demographfy
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Қазақстан Республикасындағы демографиялық процестер
                            туралы деректерді болжау, статистика және талдау
                            үшін Gemini AI қолданатын веб-сайт.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Информация">
                      Жоба мен демографиялық процестерді талдау туралы жалпы
                      ақпарат.
                    </ListItem>
                    <ListItem href="/docs/installation" title="FAQ">
                      Ең жиі қойылатын сұрақтар.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Подробнее..."
                    >
                      Жасалушы және жоба туралы.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Жалпы ақпарат</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
              <NavigationMenuItem>
                <Link href="/quiz" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Quiz-ойын
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1 py-2">
          <Button className="rounded-full h-[48px]">
            <svg
              // Button search
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </Button>
          <Button className="rounded-full h-[48px]">
            <svg
              // Button info
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-report-search"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />
              <path d="M18 12v-5a2 2 0 0 0 -2 -2h-2" />
              <path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
              <path d="M8 11h4" />
              <path d="M8 15h3" />
              <path d="M16.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
              <path d="M18.5 19.5l2.5 2.5" />
            </svg>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
