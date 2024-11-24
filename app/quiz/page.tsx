import React from "react";
import QuizGame from "./components/quizGame";

const page = () => {
  return (
    <main className="min-h-screen pt-[10rem] ">
      <div className="container mx-auto px-4 py-8">
        <QuizGame />
      </div>
    </main>
  );
};

export default page;
