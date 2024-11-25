"use client";
import React, { useState, useEffect } from "react";
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
import Logo from "./Logo";
import { MenuIcon, XIcon } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Gemini AI",
    href: "/docs/primitives/alert-dialog",
    description:
      "Каким образом интегрирован Gemini AI в проект и какие возможности он предоставляет.",
  },
  {
    title: "Статистика и анализ данных",
    href: "/docs/primitives/hover-card",
    description:
      "Использование Gemini AI в качестве анализатора данных и статистики.",
  },
  {
    title: "Моделирование данных",
    href: "/docs/primitives/progress",
    description:
      "Моделирование данных с помощью GoogleGenerativeAI и Recharts.",
  },
  {
    title: "Источник данных и прогнозирования",
    href: "/docs/primitives/scroll-area",
    description: "Использование WorldBank API и прогнозирование данных.",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
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
));
ListItem.displayName = "ListItem";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300  sm:px-10 px-5 flex justify-between items-center ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="flex w-full screen-max-width justify-between items-center">
        {/* Логотип */}
        <div className="cursor-pointer pt-5">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>

        {/* Десктопное меню */}
        <div className="flex flex-1 justify-center max-sm:hidden pr-[15rem]">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Начнем ...</NavigationMenuTrigger>
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
                            Веб-сайт для прогнозирования, статистики и анализа
                            данных о демографических процессах Республики
                            Казахстан с использованием Gemini AI.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Общая информация">
                      Информация о проекте и анализе демографических процессах.
                    </ListItem>
                    <ListItem href="/docs/faq" title="FAQ">
                      Самые задаваемые вопросы.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Общая информация</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <ListItem href="/docs/gemini-ai" title="Gemini AI">
                      Интеграция Gemini AI в проект.
                    </ListItem>

                    <ListItem
                      href="/docs/data-modeling"
                      title="Моделирование данных"
                    >
                      Моделирование данных с помощью GoogleGenerativeAI и
                      Recharts.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/quiz" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Quiz-игра
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/scientists" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Ученые и деятели
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/chat" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                   Demographfy-AI
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Мобильное меню */}
        <div className="sm:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </Button>
        </div>
      </nav>

      {/* Мобильное меню контент */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background shadow-md">
          <ul className="flex flex-col gap-4 p-5">
            <li>
              <Link href="/analyse"></Link>
            </li>
            <li>
              <Link href="/docs"></Link>
            </li>
            <li>
              <Link href="/quiz"></Link>
            </li>
            <li>
              <Link href="/scientists"></Link>
            </li>
            {components.map((component) => (
              <li key={component.title}>
                <Link href={component.href} legacyBehavior>
                  <a className="block text-sm font-medium">{component.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
