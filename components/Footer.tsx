

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-xl font-bold mb-4 text-gray-900">О проекте</h3>
            <p className="text-gray-600 max-w-md">
              Платформа для анализа демографических процессов Казахстана с
              использованием современных технологий и методов анализа данных
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Контакты</h3>
            <div className="space-y-2">
              <p className="text-gray-600">Email: markiscoding.co@gmail.com</p>
              <p className="text-gray-600">Тел: +7 (700) 736-93-02</p>
              <p className="text-gray-600">Павлодар, Казахстан</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Спасибо</h3>
            <p>За проявленную возможность показать свою работу и поддержать проект :) я очень это ценю.</p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          © 2024 KZ Demographics. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
