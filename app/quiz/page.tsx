"use client";
import { useState } from "react";
import Link from "next/link";

interface Question {
  question: string;
  options: string[];
  answer: number; // индекс правильного ответа
}

const questions: Question[] = [
  {
    question: "Какой год считается годом обретения независимости Казахстана?",
    options: ["1991", "1990", "1989", "1995"],
    answer: 0,
  },
  {
    question: "Какой город является столицей Казахстана?",
    options: ["Алматы", "Астана", "Шымкент", "Караганда"],
    answer: 1,
  },
  {
    question: "Какой ресурс является основным экспортным товаром Казахстана?",
    options: ["Уголь", "Нефть", "Золото", "Уран"],
    answer: 1,
  },
  {
    question: "Какова официальная валюта Казахстана?",
    options: ["Тенге", "Рубль", "Доллар", "Евро"],
    answer: 0,
  },
  {
    question: "Какое население Казахстана по состоянию на 2021 год?",
    options: ["18 миллионов", "20 миллионов", "30 миллионов", "15 миллионов"],
    answer: 0,
  },
  {
    question: "Какой процент населения Казахстана составляют казахи?",
    options: ["60%", "70%", "80%", "50%"],
    answer: 2,
  },
  {
    question: "Какой город является крупнейшим в Казахстане?",
    options: ["Астана", "Алматы", "Шымкент", "Атырау"],
    answer: 1,
  },
  {
    question: "Когда был принят первый закон о языке в Казахстане?",
    options: ["1989", "1991", "1995", "2000"],
    answer: 0,
  },
  {
    question: "Какой орган отвечает за экономическую политику Казахстана?",
    options: [
      "Министерство финансов",
      "Национальный банк",
      "Министерство экономики",
      "Казахстанская правда",
    ],
    answer: 2,
  },
  {
    question: "Какой процент площади Казахстана занимает сельское хозяйство?",
    options: ["10%", "20%", "30%", "40%"],
    answer: 3,
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionClick = (index: number) => {
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-center text-4xl font-bold">Quiz-Игра</h1>
      {showScore ? (
        <div>
          <h2 className="text-2xl">
            Вы набрали {score} из {questions.length}!
          </h2>
          <Link href="/">Вернуться на главную</Link>
        </div>
      ) : (
        <div>
          <h2 className="text-xl mb-4 mt-12">
            {questions[currentQuestion].question}
          </h2>
          <div>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="block mb-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => handleOptionClick(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
