import React from "react";
import QuizCard from "./QuizCard";

const QuizSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <QuizCard />
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
