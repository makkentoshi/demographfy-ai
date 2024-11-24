/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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
  gdpGrowth?: number;
  export?: number;
  govSpend?: number;
  debt?: number;
}

interface ExportData {
  year: number;
  export: number;
}

interface ExportChartProps {
  data: ExportData[];
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

  const [exportData, setExportData] = useState<EconomicData[]>([]);
  const [governmentSpendingData, setGovernmentSpendingData] = useState<
    EconomicData[]
  >([]);
  const [externalDebtData, setExternalDebtData] = useState<EconomicData[]>([]);

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
        const exportResponse = await axios.get(
          `https://api.worldbank.org/v2/country/KZ/indicator/NE.EXP.GNFS.CD?format=json&date=${startYear}:${endYear}`
        );

        const governmentSpendingResponse = await axios.get(
          `https://api.worldbank.org/v2/country/KZ/indicator/NE.CON.GOVT.CD?format=json&date=${startYear}:${endYear}`
        );

        const externalDebtResponse = await axios.get(
          `https://api.worldbank.org/v2/country/KZ/indicator/DT.DOD.DECT.CD?format=json&date=${startYear}:${endYear}`
        );

        let popData: PopulationData[] = [];
        let gdpData: EconomicData[] = [];
        let gdpPerCapitaData: EconomicData[] = [];
        let unemploymentData: EconomicData[] = [];
        let inflationData: EconomicData[] = [];
        let exportData: EconomicData[] = [];
        let governmentSpendingData: EconomicData[] = [];
        let externalDebtData: EconomicData[] = [];

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
        if (exportResponse.data && exportResponse.data.length > 1) {
          exportData = exportResponse.data[1]
            .map((item: WorldBankDataItem) => ({
              year: parseInt(item.date),
              export: item.value,
            }))
            .filter((item: EconomicData) => item.export !== null)
            .sort((a: EconomicData, b: EconomicData) => a.year - b.year);

          setExportData(exportData);
        }
        if (
          governmentSpendingResponse.data &&
          governmentSpendingResponse.data.length > 1
        ) {
          governmentSpendingData = governmentSpendingResponse.data[1]
            .map((item: WorldBankDataItem) => ({
              year: parseInt(item.date),
              govSpend: item.value,
            }))
            .filter((item: EconomicData) => item.govSpend !== null)
            .sort((a: EconomicData, b: EconomicData) => a.year - b.year);

          setGovernmentSpendingData(governmentSpendingData);
        }
        if (externalDebtResponse.data && externalDebtResponse.data.length > 1) {
          externalDebtData = externalDebtResponse.data[1]
            .map((item: WorldBankDataItem) => ({
              year: parseInt(item.date),
              debt: item.value,
            }))
            .filter((item: EconomicData) => item.debt !== null)
            .sort((a: EconomicData, b: EconomicData) => a.year - b.year);

          setExternalDebtData(externalDebtData);
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
        await getExportPredictions(exportData);
        await getExternalDebtPredictions(externalDebtData);
        await getGovernmentSpendingPredictions(governmentSpendingData);
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

    return `
    Based on historical population data for Kazakhstan and global demographic trends, please generate a realistic forecast for the population from 2023 to 2030. 
    This forecast should reflect both potential growth and possible periods of stagnation or decline to capture real-world demographic dynamics. 
    The format of the table should remain consistent throughout, without variations.
    
    When developing the scenario, consider the following key factors:
    
    1. **Birth and death rates:** Trends in fertility and mortality, including changes in life expectancy and healthcare advancements.
    2. **Migration patterns:** Net migration (immigration minus emigration) and its impact on population size.
    3. **Economic and social factors:** How economic growth, urbanization, and social policies influence demographic trends.
    4. **Population age structure:** The proportion of working-age, young, and elderly populations.
    5. **External events:** Possible shocks like pandemics, natural disasters, or geopolitical shifts that could affect population dynamics.
    
    **Important:** 
    - The table should remain consistent and in the following format: 
     | Year | Projected Population |
     |---|---| 
    - Ensure that not all years show growth; include at least a few years with a slight decline or stagnation to make the forecast more realistic.
    
    Please use the historical data below as a reference point:
    
    ${historicalData}
      `;
  };

  const generateEconomicPrompt = (data: EconomicData[]): string => {
    const historicalData = data
      .map((item) => `Year: ${item.year}, GDP: ${item.gdp}`)
      .join("\n");

    return `
  Based on global economic data and current trends, please generate a stable and realistic forecast for Kazakhstan's GDP from 2023 to 2030. 
  This forecast should include both growth and potential periods of slight decline to reflect real-world fluctuations. 
  The format of the table should remain consistent throughout, without variations. 
  
  When developing the scenario, consider the following key factors:
  
  1. **Global economic conditions:** Fluctuations in oil prices, changes in international trade, and geopolitical risks.
  2. **Domestic policy:** Government spending, fiscal and monetary policy, and potential structural reforms in Kazakhstan.
  3. **Technological innovations:** The impact of new technologies on industries and economic growth.
  4. **Dependence on natural resources:** Kazakhstan's vulnerability to shifts in oil and gas prices, along with efforts to diversify the economy.
  5. **Demographic factors:** Expected population growth and changes in the age structure.
  6. **Unexpected events:** Possibilities of pandemics, financial crises, or unpredictable geopolitical events that could impact the economy.
  
  **Important:** 
  - The table should remain consistent and in the following format: 
   | Year | Estimated GDP (Billion USD) |
   |---|---| 
  - Provide GDP values in billions of USD.
  - Ensure that not all years show growth; include at least a few years with a slight decline or stagnation to make the forecast more realistic.
  
  Please use the historical data below as a reference point:
  
  ${historicalData}
    `;
  };

  const generatePerCapitaPrompt = (data: EconomicData[]): string => {
    const historicalData = data
      .map((item) => `Year: ${item.year}, GDP per Capita: ${item.gdpPerCapita}`)
      .join("\n");

    return `
  Based on global economic data and current trends, please generate a stable and realistic forecast for Kazakhstan's GDP per Capita from 2023 to 2030. 
  This forecast should include growth and potential risks that reflect real-world fluctuations . 
  The format of the table should remain consistent throughout, without variations. 
  
  When developing the scenario, consider the following key factors:
  
  1. **Global economic conditions:** Fluctuations in oil prices, changes in international trade, and geopolitical risks.
  2. **Domestic policy:** Government spending, fiscal and monetary policy, and potential structural reforms in Kazakhstan.
  3. **Technological innovations:** The impact of new technologies on industries and economic growth.
  4. **Dependence on natural resources:** Kazakhstan's vulnerability to shifts in oil and gas prices, along with efforts to diversify the economy.
  5. **Demographic factors:** Expected population growth and changes in the age structure.
  6. **Unexpected events:** Possibilities of pandemics, financial crises, or unpredictable geopolitical events that could impact the economy.
  
  **Important:** 
  - The table should remain consistent and in the following format: 
    | Year | GDP per Capita Growth (%) | Estimated GDP per Capita (USD) |
    |---|---|---| 
  - Provide GDP per Capita values in USD.
  
  Please use the historical data below as a reference point:
  
  ${historicalData}
    `;
  };
  const generateUnemploymentPrompt = (data: EconomicData[]): string => {
    const historicalData = data
      .map(
        (item) =>
          `Year: ${item.year}, Unemployment Rate: ${item.unemploymentRate}%`
      )
      .join("\n");

    return `
    Based on historical data and current trends, please generate a stable and realistic forecast for Kazakhstan's unemployment rate from 2023 to 2030. 
    The format of the table should remain consistent throughout, without variations. 
  
    When developing the scenario, consider the following key factors of KAZAKHSTAN ( most new factors ):
    
    1. **Economic diversification:** Ongoing efforts to reduce dependency on natural resources and increase employment in sectors like services, agriculture, and manufacturing.
    2. **Education and workforce development:** The quality of education, vocational training, and reskilling programs affecting labor market adaptability.
    3. **Population trends:** Demographic factors such as labor force growth, aging population, and migration patterns.
    4. **Government policies:** Labor market regulations, employment programs, and social safety nets aimed at reducing unemployment.
    5. **Technological changes:** The impact of automation, digitalization, and innovation on the availability of jobs in various sectors.
    6. **Global economic conditions:** External shocks, changes in trade policies, and geopolitical risks that could affect Kazakhstan's economy and employment rates.
    7. **Unexpected events:** Potential risks like financial crises, pandemics, or natural disasters that could disrupt employment trends.
  
    **Important:** 
    - The table should remain consistent and follow this format: 
      | Year | Unemployment Rate (%) |
      |---|---| 
    - Provide unemployment rate values in percentage format.
  
    Please use the historical data below as a reference point:
    
    ${historicalData}
    `;
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

  const generateExportPrompt = (data: EconomicData[]): string => {
    const historicalData = data
      .map((item) => `Year: ${item.year}, Export: ${item.export}`)
      .join("\n");

    return `
    Based on historical export data for Kazakhstan and global economic trends, please generate a realistic forecast for the export from 2023 to 2030.
    
    **Important:** 
    - The table should remain consistent and in the following format: 
     | Year | Projected Export |
     |---|---| 
    - Ensure that not all years show growth; include at least a few years with a slight decline or stagnation to make the forecast more realistic.
    
    Please use the historical data below as a reference point:
    
    ${historicalData}
    `;
  };

  const generateGovernmentSpendingPrompt = (data: EconomicData[]): string => {
    const historicalData = data
      .map(
        (item) => `Year: ${item.year}, Government Spending: ${item.govSpend}`
      )
      .join("\n");

    return `
    Based on historical government spending data for Kazakhstan and global economic trends, please generate a realistic forecast for government spending from 2023 to 2030.
    
    **Important:** 
    - The table should remain consistent and in the following format: 
     | Year | Projected Government Spending |
     |---|---| 
    - Ensure that not all years show growth; include at least a few years with a slight decline or stagnation to make the forecast more realistic.
    
    Please use the historical data below as a reference point:
    
    ${historicalData}
    `;
  };

  const generateExternalDebtPrompt = (data: EconomicData[]): string => {
    const historicalData = data
      .map((item) => `Year: ${item.year}, External Debt: ${item.debt}`)
      .join("\n");

    return `
    Based on historical external debt data for Kazakhstan and global economic trends, please generate a realistic forecast for external debt from 2023 to 2030.
    
    **Important:** 
    - The table should remain consistent and in the following format: 
     | Year | Projected External Debt |
     |---|---| 
    - Ensure that not all years show growth; include at least a few years with a slight decline or stagnation to make the forecast more realistic.
    
    Please use the historical data below as a reference point:
    
    ${historicalData}
    `;
  };

  {
    /*  Analyze the following demographic and economic data for Kazakhstan from 1991 to 2024. How do demographic changes impact economic indicators such as GDP and unemployment? Predict future trends for the years 2025, 2027, and 2029.*/
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getPopulationPredictions = async (
    popData: PopulationData[],
    delayMs: number = 2000
  ) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generatePopulationPrompt(popData);

      console.log("Waiting for delay before request...");
      await delay(delayMs);

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

  const getEconomicPredictions = async (
    gdpData: EconomicData[],
    delayMs: number = 2000
  ) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generateEconomicPrompt(gdpData);

      await delay(delayMs); // Задержка перед запросом
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

  const getPerCapitaPredictions = async (
    data: EconomicData[],
    delayMs: number = 2000
  ) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generatePerCapitaPrompt(data);

      await delay(delayMs);
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

  const getUnemploymentPredictions = async (
    data: EconomicData[],
    delayMs: number = 2000
  ) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generateUnemploymentPrompt(data);

      await delay(delayMs);
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

  const getInflationPredictions = async (
    data: EconomicData[],
    delayMs: number = 2000
  ) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generateInflationPrompt(data);

      await delay(delayMs);
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

  const getExportPredictions = async (
    expData: EconomicData[],
    delayMs: number = 2000
  ) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generateExportPrompt(expData);

      console.log("Waiting for delay before request...");
      await delay(delayMs);

      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      console.log("Export Gemini Response:", geminiResponse);

      const futurePredictions = parseExportResponse(geminiResponse);
      console.log("Parsed Export Predictions:", futurePredictions);
      setExportData(futurePredictions);
    } catch (error) {
      console.error("Error getting export predictions from Gemini:", error);
    }
  };

  const getGovernmentSpendingPredictions = async (
    govData: EconomicData[],
    delayMs: number = 2000
  ) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generateGovernmentSpendingPrompt(govData);

      console.log("Waiting for delay before request...");
      await delay(delayMs);

      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      console.log("Government Spending Gemini Response:", geminiResponse);

      const futurePredictions = parseGovernmentSpendingResponse(geminiResponse);
      console.log("Parsed Government Spending Predictions:", futurePredictions);
      setGovernmentSpendingData(futurePredictions);
    } catch (error) {
      console.error(
        "Error getting government spending predictions from Gemini:",
        error
      );
    }
  };
  const getExternalDebtPredictions = async (
    debtData: EconomicData[],
    delayMs: number = 2000
  ) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generateExternalDebtPrompt(debtData);

      console.log("Waiting for delay before request...");
      await delay(delayMs);

      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      console.log("External Debt Gemini Response:", geminiResponse);

      const futurePredictions = parseExternalDebtResponse(geminiResponse);
      console.log("Parsed External Debt Predictions:", futurePredictions);
      setExternalDebtData(futurePredictions);
    } catch (error) {
      console.error(
        "Error getting external debt predictions from Gemini:",
        error
      );
    }
  };

  const parsePopulationResponse = (response: string): PopulationData[] => {
    console.log("Raw Population Gemini Response:", response);

    const predictions: PopulationData[] = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      // Проверяем формат строки как таблицу
      const tableFormatMatch = line.match(
        /\|\s*(\d{4})\s*\|\s*~?([\d,]+)\s*\|/
      );
      // Если формат таблицы не найден, проверяем другой формат
      const keyValueFormatMatch =
        !tableFormatMatch && line.match(/(\d{4})\s*:\s*~?([\d,]+)/);

      const match = tableFormatMatch || keyValueFormatMatch;

      if (match) {
        const year = parseInt(match[1], 10); // Преобразуем год
        const population = parseInt(match[2].replace(/,/g, ""), 10); // Удаляем запятые и преобразуем численность
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
      const match = line.match(/\|\s*(\d{4})\s*\|\s*([\d.]+)\s*\|/);
      if (match) {
        const year = parseInt(match[1]);
        const gdp = parseFloat(match[2]) * 1e9; // Конвертируем значение ВВП в миллиарды
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
    const lines = response
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line); // Удаляем пустые строки

    lines.forEach((line) => {
      const match = line.match(/\|\s*(\d{4})\s*\|\s*([\d.]+)\s*\|/); // Обратите внимание на использование [\d.]+ для извлечения процентов
      if (match) {
        const year = parseInt(match[1]);
        const unemploymentRate = parseFloat(match[2]); // Конвертируем в число
        predictions.push({ year, gdp: 0, unemploymentRate }); // GDP оставляем равным 0
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

  const parseExportResponse = (response: string): EconomicData[] => {
    const predictions: EconomicData[] = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      const match = line.match(/\|\s*(\d{4})\s*\|\s*([\d.]+)\s*\|/);
      if (match) {
        const year = parseInt(match[1]);
        const exportValue = parseFloat(match[2]) * 1e9; // Конвертируем в миллиарды
        predictions.push({ year, gdp: 0, export: exportValue }); // Added gdp property
      }
    });

    return predictions;
  };

  const parseGovernmentSpendingResponse = (
    response: string
  ): EconomicData[] => {
    const predictions: EconomicData[] = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      const match = line.match(/\|\s*(\d{4})\s*\|\s*([\d.]+)\s*\|/);
      if (match) {
        const year = parseInt(match[1]);
        const governmentSpending = parseFloat(match[2]) * 1e9; // Конвертируем в миллиарды
        predictions.push({ year, gdp: 0, govSpend: governmentSpending }); // Added gdp property
      }
    });

    return predictions;
  };

  const parseExternalDebtResponse = (response: string): EconomicData[] => {
    const predictions: EconomicData[] = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      const match = line.match(/\|\s*(\d{4})\s*\|\s*([\d.]+)\s*\|/);
      if (match) {
        const year = parseInt(match[1]);
        const debt = parseFloat(match[2]) * 1e9; // Конвертируем в миллиарды
        predictions.push({ year, gdp: 0, debt }); // Added gdp property
      }
    });

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
      <Bar dataKey="gdp" fill="#6993F6FF" />
    </BarChart>
  );

  const filteredPopulationData = [
    ...populationData,
    ...predictedPopulationData,
  ].filter((item) => item.year >= startYear && item.year <= endYear);

  const filteredGdpData = [...gdpData, ...predictedEconomicData].filter(
    (item) => item.year >= gdpStartYear && item.year <= gdpEndYear
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const renderLabel = (entry: EconomicData) => {
    return `${
      entry.unemploymentRate ? entry.unemploymentRate.toFixed(2) : "N/A"
    }% (${entry.year})`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-md lg:text-xl mb-4 text-black">
        Прогнозирование населения Казахстана
      </h1>

      <div className="mb-4 text-sm lg:text-md">
        <label className="text-black">
          C какого года:
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(parseInt(e.target.value))}
            className="ml-2 p-1 border text-black rounded-md"
          />
        </label>
        <label className="ml-4 text-black">
          По какой год:
          <input
            type="number"
            value={endYear}
            onChange={(e) => setEndYear(parseInt(e.target.value))}
            className="ml-2 p-1 border text-black rounded-md"
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
        <h2 className="text-md lg:text-xl mb-4">Столбчатая диаграмма ВВП</h2>
        <div className="mb-4 text-sm lg:text-md">
          <label>
            C какого года:
            <input
              type="number"
              value={gdpStartYear}
              onChange={(e) => setGdpStartYear(parseInt(e.target.value))}
              className="ml-2 p-1 border text-black rounded-md"
            />
          </label>
          <label className="ml-4">
            По какой год:
            <input
              type="number"
              value={gdpEndYear}
              onChange={(e) => setGdpEndYear(parseInt(e.target.value))}
              className="ml-2 p-1 border text-black rounded-md"
            />
          </label>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          {renderBarChart(filteredGdpData)}
        </ResponsiveContainer>
      </div>
      <div className="mt-20">
        <h2 className="text-md lg:text-xl mb-4">
          Круговая диаграмма уровня безработицы Казахстана
        </h2>
        <ResponsiveContainer width="100%" height={700}>
          <PieChart>
            <Pie
              data={unemploymentData}
              dataKey="unemploymentRate"
              nameKey="year"
              cx="50%"
              cy="50%"
              outerRadius={300}
              fill="#8884d8"
              label={renderLabel}
            >
              {unemploymentData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* График экспорта */}
      <div className="mt-20">
        <h2 className="text-md lg:text-xl mb-4">График экспорта</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={exportData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis  tick={{ fontSize: 9 }}/>
            <Tooltip />
            <Line type="monotone" dataKey="export" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* График государственных расходов */}
      <div className="mt-20">
        <h2 className="text-md lg:text-xl mb-4">
          График государственных расходов
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={governmentSpendingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis  tick={{ fontSize: 9 }}/>
            <Tooltip />
            <Line type="monotone" dataKey="govSpend" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* График внешнего долга */}
      <div className="mt-20">
        <h2 className="text-md lg:text-xl mb-4">График внешнего долга</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={externalDebtData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis  tick={{ fontSize: 9 }}/>
            <Tooltip />
            <Line type="monotone" dataKey="debt" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainTheme;
