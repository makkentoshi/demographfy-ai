/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Настройка на статический экспорт
    basePath: '/demographfy-ai', // Базовый путь
    assetPrefix: '/demographfy-ai/', // Префикс для активов
    images: {
        unoptimized: true, // Отключение оптимизации изображений
    },
};

export default nextConfig; // Используйте export вместо module.exports