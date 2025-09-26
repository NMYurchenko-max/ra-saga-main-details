/**
 * Модуль конфигурации Redux Store для приложения "Список и детали"
 * Настраивает store с использованием Redux Toolkit (configureStore),
 * интегрирует Saga middleware для асинхронных операций (API-запросы),
 * подключает reducer для услуг (servicesSlice) и запускает саги.
 * Включает Redux DevTools для отладки в браузере.
 * Store предоставляет глобальное состояние (RootState) и dispatch (AppDispatch)
 * для использования в компонентах через useSelector/useDispatch.
 */
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import servicesReducer from '@/redux/slices/servicesSlice';
import servicesSaga from '@/redux/sagas/servicesSaga';

/**
 * Создание middleware для Redux Saga
 * Saga middleware перехватывает actions (e.g., fetchServicesRequest) и выполняет side-effects (API calls)
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Конфигурация основного Redux Store
 * @property reducer - Объект редьюсеров (только services для этого приложения)
 * @property middleware - Стандартные middleware + Saga (для async logic)
 * @property devTools - Включение Redux DevTools extension (если доступно в браузере)
 */
const store = configureStore({
  reducer: {
    services: servicesReducer, // Редьюсер для состояния услуг (loading, error, services, currentService)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Отключаем thunk middleware, так как используем saga
    }).concat(sagaMiddleware), // Добавление Saga middleware
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // DevTools для инспекции state/actions
});

/**
 * Запуск корневой саги (активирует слушатели takeEvery для fetch actions)
 * Саги будут обрабатывать async thunks и обновлять state через put
 */
sagaMiddleware.run(servicesSaga);

/**
 * Тип корневого состояния Store (для типизации useSelector)
 * Позволяет IDE автодополнять state.services.loading и т.д.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип функции dispatch (для типизации useDispatch)
 * Поддерживает typed actions из RTK (createAsyncThunk)
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Экспорт настроенного Store по умолчанию
 * Используется в main.tsx через <Provider store={store}>
 */
export default store;
