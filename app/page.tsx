"use client";
import Footer from "@/components/Footer";
import HeaderRU from "@/components/HeaderRU";
import HeaderKK from "@/components/HeaderKK";
import HeaderEN from "@/components/HeaderEN";
import Hero from "@/components/Hero";
import MainTheme from "@/components/MainTheme";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
export default function Home() {
  const [locale, setLocale] = useState("ru");

  const [headerContent, setHeaderContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    const loadHeaderContent = async () => {
      let content;
      switch (locale) {
        case "ru":
          content = <HeaderRU />;
          break;
        case "kk":
          content = <HeaderKK />;
          break;
        case "en":
        default:
          content = <HeaderEN />;
          break;
      }
      setHeaderContent(content);
    };

    loadHeaderContent();
  }, [locale]);

  return (
    <main>
      <LanguageSwitcher onChange={setLocale} />
      {headerContent}
      <Hero />
      <MainTheme />
      <Footer />
    </main>
  );
}
