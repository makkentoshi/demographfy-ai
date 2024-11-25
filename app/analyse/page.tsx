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
import { useEconomicData } from "@/components/useEconomicData";

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

const AnalysePage: React.FC = () => {
  const {
    populationData,
    gdpData,
    unemploymentData,
    inflationData,
    exportData,
    governmentSpendingData,
    externalDebtData,
    ageGroupData,
    climateData,
    waterUsageData,
    investmentData,
    predictedPopulationData,
    predictedEconomicData,
    predictedUnemploymentData,
    predictedInflationData,
    predictedExportData,
    predictedGovernmentSpendingData,
    predictedExternalDebtData,
    predictedWaterUsageData,
    predictedInvestmentData,
  } = useEconomicData();
  const [startYear, setStartYear] = useState(1991);
  const [endYear, setEndYear] = useState(2024);
  const [gdpStartYear, setGdpStartYear] = useState(1991);
  const [gdpEndYear, setGdpEndYear] = useState(2030);

  // Фильтрация данных для графиков с учетом предсказаний
  const filteredUnemploymentData = [
    ...unemploymentData,
    ...predictedUnemploymentData,
  ].filter((item) => item.year >= startYear && item.year <= endYear);

  const filteredInflationData = [
    ...inflationData,
    ...predictedInflationData,
  ].filter((item) => item.year >= startYear && item.year <= endYear);

  const filteredExportData = [...exportData, ...predictedExportData].filter(
    (item) => item.year >= startYear && item.year <= endYear
  );

  const filteredGovernmentSpendingData = [
    ...governmentSpendingData,
    ...predictedGovernmentSpendingData,
  ].filter((item) => item.year >= startYear && item.year <= endYear);

  const filteredExternalDebtData = [
    ...externalDebtData,
    ...predictedExternalDebtData,
  ].filter((item) => item.year >= startYear && item.year <= endYear);

  const filteredAgeGroupData = ageGroupData.filter((item) => {
    return item.year >= startYear && item.year <= endYear;
  });

  const filteredClimateData = [...climateData].filter(
    (item) => item.year >= startYear && item.year <= endYear
  );

  const filteredWaterUsageData = [
    ...waterUsageData,
    ...predictedWaterUsageData,
  ].filter((item) => item.year >= startYear && item.year <= endYear);

  const filteredInvestmentData = [
    ...investmentData,
    ...predictedInvestmentData,
  ].filter((item) => item.year >= startYear && item.year <= endYear);

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

  const COLORS = ["#0088FE", "#2A438EFF", "#265F88FF", "#282380FF"];

  const renderLabel = (entry: EconomicData) => {
    return `${
      entry.unemploymentRate ? entry.unemploymentRate.toFixed(2) : "N/A"
    }% (${entry.year})`;
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 gap-8 pt-[15rem]">
      {/* Первая колонка */}
      <div className="col-span-2 lg:col-span-1">
        <div className="mb-4 text-sm lg:text-md">
          <h1 className="text-md lg:text-xl mb-4 text-black">
            Прогнозирование населения Казахстана
          </h1>
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
          <ResponsiveContainer width="100%" height={600}>
            <PieChart>
              <Pie
                data={filteredUnemploymentData}
                dataKey="unemploymentRate"
                nameKey="year"
                cx="50%"
                cy="50%"
                outerRadius={200}
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
      </div>

      {/* Вторая колонка */}
      <div className="col-span-2 lg:col-span-1">
        {/* График экспорта */}
        <div className="mt-20">
          <h2 className="text-md lg:text-xl mb-4">График экспорта</h2>
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
            <LineChart data={filteredExportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tick={{ fontSize: 9 }} />
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
            <LineChart data={filteredGovernmentSpendingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Line type="monotone" dataKey="govSpend" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* График внешнего долга */}
        <div className="mt-20">
          <h2 className="text-md lg:text-xl mb-4">График внешнего долга</h2>
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
            <div className="mt-5">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredExternalDebtData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="debt" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/*  График использования воды */}
          <div className="mt-20">
            <h2 className="text-md lg:text-xl mb-4">
              График использования воды
            </h2>
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
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={filteredWaterUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Line type="monotone" dataKey="waterUsage" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* filteredInvestmentData*/}
          <div className="mt-20">
            <h2 className="text-md lg:text-xl mb-4">
              График иностранных инвестиций в Казахстан
            </h2>
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
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={filteredInvestmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Line type="monotone" dataKey="investment" stroke="#3D3B61FF" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/*filteredAgeGroupData */}

          <div className="mt-20">
            <h2 className="text-md lg:text-xl mb-4">
              График по возрасту и полу
            </h2>
            <div className="mb-4 text-sm lg:text-md">
              <label>
                C какого года:
                <input
                  type="number"
                  value={startYear}
                  onChange={(e) => setGdpStartYear(parseInt(e.target.value))}
                  className="ml-2 p-1 border text-black rounded-md"
                />
              </label>
              <label className="ml-4">
                По какой год:
                <input
                  type="number"
                  value={endYear}
                  onChange={(e) => setGdpEndYear(parseInt(e.target.value))}
                  className="ml-2 p-1 border text-black rounded-md"
                />
              </label>
            </div>
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={filteredAgeGroupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Line type="monotone" dataKey="males" stroke="#8884d8" />
                <Line type="monotone" dataKey="females" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysePage;
