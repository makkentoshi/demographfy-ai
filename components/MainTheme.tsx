"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface PopulationData {
  year: number;
  population: number;
}

interface WorldBankDataItem {
  date: string;
  value: number | null;
}

const MainTheme: React.FC = () => {
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [predictedData, setPredictedData] = useState<PopulationData[]>([]);
  const [startYear, setStartYear] = useState(1974);
  const [endYear, setEndYear] = useState(1988);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.worldbank.org/v2/country/KZ/indicator/SP.POP.TOTL?format=json"
        );

        console.log("API Response:", response.data);

        // Проверяем, что ответ содержит данные
        if (response.data && response.data.length > 1) {
          const data = response.data[1]
            .map((item: WorldBankDataItem) => ({
              year: parseInt(item.date),
              population: item.value,
            }))
            .filter((item: PopulationData) => item.population !== null)
            .sort((a: PopulationData, b: PopulationData) => a.year - b.year);

          console.log("Filtered Population Data:", data);
          setPopulationData(data);
          await getGeminiPredictions(data);
        } else {
          console.error("No data available from API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const generatePrompt = (data: PopulationData[]): string => {
    const historicalData = data
      .map((item) => `Year: ${item.year}, Population: ${item.population}`)
      .join("\n");

    return `Analyze the following historical population data for Kazakhstan and predict the population for the years 2026, 2028, 2030, 2032, and 2034:

    ${historicalData}

    Based on these trends, what is the projected population for the given years? Provide your predictions in a structured format.`;
  };

  // Функция для получения предсказаний от Gemini
  const getGeminiPredictions = async (data: PopulationData[]) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generatePrompt(data);

      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      console.log("Gemini Response:", geminiResponse);

      const futurePredictions = parseGeminiResponse(geminiResponse);
      console.log("Parsed Predictions:", futurePredictions); //
      setPredictedData(futurePredictions);
    } catch (error) {
      console.error("Error getting predictions from Gemini:", error);
    }
  };

  // Функция для обработки ответа Gemini и преобразования в нужный формат

  const parseGeminiResponse = (response: string): PopulationData[] => {
    console.log("Raw Gemini Response:", response);

    const predictions: PopulationData[] = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      const match = line.match(/\|\s*(\d{4})\s*\|\s*(\d+)\s*\|/);
      if (match) {
        const year = parseInt(match[1]);
        const population = parseInt(match[2]);
        predictions.push({ year, population });
      }
    });

    console.log("Parsed Predictions:", predictions); // Отладка: выводим парсенные данные
    return predictions;
  };

  {
    /* Функция для прогнозирования населения с помощью TensorFlow */
  }

  //   const predictPopulation = async (data: PopulationData[]) => {
  //     const years = data.map((d) => d.year);
  //     const populations = data.map((d) => d.population);

  //     // Подготовка данных для модели
  //     const xs = tf.tensor2d(years, [years.length, 1]);
  //     const ys = tf.tensor2d(populations, [populations.length, 1]);

  //     // Создание и тренировка модели
  //     const model = tf.sequential();
  //     model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  //     model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

  //     await model.fit(xs, ys, { epochs: 500 });

  //     // Прогноз на будущее с равномерными интервалами (+2 года)
  //     const futureYears = [2026, 2028, 2030, 2032, 2034, 2036, 2038, 2040];
  //     const futurePredictions = futureYears.map((year) => ({
  //       year,
  //       population: (
  //         model.predict(tf.tensor2d([year], [1, 1])) as tf.Tensor
  //       ).dataSync()[0],
  //     }));

  //     setPredictedData(futurePredictions);
  //   };

  const filteredData = [...populationData, ...predictedData].filter(
    (item) => item.year >= startYear && item.year <= endYear
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Прогнозирование населения Казахстана</h1>

      <div className="mb-4">
        <label>
          Start Year:
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(parseInt(e.target.value))}
            className="ml-2 p-1 border"
          />
        </label>
        <label className="ml-4">
          End Year:
          <input
            type="number"
            value={endYear}
            onChange={(e) => setEndYear(parseInt(e.target.value))}
            className="ml-2 p-1 border"
          />
        </label>
      </div>

      <div className="w-full h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis
              domain={[10000000, 25000000]}
              tickFormatter={(tick) => tick.toLocaleString()}
              tickCount={4}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Line
              type="monotone"
              dataKey="population"
              stroke="#5BB1D9FF"
              activeDot={{ r: 8 }}
              dot={{ r: 4 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainTheme;
