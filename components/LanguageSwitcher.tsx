import React from "react";

interface LanguageSwitcherProps {
  onChange: (language: string) => void;
}

export default function LanguageSwitcher({ onChange }: LanguageSwitcherProps) {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex justify-between w-[300px] ml-12">
        <button
          onClick={() => {
            console.log("Language switched to: en");
            onChange("en");
          }}
          className="cursor-pointer hover:text-gray-300"
        >
          English
        </button>
        <button
          onClick={() => {
            console.log("Language switched to: ru");
            onChange("ru");
          }}
          className="cursor-pointer hover:text-gray-300"
        >
          Русский
        </button>
        <button
          onClick={() => {
            console.log("Language switched to: kk");
            onChange("kk");
          }}
          className="cursor-pointer hover:text-gray-300"
        >
          Қазақша
        </button>
      </div>
    </div>
  );
}
