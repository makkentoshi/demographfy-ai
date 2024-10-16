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
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
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
  gdpPerCapita?: number;
  unemploymentRate?: number;
  inflationRate?: number;
}

const MainTheme: React.FC = () => {
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [gdpData, setGdpData] = useState<EconomicData[]>([]);
  const [gdpPerCapitaData, setGdpPerCapitaData] = useState<EconomicData[]>([]);
  const [unemploymentData, setUnemploymentData] = useState<EconomicData[]>([]);
  const [inflationData, setInflationData] = useState<EconomicData[]>([]);
  const [combinedEconomicData, setCombinedEconomicData] = useState<
    EconomicData[]
  >([]);
  const [predictedPopulationData, setPredictedPopulationData] = useState<
    PopulationData[]
  >([]);
  const [predictedEconomicData, setPredictedEconomicData] = useState<
    EconomicData[]
  >([]);
  const [predictedPerCapitaData, setPredictedPerCapitaData] = useState<
    EconomicData[]
  >([]);
  const [predictedUnemploymentData, setPredictedUnemploymentData] = useState<
    EconomicData[]
  >([]);
  const [predictedInflationData, setPredictedInflationData] = useState<
    EconomicData[]
  >([]);
  const [startYear, setStartYear] = useState(1991);
  const [endYear, setEndYear] = useState(2024);
  const [gdpStartYear, setGdpStartYear] = useState(1991);
  const [gdpEndYear, setGdpEndYear] = useState(2030);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const populationResponse = await axios.get(
          "https://api.worldbank.org/v2/country/KZ/indicator/SP.POP.TOTL?format=json&date=1991:2024"
        );

        const gdpResponse = await axios.get(
          "https://api.worldbank.org/v2/country/KZ/indicator/NY.GDP.MKTP.CD?format=json&date=1991:2024"
        );

        const gdpPerCapitaResponse = await axios.get(
          "https://api.worldbank.org/v2/country/KZ/indicator/NY.GDP.PCAP.CD?format=json&date=1991:2024"
        );

        const unemploymentResponse = await axios.get(
          "https://api.worldbank.org/v2/country/KZ/indicator/SL.UEM.TOTL.ZS?format=json&date=1991:2024"
        );

        const inflationResponse = await axios.get(
          "https://api.worldbank.org/v2/country/KZ/indicator/FP.CPI.TOTL.ZG?format=json&date=1991:2024"
        );

        let popData: PopulationData[] = [];
        let gdpData: EconomicData[] = [];
        let gdpPerCapitaData: EconomicData[] = [];
        let unemploymentData: EconomicData[] = [];
        let inflationData: EconomicData[] = [];

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

          setGdpData(gdpData);
          console.log(gdpData, "gdpDdata:");
        }

        if (gdpPerCapitaResponse.data && gdpPerCapitaResponse.data.length > 1) {
          gdpPerCapitaData = gdpPerCapitaResponse.data[1]
            .map((item: WorldBankDataItem) => ({
              year: parseInt(item.date),
              gdpPerCapita: item.value,
            }))
            .filter((item: EconomicData) => item.gdpPerCapita !== null)
            .sort((a: EconomicData, b: EconomicData) => a.year - b.year);

          setGdpPerCapitaData(gdpPerCapitaData);
        }

        if (unemploymentResponse.data && unemploymentResponse.data.length > 1) {
          unemploymentData = unemploymentResponse.data[1]
            .map((item: WorldBankDataItem) => ({
              year: parseInt(item.date),
              unemploymentRate: item.value,
            }))
            .filter((item: EconomicData) => item.unemploymentRate !== null)
            .sort((a: EconomicData, b: EconomicData) => a.year - b.year);

          setUnemploymentData(unemploymentData);
        }

        if (inflationResponse.data && inflationResponse.data.length > 1) {
          inflationData = inflationResponse.data[1]
            .map((item: WorldBankDataItem) => ({
              year: parseInt(item.date),
              inflationRate: item.value,
            }))
            .filter((item: EconomicData) => item.inflationRate !== null)
            .sort((a: EconomicData, b: EconomicData) => a.year - b.year);

          setInflationData(inflationData);
        }

        // Combine all economic data into a single array
        const combinedData = gdpData.map((gdpItem) => {
          const year = gdpItem.year;
          return {
            year,
            gdp: gdpItem.gdp,
            gdpPerCapita: gdpPerCapitaData.find((item) => item.year === year)
              ?.gdpPerCapita,
            unemploymentRate: unemploymentData.find(
              (item) => item.year === year
            )?.unemploymentRate,
            inflationRate: inflationData.find((item) => item.year === year)
              ?.inflationRate,
          };
        });

        setCombinedEconomicData(combinedData);

        await getPopulationPredictions(popData);
        await getEconomicPredictions(gdpData);
        await getPerCapitaPredictions(gdpPerCapitaData);
        await getUnemploymentPredictions(unemploymentData);
        await getInflationPredictions(inflationData);
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

    return `Analyze the following historical population data for Kazakhstan and predict the population for each year from 2023 to 2030:
  
    ${historicalData}
  
    Based on these trends, what is the projected population for each year in the given range? Provide your predictions in a structured format.`;
  };

  const generateEconomicPrompt = (data: EconomicData[]): string => {
    const historicalData = data
      .map((item) => `Year: ${item.year}, GDP: ${item.gdp}`)
      .join("\n");

    return `Based on global economic data and current trends, please model and imagine one possible scenario for Kazakhstan's GDP from 2023 to 2030. Let these be most likely scenario. When developing scenario, consider the following factors:

Global economic conditions: changes in oil prices, international trade and geopolitical risks.
Domestic policy: government spending, fiscal and monetary policy, as well as possible structural reforms in Kazakhstan.
Technological innovations: the introduction of new technologies and the development of industries.
Dependence on natural resources: Kazakhstan, being an economy based on oil and gas, is vulnerable to fluctuations in the prices of these goods.
Demographic factors: expected population growth and changes in its age structure.
Unexpected events: pandemics, crises or unpredictable geopolitical events.
Based on these data, predict the dynamics of Kazakhstan's GDP in most-likely scenario with approximate figures of GDP growth/decline for each year in the period from 2023 to 2030. Specify the estimated GDP values in the scenario, even if this is hypothetical.
  
    ${historicalData}
  
   `;
  };

  const generatePerCapitaPrompt = (data: EconomicData[]): string => {
    const historicalData = data
      .map((item) => `Year: ${item.year}, GDP per Capita: ${item.gdpPerCapita}`)
      .join("\n");

    return `Analyze the following GDP per Capita data for Kazakhstan from 1991 to 2024:

    ${historicalData}

    Based on these trends, what is the projected GDP per Capita for each year in the given range? Predict the GDP per Capita for each year from 2023 to 2030.`;
  };

  const generateUnemploymentPrompt = (data: EconomicData[]): string => {
    const historicalData = data
      .map(
        (item) =>
          `Year: ${item.year}, Unemployment Rate: ${item.unemploymentRate}%`
      )
      .join("\n");

    return `Analyze the following historical unemployment rate data for Kazakhstan:
  
    ${historicalData}
  
    Provide insights on trends and potential future changes in the unemployment rate for each year from 2023 to 2030.`;
  };

  const generateInflationPrompt = (data: EconomicData[]): string => {
    const historicalData = data
      .map(
        (item) => `Year: ${item.year}, Inflation Rate: ${item.inflationRate}%`
      )
      .join("\n");

    return `Analyze the following historical inflation rate data for Kazakhstan:
  
    ${historicalData}
  
    Provide insights on trends and potential future changes in the inflation rate for each year from 2023 to 2030.`;
  };

  {
    /*  Analyze the following demographic and economic data for Kazakhstan from 1991 to 2024. How do demographic changes impact economic indicators such as GDP and unemployment? Predict future trends for the years 2025, 2027, and 2029.*/
  }

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
  const getPerCapitaPredictions = async (data: EconomicData[]) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generatePerCapitaPrompt(data);

      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      console.log("Per Capita Gemini Response:", geminiResponse);

      const futurePredictions = parsePerCapitaResponse(geminiResponse);
      console.log("Parsed Per Capita Predictions:", futurePredictions);
      setPredictedPerCapitaData(futurePredictions);
    } catch (error) {
      console.error("Error getting per capita predictions from Gemini:", error);
    }
  };

  const getUnemploymentPredictions = async (data: EconomicData[]) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generateUnemploymentPrompt(data);

      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      console.log("Unemployment Gemini Response:", geminiResponse);

      const futurePredictions = parseUnemploymentResponse(geminiResponse);
      console.log("Parsed Unemployment Predictions:", futurePredictions);
      setPredictedUnemploymentData(futurePredictions);
    } catch (error) {
      console.error(
        "Error getting unemployment predictions from Gemini:",
        error
      );
    }
  };

  const getInflationPredictions = async (data: EconomicData[]) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generateInflationPrompt(data);

      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      console.log("Inflation Gemini Response:", geminiResponse);

      const futurePredictions = parseInflationResponse(geminiResponse);
      console.log("Parsed Inflation Predictions:", futurePredictions);
      setPredictedInflationData(futurePredictions);
    } catch (error) {
      console.error("Error getting inflation predictions from Gemini:", error);
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

    console.log("Parsed Population Predictions:", predictions);
    return predictions;
  };

  const parseEconomicResponse = (response: string): EconomicData[] => {
    console.log("Raw Economic Gemini Response:", response);

    const predictions: EconomicData[] = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      const match = line.match(
        /\|\s*(\d{4})\s*\|\s*[\d.]+%\s*\|\s*([\d.]+)\s*\|/
      );
      if (match) {
        const year = parseInt(match[1]);
        const gdp = parseFloat(match[2]) * 1e9;
        predictions.push({ year, gdp });
      }
    });

    console.log("Parsed Economic Predictions:", predictions);
    return predictions;
  };
  const parsePerCapitaResponse = (response: string): EconomicData[] => {
    console.log("Raw Per Capita Gemini Response:", response);

    const predictions: EconomicData[] = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      const match = line.match(/\|\s*(\d{4})\s*\|\s*(\d+)\s*\|/);
      if (match) {
        const year = parseInt(match[1]);
        const gdpPerCapita = parseInt(match[2]);
        predictions.push({ year, gdp: 0, gdpPerCapita });
      }
    });

    console.log("Parsed Per Capita Predictions:", predictions);
    return predictions;
  };

  const parseUnemploymentResponse = (response: string): EconomicData[] => {
    console.log("Raw Unemployment Gemini Response:", response);

    const predictions: EconomicData[] = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      const match = line.match(/\|\s*(\d{4})\s*\|\s*(\d+)\s*\|/);
      if (match) {
        const year = parseInt(match[1]);
        const unemploymentRate = parseFloat(match[2]);
        predictions.push({ year, gdp: 0, unemploymentRate });
      }
    });

    console.log("Parsed Unemployment Predictions:", predictions);
    return predictions;
  };

  const parseInflationResponse = (response: string): EconomicData[] => {
    console.log("Raw Inflation Gemini Response:", response);

    const predictions: EconomicData[] = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      const match = line.match(/\|\s*(\d{4})\s*\|\s*(\d+(\.\d+)?)\s*\|/);
      if (match) {
        const year = parseInt(match[1]);
        const inflationRate = parseFloat(match[2]);
        predictions.push({ year, gdp: 0, inflationRate });
      }
    });

    console.log("Parsed Inflation Predictions:", predictions);
    return predictions;
  };

  const renderBarChart = (data: EconomicData[]) => (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" tick={{ fontSize: 12 }} />
      <YAxis
        tickFormatter={(tick) => tick.toLocaleString()}
        tick={{ fontSize: 8 }}
      />
      <Tooltip formatter={(value) => value.toLocaleString()} />
      <Legend />
      <Bar dataKey="gdp" fill="#8884d8" />
    </BarChart>
  );

  const filteredPopulationData = [
    ...populationData,
    ...predictedPopulationData,
  ].filter((item) => item.year >= startYear && item.year <= endYear);

  const filteredGdpData = [...gdpData, ...predictedEconomicData].filter(
    (item) => item.year >= gdpStartYear && item.year <= gdpEndYear
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
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
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

      <div className="mt-8">
        <h2 className="text-xl mb-4">Столбчатая диаграмма ВВП</h2>
        <div className="mb-4">
          <label>
            C какого года:
            <input
              type="number"
              value={gdpStartYear}
              onChange={(e) => setGdpStartYear(parseInt(e.target.value))}
              className="ml-2 p-1 border text-black"
            />
          </label>
          <label className="ml-4">
            По какой год:
            <input
              type="number"
              value={gdpEndYear}
              onChange={(e) => setGdpEndYear(parseInt(e.target.value))}
              className="ml-2 p-1 border text-black"
            />
          </label>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          {renderBarChart(filteredGdpData)}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainTheme;
