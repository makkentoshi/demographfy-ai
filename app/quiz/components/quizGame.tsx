"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Trophy } from "lucide-react";
import { quizQuestions } from "../quiz-data";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function QuizGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    // Shuffle and select 10 random questions
    const shuffledQuestions = [...quizQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setQuestions(shuffledQuestions);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === currentQuestion?.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    const shuffledQuestions = [...quizQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  if (!currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Brain className="w-12 h-12 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-black">
            Quiz-тест
          </h1>
        </div>
        <p className="text-blue-900 font-semibold text-lg">
          Проверьте свои знания о демографических процессах Казахстана
        </p>
      </div>

      {!showResult ? (
        <Card className="p-6 bg-white/5 backdrop-blur-lg border-blue-900/20">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-blue-500 mb-2">
              <span>
                Вопрос {currentQuestionIndex + 1} из {questions.length}
              </span>
              <span>Счет: {score}</span>
            </div>
            <Progress value={progress} className="h-2 bg-blue-950" />
          </div>

          <h2 className="text-xl font-semibold mb-6 text-black">
            {currentQuestion.question}
          </h2>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "h-auto py-4 px-6 text-left justify-start",
                  "hover:bg-blue-200/70 transition-colors",
                  isAnswered &&
                    option === currentQuestion.correctAnswer &&
                    "bg-green-500/70 border-green-500",
                  isAnswered &&
                    option === selectedAnswer &&
                    option !== currentQuestion.correctAnswer &&
                    "bg-red-500/70 border-red-500"
                )}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswered}
              >
                {option}
              </Button>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="p-8 text-center bg-white/5 backdrop-blur-lg border-blue-900/20">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h2 className="text-2xl font-bold mb-4 text-black">Квиз завершен!</h2>
          <p className="text-xl mb-6 text-blue-600">
            Ваш результат: {score} из {questions.length}
          </p>
          <Button
            onClick={restartQuiz}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Начать заново
          </Button>
        </Card>
      )}
    </div>
  );
}
