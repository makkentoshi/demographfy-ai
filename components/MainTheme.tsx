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

interface EconomicData {
  year: number;
  gdp: number;
}

const MainTheme: React.FC = () => {
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [economicData, setEconomicData] = useState<EconomicData[]>([]);
  const [predictedPopulationData, setPredictedPopulationData] = useState<
    PopulationData[]
  >([]);
  const [predictedEconomicData, setPredictedEconomicData] = useState<
    EconomicData[]
  >([]);
  const [startYear, setStartYear] = useState(1991);
  const [endYear, setEndYear] = useState(2024);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const populationResponse = await axios.get(
          "https://api.worldbank.org/v2/country/KZ/indicator/SP.POP.TOTL?format=json&date=1991:2024"
        );

        const gdpResponse = await axios.get(
          "https://api.worldbank.org/v2/country/KZ/indicator/NY.GDP.MKTP.CD?format=json&date=1991:2024"
        );

        let popData: PopulationData[] = [];
        let gdpData: EconomicData[] = [];

        if (populationResponse.data && populationResponse.data.length > 1) {
          popData = populationResponse.data[1]
            .map((item: WorldBankDataItem) => ({
              year: parseInt(item.date),
              population: item.value,
            }))
            .filter((item: PopulationData) => item.population !== null)
            .sort((a: PopulationData, b: PopulationData) => a.year - b.year);

          setPopulationData(popData);
        }

        if (gdpResponse.data && gdpResponse.data.length > 1) {
          gdpData = gdpResponse.data[1]
            .map((item: WorldBankDataItem) => ({
              year: parseInt(item.date),
              gdp: item.value,
            }))
            .filter((item: EconomicData) => item.gdp !== null)
            .sort((a: EconomicData, b: EconomicData) => a.year - b.year);

          setEconomicData(gdpData);
        }

        await getPopulationPredictions(popData);
        await getEconomicPredictions(gdpData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const generatePopulationPrompt = (data: PopulationData[]): string => {
    const historicalData = data
      .map((item) => `Year: ${item.year}, Population: ${item.population}`)
      .join("\n");

    return `Analyze the following historical population data for Kazakhstan and predict the population for the years 2026, 2028, 2030, 2032, and 2034:

    ${historicalData}

    Based on these trends, what is the projected population for the given years? Provide your predictions in a structured format.`;
  };

  const generateEconomicPrompt = (gdpData: EconomicData[]): string => {
    const historicalData = gdpData
      .map((item) => `Year: ${item.year}, GDP: ${item.gdp}`)
      .join("\n");

    return `Analyze the following economic data for Kazakhstan from 1991 to 2024:

    ${historicalData}

    Predict the GDP for the years 2025, 2027, and 2029.`;
  };

  {
    /*  Analyze the following demographic and economic data for Kazakhstan from 1991 to 2024. How do demographic changes impact economic indicators such as GDP and unemployment? Predict future trends for the years 2025, 2027, and 2029.*/
  }

  // Функция для получения предсказаний от Gemini
  const getPopulationPredictions = async (popData: PopulationData[]) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generatePopulationPrompt(popData);

      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      console.log("Population Gemini Response:", geminiResponse);

      const futurePredictions = parsePopulationResponse(geminiResponse);
      console.log("Parsed Population Predictions:", futurePredictions);
      setPredictedPopulationData(futurePredictions);
    } catch (error) {
      console.error("Error getting population predictions from Gemini:", error);
    }
  };

  const getEconomicPredictions = async (gdpData: EconomicData[]) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generateEconomicPrompt(gdpData);

      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      console.log("Economic Gemini Response:", geminiResponse);

      const futurePredictions = parseEconomicResponse(geminiResponse);
      console.log("Parsed Economic Predictions:", futurePredictions);
      setPredictedEconomicData(futurePredictions);
    } catch (error) {
      console.error("Error getting economic predictions from Gemini:", error);
    }
  };

  // Функция для обработки ответа Gemini и преобразования в нужный формат

  const parsePopulationResponse = (response: string): PopulationData[] => {
    console.log("Raw Population Gemini Response:", response);

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

  const parseEconomicResponse = (response: string): EconomicData[] => {
    console.log("Raw Economic Gemini Response:", response);

    const predictions: EconomicData[] = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      const match = line.match(/\|\s*(\d{4})\s*\|\s*(\d+)\s*\|/);
      if (match) {
        const year = parseInt(match[1]);
        const gdp = parseInt(match[2]);
        predictions.push({ year, gdp });
      }
    });

    console.log("Parsed Economic Predictions:", predictions);
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
  const filteredPopulationData = [...populationData, ...predictedPopulationData].filter(
    (item) => item.year >= startYear && item.year <= endYear
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Прогнозирование населения Казахстана</h1>

      <div className="mb-4">
        <label>
          C какого года:
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(parseInt(e.target.value))}
            className="ml-2 p-1 border text-black"
          />
        </label>
        <label className="ml-4">
          По какой год:
          <input
            type="number"
            value={endYear}
            onChange={(e) => setEndYear(parseInt(e.target.value))}
            className="ml-2 p-1 border text-black"
          />
        </label>
      </div>

      <div className="w-full h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredPopulationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis
              domain={[10000000, 25000000]}
              tickFormatter={(tick) => tick.toLocaleString()}
              tickCount={4}
              tick={{ fontSize: 11 }}
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
