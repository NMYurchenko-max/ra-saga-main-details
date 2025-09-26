/**
 * Модуль API для взаимодействия с backend-сервером (Render)
 * Использует Axios для HTTP-запросов к /api/services
 * BaseURL берётся из .env (VITE_API_URL), по умолчанию пустая строка
 * Все запросы с заголовком Content-Type: application/json
 */
import axios from 'axios';
import type { Service, ServiceListItem } from '@/types';

/**
 * Инстанс Axios для централизованных запросов
 * @property baseURL - Базовый URL API (для продакшена Render, для dev proxy в vite.config)
 * @property headers - Стандартные заголовки для JSON
 */
const api = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://ra-saga-main-details-backend.onrender.com' // Для продакшена Render
    : '', // Для dev: пустая строка, proxy в vite.config перенаправит /api на localhost:7070
  headers: {
    'Content-Type': 'application/json', // Заголовок для JSON-данных
  },
});

/**
 * Асинхронная функция для получения списка услуг
 * Выполняет GET-запрос к /api/services
 * @returns {Promise<ServiceListItem[]>} Массив элементов списка услуг
 */
export const fetchServices = async (): Promise<ServiceListItem[]> => {
  const response = await api.get('/api/services'); // GET-запрос к списку
  return response.data; // Возврат данных (массив объектов)
};

/**
 * Асинхронная функция для получения деталей услуги по ID
 * Выполняет GET-запрос к /api/services/:id
 * @param id - Уникальный идентификатор услуги (number)
 * @returns {Promise<Service>} Полная услуга с описанием
 */
export const fetchServiceDetails = async (id: number): Promise<Service> => {
  const response = await api.get(`/api/services/${id}`); // GET-запрос к деталям
  return response.data; // Возврат данных (объект услуги)
};

/**
 * Экспорт инстанса API по умолчанию (для расширения, если нужно)
 */
export default api;
