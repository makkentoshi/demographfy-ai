import Image from "next/image";
import React from "react";

const TECH_LOGOS = [
  {
    name: "Google Cloud",
    logo: "/google-cloud-svgrepo-com.svg",
    colorLogo: "/google-cloud-svgrepo-com.svg",
  },
  {
    name: "MongoDB",
    logo: "/mongodb.webp",
    colorLogo: "/mongodb.webp",
  },
  {
    name: "World Bank",
    logo: "/worldbank_logo.png",
    colorLogo: "/worldbank_logo.png",
  },
  {
    name: "Gemini AI",
    logo: "/Google-Ai-Gemini.png",
    colorLogo: "/Google-Ai-Gemini.png",
  },
  {
    name: "Google Analytics",
    logo: "/google-analytics-svgrepo-com.svg",
    colorLogo: "/google-analytics-color.svg",
  },
  {
    name: "Google Adsense",
    logo: "/google-adsense-svgrepo-com.svg",
    colorLogo: "/google-analytics-color.svg",
  },
  {
    name: "Netlify",
    logo: "/netlify-svgrepo-com.svg",
    colorLogo: "/google-analytics-color.svg",
  },
];

const LogoTicker = () => {
  return (
    <section className="resources bg-gray-50 py-20 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Использованные ресурсы
        </h2>
      </div>
      <div className="logo-ticker-container">
        <div className="logo-ticker flex space-x-16">
          {[...TECH_LOGOS, ...TECH_LOGOS].map((logo, index) => (
            <div
              key={index}
              className="logo-item flex-shrink-0 w-40 h-20 relative group"
            >
              <Image
                src={logo.logo}
                alt={logo.name}
                fill
                className="object-contain transition-opacity duration-300 group-hover:opacity-0"
              />
              <Image
                src={logo.colorLogo}
                alt={`${logo.name} Color`}
                fill
                className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;
