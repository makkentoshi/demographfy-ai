import Link from 'next/link';
import { Brain, Trophy, Clock } from 'lucide-react';

const QuizCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Демографическая викторина</h3>
        <Brain className="w-8 h-8 text-blue-600" />
      </div>
      <p className="text-gray-600 mb-6">
        Проверьте свои знания о демографических процессах Казахстана в интерактивной викторине
      </p>
      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-sm text-gray-600">Призы</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">15 минут</span>
        </div>
      </div>
      <Link 
        href="/quiz"
        className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Начать викторину
      </Link>
    </div>
  );
};

export default QuizCard;