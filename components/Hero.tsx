import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-[10rem] lg:py-20 flex flex-col lg:flex-row items-center justify-center">
    <div className="hero-content lg:w-1/2 mb-10">
      <h1 className="text-2xl lg:text-6xl font-bold mb-4">
        Демографический анализ Казахстана
      </h1>
      <div className="w-full max-w-[30rem] h-full">
        <p className="text-lg lg:text-xl text-gray-500 mb-6">
          Комплексный анализ демографических процессов с использованием
          передовых технологий и данных
        </p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg font-semibold transition-colors">
        Начать анализ
      </button>
    </div>
    <div className="hero-image lg:w-1/2">
      <div className="relative w-full h-[300px] lg:h-[500px]">
        <Image
          src="/kazakhstan.svg"
          alt="Kazakhstan Map Analytics"
          fill
          className="rounded-2xl object-contain"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
    </div>
  </section>
  );
};

export default Hero;
