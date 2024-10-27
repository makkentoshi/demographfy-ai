import { useRouter } from "next/router";
import IntlWrapper from "@/components/IntlWrapper";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MainTheme from "@/components/MainTheme";

export default function Home() {
  const { locale } = useRouter();

  return (
    <IntlWrapper locale={locale as string}>
      <main>
        <Header></Header>
        <Hero></Hero>
        <MainTheme></MainTheme>
        <Footer></Footer>
      </main>
    </IntlWrapper>
  );
}
