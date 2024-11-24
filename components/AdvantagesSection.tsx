import React from "react";
import {
  LineChart,
  Users,
  TrendingUp,
  Database,
  Share2,
  Download,
} from "lucide-react";

const ADVANTAGES = [
  {
    title: "Точность данных",
    description:
      "Использование официальных источников и передовых методов анализа",
    icon: <Database className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Визуализация",
    description:
      "Интерактивные графики и карты для наглядного представления данных",
    icon: <LineChart className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Прогнозирование",
    description: "AI-powered прогнозы демографических трендов",
    icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Доступность",
    description: "Простой интерфейс для работы со сложными данными",
    icon: <Users className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Интеграция",
    description:
      "Возможность делиться данными и встраивать их в другие системы",
    icon: <Share2 className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Экспорт",
    description: "Выгрузка данных в различных форматах для дальнейшего анализа",
    icon: <Download className="w-8 h-8 text-blue-600" />,
  },
];

const AdvantagesSection = () => {
  return (
    <section className="advantages py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Наши преимущества
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Точность данных",
              description:
                "Использование официальных источников и передовых методов анализа",
              icon: <Database className="w-6 h-6 text-blue-600" />,
            },
            {
              title: "Визуализация",
              description:
                "Интерактивные графики и карты для наглядного представления данных",
              icon: <LineChart className="w-6 h-6 text-blue-600" />,
            },
            {
              title: "Прогнозирование",
              description: "AI-powered прогнозы демографических трендов",
              icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
            },
            {
              title: "Доступность",
              description: "Простой интерфейс для работы со сложными данными",
              icon: <Users className="w-6 h-6 text-blue-600" />,
            },
            {
              title: "Интеграция",
              description:
                "Возможность делиться данными и встраивать их в другие системы",
              icon: <Share2 className="w-6 h-6 text-blue-600" />,
            },
            {
              title: "Экспорт",
              description:
                "Выгрузка данных в различных форматах для дальнейшего анализа",
              icon: <Download className="w-6 h-6 text-blue-600" />,
            },
          ].map((advantage, index) => (
            <div
              key={index}
              className="advantage-item p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  {advantage.title}
                </h3>
                <span className="text-sm">{advantage.icon}</span>
              </div>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
