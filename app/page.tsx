"use client";
import React from "react"; // Добавить React и хуки
import Header from "@/components/Header";

import Hero from "@/components/Hero";
import MainTheme from "@/components/MainTheme";
import Footer from "@/components/Footer";
import AdvantagesSection from "@/components/AdvantagesSection";
import QuizSection from "@/components/QuizSection";
import LogoTicker from "@/components/LogoTicker";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <LogoTicker></LogoTicker>
      <AdvantagesSection></AdvantagesSection>
      <MainTheme />
      <QuizSection></QuizSection>
      <Footer />
    </main>
  );
}
