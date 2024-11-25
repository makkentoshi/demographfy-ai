import { useEffect, useState } from "react";
import axios from "axios";
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
interface InvestmentData {
  year: number;
  investment: number;
}
interface WaterUsageData {
  year: number;
  waterUsage: number;
}
interface InflationData {
  year: number;
  inflationRate: number;
}

interface ClimateData {
  year: number;
  temperature: number; // Среднегодовая температура
  precipitation: number; // Осадки в мм
  humidity: number; // Средняя влажность в %
}

interface AgeGroupData {
  year: number;
  ageGroup: string; // Например, "0-4", "5-9" и т.д.
  males: number; // Число мужчин
  females: number; // Число женщин
}

interface ExportChartProps {
  data: ExportData[];
}

export const useEconomicData = () => {
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [gdpData, setGdpData] = useState<EconomicData[]>([]);
  const [gdpPerCapitaData, setGdpPerCapitaData] = useState<EconomicData[]>([]);
  const [unemploymentData, setUnemploymentData] = useState<EconomicData[]>([]);

  const [exportData, setExportData] = useState<EconomicData[]>([]);
  const [governmentSpendingData, setGovernmentSpendingData] = useState<
    EconomicData[]
  >([]);
  const [externalDebtData, setExternalDebtData] = useState<EconomicData[]>([]);

  const [investmentData, setInvestmentData] = useState<InvestmentData[]>([]);

  const [predictedInvestmentData, setPredictedInvestmentData] = useState<
    InvestmentData[]
  >([]);
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

  const [predictedExportData, setPredictedExportData] = useState<
    EconomicData[]
  >([]);
  const [predictedGovernmentSpendingData, setPredictedGovernmentSpendingData] =
    useState<EconomicData[]>([]);
  const [predictedExternalDebtData, setPredictedExternalDebtData] = useState<
    EconomicData[]
  >([]);

  const [waterUsageData, setWaterUsageData] = useState<WaterUsageData[]>([]);
  const [predictedWaterUsageData, setPredictedWaterUsageData] = useState<
    WaterUsageData[]
  >([]);

  const [inflationData, setInflationData] = useState<InflationData[]>([]);
  const [predictedInflationData, setPredictedInflationData] = useState<
    InflationData[]
  >([]);

  const [climateData, setClimateData] = useState<ClimateData[]>([]);

  const [ageGroupData, setAgeGroupData] = useState<AgeGroupData[]>([]);

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
        const investmentResponse = await axios.get(
          "https://api.worldbank.org/v2/country/KZ/indicator/BX.KLT.DINV.WD.GD.ZS?format=json&date=1991:2024"
        );
        const waterUsageResponse = await axios.get(
          `https://api.worldbank.org/v2/country/KZ/indicator/ER.H2O.FWTL.ZS?format=json&date=${startYear}:${endYear}`
        );
        const climateResponse = await axios.get(
          "https://api.worldbank.org/v2/country/KZ/indicator/EN.ATM.CO2E.KT?format=json&date=1991:2004"
        );

        const ageResponse = await axios.get(
          "https://api.worldbank.org/v2/country/KZ/indicator/SP.POP.0004.MA.IN?format=json"
        );
        // const co2EmissionsResponse = await axios.get(
        //     "https://api.worldbank.org/v2/country/KZ/indicator/EN.ATM.CO2E.KT?format=json&date=1991:2004"
        // );

        // const renewableEnergyResponse = await axios.get(
        //     "https://api.worldbank.org/v2/country/KZ/indicator/EG.FEC.RNEW.ZS?format=json&date=1991:2004"
        // );

        let popData: PopulationData[] = [];
        let gdpData: EconomicData[] = [];
        let gdpPerCapitaData: EconomicData[] = [];
        let unemploymentData: EconomicData[] = [];
        let inflationData: EconomicData[] = [];
        let exportData: EconomicData[] = [];
        let governmentSpendingData: EconomicData[] = [];
        let externalDebtData: EconomicData[] = [];

        let investmentData: InvestmentData[] = [];

        let waterData: WaterUsageData[] = [];
        let climateInfo: ClimateData[] = [];
        let ageData: AgeGroupData[] = [];

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
        if (investmentResponse.data && investmentResponse.data.length > 1) {
          investmentData = investmentResponse.data[1]
            .map((item: WorldBankDataItem) => ({
              year: parseInt(item.date),
              investment: item.value,
            }))
            .filter((item: InvestmentData) => item.investment !== null)
            .sort((a: InvestmentData, b: InvestmentData) => a.year - b.year);

          setInvestmentData(investmentData);
        }
        if (waterUsageResponse.data && waterUsageResponse.data.length > 1) {
          waterData = waterUsageResponse.data[1]
            .map((item: WorldBankDataItem) => ({
              year: parseInt(item.date),
              waterUsage: item.value,
            }))
            .filter((item: WaterUsageData) => item.waterUsage !== null)
            .sort((a: WaterUsageData, b: WaterUsageData) => a.year - b.year);

          setWaterUsageData(waterData);
        }

        if (climateResponse.data && Array.isArray(climateResponse.data)) {
          // Check if data is an array
          climateInfo = climateResponse.data.map((item: any) => ({
            year: parseInt(item.year as string),
            temperature: item.temperature,
            precipitation: item.precipitation,
            humidity: item.humidity,
          }));

          setClimateData(climateInfo);
        }
        if (ageResponse.data && Array.isArray(ageResponse.data)) {
          ageData = ageResponse.data.map((item: AgeGroupData) => ({
            year: item.year,
            ageGroup: item.ageGroup,
            males: item.males,
            females: item.females,
          }));
          setAgeGroupData(ageData);
        } else if (ageResponse.data.message) {
          console.error("Ошибка в данных:", ageResponse.data.message);
        } else {
          console.error("Неизвестная структура данных");
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
        await getInvestmentPredictions(investmentData);

        await getWaterUsagePredictions(waterData);
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
  const generateInflationPrompt = (data: InflationData[]): string => {
    const historicalData = data
      .map(
        (item) => `Year: ${item.year}, Inflation Rate: ${item.inflationRate}%`
      )
      .join("\n");

    return `
      Based on historical inflation data for Kazakhstan, generate a forecast for inflation rates (annual %) from 2023 to 2030.
      
      **Format:** 
       | Year | Projected Inflation Rate (%) |
       |------|------------------------------|
  
      Historical data for reference:
      ${historicalData}
    `;
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
  const generateInvestmentPrompt = (data: InvestmentData[]): string => {
    const historicalData = data
      .map((item) => `Year: ${item.year}, Investment: ${item.investment}%`)
      .join("\n");

    return `
      Based on historical data for Foreign Direct Investment (FDI) in Kazakhstan (% of GDP), please forecast the potential trends from 2023 to 2030. 
      Include factors such as economic policies, geopolitical influences, and global market trends that may impact these investments. 
      Provide the data in the following format:
  
      | Year | Projected Investment (% of GDP) |
      |---|---|
      
      Historical Data:
      ${historicalData}
    `;
  };
  const generateWaterUsagePrompt = (data: WaterUsageData[]): string => {
    const historicalData = data
      .map((item) => `Year: ${item.year}, Water Usage: ${item.waterUsage}%`)
      .join("\n");

    return `
      Based on historical freshwater withdrawal data for Kazakhstan, generate a forecast for annual withdrawals as a percentage of internal resources from 2023 to 2030.
      
      **Format:** 
       | Year | Projected Water Usage (%) |
       |------|---------------------------|
  
      Historical data for reference:
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
  const getInvestmentPredictions = async (
    data: InvestmentData[],
    delayMs: number = 2000
  ) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generateInvestmentPrompt(data);

      console.log("Waiting for delay before request...");
      await delay(delayMs);

      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      console.log("Investment Gemini Response:", geminiResponse);

      const futurePredictions = parseInvestmentResponse(geminiResponse);
      console.log("Parsed Investment Predictions:", futurePredictions);
      setPredictedInvestmentData(futurePredictions);
    } catch (error) {
      console.error("Error getting investment predictions from Gemini:", error);
    }
  };

  const getWaterUsagePredictions = async (
    waterData: WaterUsageData[],
    delayMs: number = 2000
  ) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = generateWaterUsagePrompt(waterData);

      console.log("Waiting for delay before request...");
      await delay(delayMs);

      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      console.log("Water Usage Gemini Response:", geminiResponse);

      const futurePredictions = parseWaterUsageResponse(geminiResponse);
      console.log("Parsed Water Usage Predictions:", futurePredictions);
      setPredictedWaterUsageData(futurePredictions);
    } catch (error) {
      console.error(
        "Error getting water usage predictions from Gemini:",
        error
      );
    }
  };

  const parseWaterUsageResponse = (response: string): WaterUsageData[] => {
    console.log("Raw Water Usage Gemini Response:", response);

    const predictions: WaterUsageData[] = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      const match = line.match(/\|\s*(\d{4})\s*\|\s*~?([\d.]+)\s*%?\s*\|/);
      if (match) {
        const year = parseInt(match[1], 10);
        const waterUsage = parseFloat(match[2]);
        predictions.push({ year, waterUsage });
      }
    });

    return predictions;
  };

  const parseInvestmentResponse = (response: string): InvestmentData[] => {
    console.log("Raw Investment Gemini Response:", response);

    const predictions: InvestmentData[] = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      const match = line.match(/\|\s*(\d{4})\s*\|\s*~?([\d.]+)%\s*\|/);

      if (match) {
        const year = parseInt(match[1], 10);
        const investment = parseFloat(match[2]);
        predictions.push({ year, investment });
      }
    });

    return predictions;
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

  return {
    gdpData,
    gdpPerCapitaData,
    populationData,
    unemploymentData,
    inflationData,
    exportData,
    governmentSpendingData,
    externalDebtData,
    ageGroupData,
    climateData,
    waterUsageData,
    investmentData, // Ensure this is included
    predictedPopulationData,
    predictedEconomicData,
    predictedUnemploymentData,
    predictedInflationData,
    predictedExportData,
    predictedGovernmentSpendingData,
    predictedExternalDebtData,

    predictedWaterUsageData,
    predictedInvestmentData,
  };
};
