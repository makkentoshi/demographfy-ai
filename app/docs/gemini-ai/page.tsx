"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, LineChart, Users, TrendingUp } from "lucide-react";

export default function GeminiAI() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[10rem] pb-[2rem]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Использование Gemini-AI
        </h1>
        <p className="text-xl text-gray-600">
          Прогрессивные демографические прогнозы на основе технологий Google&apos;s
          Gemini AI
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <Brain className="h-8 w-8 text-blue-900 mb-4" />
            <CardTitle>Прогноз роста населения</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              [График роста населения]
            </div>
            <Button
              className="w-full mt-4 bg-blue-900 hover:bg-blue-800"
              onClick={() => setLoading(!loading)}
            >
              Сгенерировать прогноз
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <LineChart className="h-8 w-8 text-blue-900 mb-4" />
            <CardTitle>Анализ возрастного распределения</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              [График возрастного распределения]
            </div>
            <Button
              className="w-full mt-4 bg-blue-900 hover:bg-blue-800"
              onClick={() => setLoading(!loading)}
            >
              Проанализировать распределение
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-blue-900 mb-4" />
            <CardTitle>Миграционные паттерны</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              [График миграционных паттернов]
            </div>
            <Button
              className="w-full mt-4 bg-blue-900 hover:bg-blue-800"
              onClick={() => setLoading(!loading)}
            >
              Проанализировать миграцию
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-blue-900 mb-4" />
            <CardTitle>Демографические тенденции</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              [График демографических тенденций]
            </div>
            <Button
              className="w-full mt-4 bg-blue-900 hover:bg-blue-800"
              onClick={() => setLoading(!loading)}
            >
              Сгенерировать тенденции
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
