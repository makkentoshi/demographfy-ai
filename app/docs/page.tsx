import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Docs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[10rem] pb-[2rem]">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">О проекте</h1>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>О проекте</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
            Мой проект объединяет передовые технологии искусственного интеллекта для анализа и прогнозирования демографических тенденций в Казахстане. Мы используем как Gemini AI от Google, так и аналитические инструменты Всемирного банка, чтобы предоставить всестороннюю информацию о динамике населения, миграционных процессах и о других демографических изменениях.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Методы</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Я предоставляю многофункциональный подход к изучению информацию и ее применению:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
              <li>Продвинутые алгоритмы машинного обучения для распознавания закономерностей</li>
              <li>Анализ исторических данных из надежных источников</li>
              <li>Интеграция нескольких моделей ИИ для точного прогнозирования</li>
              <li>Регулярная проверка на основе реальных демографических данных</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Цели и объекты</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
             Мои основные цели включают:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
              <li>Предоставление точных демографических прогнозов для политиков </li>
              <li>Изучение динамики и тенденций изменения численности населения</li>
              <li>Поддержка принятия решений на основе доказательной базы</li>
              <li>Вклад в исследования демографических процессов в Казахстане</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}