import Image from "next/image";
import React from "react";

interface LogoProps {
  altText?: string; // Optional alt text for accessibility
  className?: string; // Optional class for styling
}

const Logo: React.FC<LogoProps> = ({ altText = "Logo", className = "" }) => {
  return (
    <div className={`h-[5rem] w-[15rem] overflow-hidden ${className}`}>
      <img
        src="./dem.png"
        alt={altText}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default Logo;
