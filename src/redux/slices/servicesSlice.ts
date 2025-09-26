/**
 * Модуль Redux slice (редьюсер) для управления состоянием услуг в приложении "Список и детали"
 * Использует чистую функцию reducer для обновления state на основе actions из servicesActions.ts
 * Управляет: списком услуг, текущей услугой, флагами loading/error
 * Типизировано с использованием ServicesState из types.ts
 * Иммутабельные обновления через spread-оператор (...state)
 */
import type { ServicesState, ServiceListItem, Service } from '@/types';
import type { UnknownAction } from '@reduxjs/toolkit';
import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICE_DETAILS_REQUEST,
  FETCH_SERVICE_DETAILS_SUCCESS,
  FETCH_SERVICE_DETAILS_FAILURE,
  CLEAR_ERROR,
  CLEAR_CURRENT_SERVICE,
} from '@/redux/actions/servicesActions';



/**
 * Начальное состояние slice (initialState)
 * Определяет дефолтные значения для всех полей ServicesState
 */
const initialState: ServicesState = {
  services: [], // Пустой массив услуг
  currentService: null, // Нет выбранной услуги
  loading: false, // Не загружается
  error: null, // Нет ошибки
};

/**
 * Редьюсер для slice services
 * Чистая функция, принимает state и action, возвращает новый state
 * Обрабатывает все actions из servicesActions.ts для обновления состояния
 * @param state - Текущее состояние (ServicesState), по умолчанию initialState
 * @param action - Action с type и payload
 * @returns Новый state (ServicesState)
 */
export default function servicesReducer(state = initialState, action: UnknownAction): ServicesState {
  switch (action.type) {
    /** Обработка FETCH_SERVICES_REQUEST: начало загрузки списка */
    case FETCH_SERVICES_REQUEST:
      return {
        ...state, // Иммутабельное копирование
        loading: true, // Включить loading
        error: null, // Очистить предыдущую ошибку
      };
    /** Обработка FETCH_SERVICES_SUCCESS: успешная загрузка списка */
    case FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false, // Выключить loading
        services: action.payload as ServiceListItem[], // Установить массив услуг
      };
    /** Обработка FETCH_SERVICES_FAILURE: ошибка загрузки списка */
    case FETCH_SERVICES_FAILURE:
      return {
        ...state,
        loading: false, // Выключить loading
        error: action.payload as string, // Установить сообщение об ошибке
      };
    /** Обработка FETCH_SERVICE_DETAILS_REQUEST: начало загрузки деталей */
    case FETCH_SERVICE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true, // Включить loading
        error: null, // Очистить ошибку
      };
    /** Обработка FETCH_SERVICE_DETAILS_SUCCESS: успешная загрузка деталей */
    case FETCH_SERVICE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false, // Выключить loading
        currentService: action.payload as Service, // Установить текущую услугу
      };
    /** Обработка FETCH_SERVICE_DETAILS_FAILURE: ошибка загрузки деталей */
    case FETCH_SERVICE_DETAILS_FAILURE:
      return {
        ...state,
        loading: false, // Выключить loading
        error: action.payload as string, // Установить ошибку
      };
    /** Обработка CLEAR_ERROR: очистка ошибки (для retry) */
    case CLEAR_ERROR:
      return {
        ...state,
        error: null, // Сброс error в null
      };
    /** Обработка CLEAR_CURRENT_SERVICE: очистка текущей услуги */
    case CLEAR_CURRENT_SERVICE:
      return {
        ...state,
        currentService: null, // Сброс currentService в null
      };
    /** Default: вернуть state без изменений для неизвестных actions */
    default:
      return state;
  }
}
