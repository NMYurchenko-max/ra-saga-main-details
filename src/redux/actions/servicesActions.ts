/**
 * Модуль actions для Redux в приложении "Список и детали"
 * Определяет константы типов actions и creator-функции для операций с услугами:
 * - Загрузка списка услуг (request/success/failure)
 * - Загрузка деталей услуги по ID (request/success/failure)
 * - Очистка ошибки и текущей услуги
 * Actions используются в Saga для side-effects (API) и в slice для обновления state.
 * Типизировано с использованием интерфейсов из types.ts.
 */
import type { ServiceListItem, Service } from '@/types';

/**
 * Константы типов actions для загрузки списка услуг
 * @constant FETCH_SERVICES_REQUEST - Начало запроса списка
 * @constant FETCH_SERVICES_SUCCESS - Успешное получение списка
 * @constant FETCH_SERVICES_FAILURE - Ошибка при загрузке списка
 */
export const FETCH_SERVICES_REQUEST = 'services/fetchServicesRequest';
export const FETCH_SERVICES_SUCCESS = 'services/fetchServicesSuccess';
export const FETCH_SERVICES_FAILURE = 'services/fetchServicesFailure';

/**
 * Константы типов actions для загрузки деталей услуги
 * @constant FETCH_SERVICE_DETAILS_REQUEST - Начало запроса деталей
 * @constant FETCH_SERVICE_DETAILS_SUCCESS - Успешное получение деталей
 * @constant FETCH_SERVICE_DETAILS_FAILURE - Ошибка при загрузке деталей
 */
export const FETCH_SERVICE_DETAILS_REQUEST = 'services/fetchServiceDetailsRequest';
export const FETCH_SERVICE_DETAILS_SUCCESS = 'services/fetchServiceDetailsSuccess';
export const FETCH_SERVICE_DETAILS_FAILURE = 'services/fetchServiceDetailsFailure';

/**
 * Константы типов actions для очистки состояния
 * @constant CLEAR_ERROR - Очистка сообщения об ошибке
 * @constant CLEAR_CURRENT_SERVICE - Очистка текущей услуги
 */
export const CLEAR_ERROR = 'services/clearError';
export const CLEAR_CURRENT_SERVICE = 'services/clearCurrentService';

/**
 * Creator action для начала загрузки списка услуг
 * Диспатчится в useEffect компонента ServicesList
 * @returns {Object} Action с типом FETCH_SERVICES_REQUEST
 */
export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

/**
 * Creator action для успешной загрузки списка услуг
 * Диспатчится в Saga после успешного API-вызова
 * @param services - Массив элементов списка услуг (ServiceListItem[])
 * @returns {Object} Action с типом FETCH_SERVICES_SUCCESS и payload
 */
export const fetchServicesSuccess = (services: ServiceListItem[]) => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: services,
});

/**
 * Creator action для ошибки загрузки списка услуг
 * Диспатчится в Saga при ошибке API (e.g., 500)
 * @param error - Строка с сообщением об ошибке
 * @returns {Object} Action с типом FETCH_SERVICES_FAILURE и payload
 */
export const fetchServicesFailure = (error: string) => ({
  type: FETCH_SERVICES_FAILURE,
  payload: error,
});

/**
 * Creator action для начала загрузки деталей услуги
 * Диспатчится в useEffect компонента ServiceDetails
 * @param id - ID услуги (number)
 * @returns {Object} Action с типом FETCH_SERVICE_DETAILS_REQUEST и payload (id)
 */
export const fetchServiceDetailsRequest = (id: number) => ({
  type: FETCH_SERVICE_DETAILS_REQUEST,
  payload: id,
});

/**
 * Creator action для успешной загрузки деталей услуги
 * Диспатчится в Saga после успешного API-вызова
 * @param service - Полная услуга (Service)
 * @returns {Object} Action с типом FETCH_SERVICE_DETAILS_SUCCESS и payload
 */
export const fetchServiceDetailsSuccess = (service: Service) => ({
  type: FETCH_SERVICE_DETAILS_SUCCESS,
  payload: service,
});

/**
 * Creator action для ошибки загрузки деталей услуги
 * Диспатчится в Saga при ошибке API (e.g., 404/500)
 * @param error - Строка с сообщением об ошибке
 * @returns {Object} Action с типом FETCH_SERVICE_DETAILS_FAILURE и payload
 */
export const fetchServiceDetailsFailure = (error: string) => ({
  type: FETCH_SERVICE_DETAILS_FAILURE,
  payload: error,
});

/**
 * Creator action для очистки ошибки
 * Диспатчится в handleRetry компонентов перед повторным запросом
 * @returns {Object} Action с типом CLEAR_ERROR
 */
export const clearError = () => ({
  type: CLEAR_ERROR,
});

/**
 * Creator action для очистки текущей услуги
 * Диспатчится при необходимости сброса деталей (e.g., переход назад)
 * @returns {Object} Action с типом CLEAR_CURRENT_SERVICE
 */
export const clearCurrentService = () => ({
  type: CLEAR_CURRENT_SERVICE,
});
