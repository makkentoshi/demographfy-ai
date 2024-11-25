import { BookOpen, ExternalLink, GraduationCap, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

interface Work {
  title: string;
  year: string;
  type: 'book' | 'article' | 'research';
  link?: string;
  description: string;
}

interface Scientist {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  specialization: string[];
  works: Work[];
}

const scientists: Scientist[] = [
  {
    id: 'makash-tatimov',
    name: 'Макаш Татимов',
    title: 'Доктор политических наук, демограф',
    image: '/tatimov.jpg',
    bio: 'Известный казахстанский ученый-демограф, внесший значительный вклад в изучение демографических процессов Казахстана. Его исследования охватывают широкий спектр демографических проблем.',
    specialization: [
      'Демографическая политика',
      'Этнодемография',
      'Социальная демография'
    ],
    works: [
      {
        title: 'Демографическое измерение Казахстана',
        year: '2018',
        type: 'book',
        description: 'Комплексное исследование демографических процессов в современном Казахстане.'
      },
      {
        title: 'Этнодемографический портрет Казахстана',
        year: '2015',
        type: 'research',
        description: 'Анализ этнического состава населения и демографических тенденций.'
      }
    ]
  },
  {
    id: 'oraz-jandosov',
    name: 'Ораз Жандосов',
    title: 'Экономист-демограф',
    image: '/jandosov.jpg',
    bio: 'Специалист в области экономической демографии, исследователь влияния демографических процессов на экономическое развитие Казахстана.',
    specialization: [
      'Экономическая демография',
      'Демографическое прогнозирование',
      'Миграционные процессы'
    ],
    works: [
      {
        title: 'Демографические тренды и экономический рост',
        year: '2020',
        type: 'article',
        link: '#',
        description: 'Исследование взаимосвязи демографических изменений и экономического развития.'
      }
    ]
  }
];

export default function ScientistsPage() {
  return (
    <div className="min-h-screen bg-white pt-[10rem]">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Ученые-демографы  и заслуженные деятели Казахстана
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Исследователи демографических процессов и их научные работы
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {scientists.map((scientist) => (
            <div key={scientist.id} className="bg-white rounded-lg shadow-sm border p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                    <Image
                      src={scientist.image}
                      alt={scientist.name}
                      width={400}
                      height={400}
                      className="object-cover"
                    />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-gray-900">{scientist.name}</h2>
                  <p className="text-navy-600 font-medium">{scientist.title}</p>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-900">Специализация:</h3>
                    <ul className="mt-2 space-y-1">
                      {scientist.specialization.map((spec) => (
                        <li key={spec} className="text-sm text-gray-600 flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-navy-600" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="prose max-w-none">
                    <p className="text-gray-600">{scientist.bio}</p>
                  </div>

                  <Separator className="my-6" />

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Научные работы</h3>
                  <div className="grid gap-4">
                    {scientist.works.map((work, index) => (
                      <Card key={index} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {work.type === 'book' && <BookOpen className="h-5 w-5 text-navy-600" />}
                              {work.type === 'article' && <ScrollText className="h-5 w-5 text-navy-600" />}
                              {work.type === 'research' && <GraduationCap className="h-5 w-5 text-navy-600" />}
                              <h4 className="text-lg font-semibold text-gray-900">{work.title}</h4>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{work.description}</p>
                            <p className="mt-1 text-sm text-gray-500">Год публикации: {work.year}</p>
                          </div>
                          {work.link && (
                            <Button variant="outline" size="sm" className="text-navy-600 hover:text-navy-700">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Читать
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}