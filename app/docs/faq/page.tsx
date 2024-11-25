import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-[13rem] pb-[3rem]">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
       Часто-задаваемые вопросы
      </h1>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium">
            Какова цель этой платформы?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Наша платформа объединяет технологии ИИ для анализа и
            прогнозирования демографических тенденций в Казахстане, предоставляя
            ценные данные для исследователей, политиков и широкой
            общественности.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-medium">
            Насколько точны прогнозы ИИ?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Наши прогнозы используют передовые модели ИИ от Gemini и Всемирного
            банка с регулярной проверкой на основе актуальных демографических
            данных. Мы сохраняем прозрачность в отношении уровней достоверности
            и возможных погрешностей.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-medium">
            Какие источники данных вы используете?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Мы объединяем данные из множества надежных источников, включая
            официальную государственную статистику, базы данных Всемирного банка
            и другие проверенные источники демографической информации.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-medium">
            Как часто обновляются данные?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Наши данные регулярно обновляются для обеспечения точности. Модели
            прогнозирования переобучаются на новых данных, которые обычно
            обновляются ежеквартально.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-medium">
            Могу ли я использовать эти данные для исследований?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Да, наши данные доступны для исследовательских целей. Пожалуйста,
            указывайте источник и ознакомьтесь с нашими условиями использования
            для получения конкретных рекомендаций по использованию данных и их
            цитированию.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
