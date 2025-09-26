/**
 * Модуль Redux Saga для обработки асинхронных side-effects в приложении "Список и детали"
 * Использует эффекты Saga (call для API, put для dispatch, takeEvery для слушателей actions)
 * Перехватывает request-actions из servicesActions.ts, выполняет API-запросы через api.ts,
 * диспатчит success/failure actions для обновления state в servicesSlice.
 * Разделяет логику: Saga - для IO (API, ошибки), slice - для чистого state.
 * Типизировано с использованием интерфейсов из types.ts.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import type { ServiceListItem, Service } from '@/types';
import { fetchServices, fetchServiceDetails } from '@/api/api';
import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICE_DETAILS_REQUEST,
  FETCH_SERVICE_DETAILS_SUCCESS,
  FETCH_SERVICE_DETAILS_FAILURE,
} from '@/redux/actions/servicesActions';

/**
 * Генератор-сага для загрузки списка услуг
 * Вызывается при диспатче FETCH_SERVICES_REQUEST (takeEvery)
 * Выполняет API-запрос, диспатчит success/failure
 */
function* fetchServicesSaga() {
  try {
    /** Вызов API для получения списка услуг (yield для async) */
    const services: ServiceListItem[] = yield call(fetchServices);
    /** Диспатч success-action с данными для обновления state.services */
    yield put({ type: FETCH_SERVICES_SUCCESS, payload: services });
  } catch (error: unknown) {
    /** Диспатч failure-action с сообщением об ошибке для state.error */
    const message = error instanceof Error ? error.message : 'Failed to fetch services';
    yield put({ type: FETCH_SERVICES_FAILURE, payload: message });
  }
}

/**
 * Генератор-сага для загрузки деталей услуги по ID
 * Вызывается при диспатче FETCH_SERVICE_DETAILS_REQUEST
 * @param action - Action с payload (id услуги)
 */
function* fetchServiceDetailsSaga(action: { type: string; payload: number }) {
  try {
    /** Вызов API для получения деталей услуги (payload.id) */
    const service: Service = yield call(fetchServiceDetails, action.payload);
    /** Диспатч success-action с данными для state.currentService */
    yield put({ type: FETCH_SERVICE_DETAILS_SUCCESS, payload: service });
  } catch (error: unknown) {
    /** Диспатч failure-action с ошибкой для state.error */
    const message = error instanceof Error ? error.message : 'Failed to fetch service details';
    yield put({ type: FETCH_SERVICE_DETAILS_FAILURE, payload: message });
  }
}

/**
 * Корневая сага (rootSaga), экспортируется в store.ts
 * Настраивает слушатели (takeEvery) для request-actions
 * Запускается sagaMiddleware.run(rootSaga) в store
 */
export default function* servicesSaga() {
  /** Слушатель: при FETCH_SERVICES_REQUEST вызвать fetchServicesSaga */
  yield takeEvery(FETCH_SERVICES_REQUEST, fetchServicesSaga);
  /** Слушатель: при FETCH_SERVICE_DETAILS_REQUEST вызвать fetchServiceDetailsSaga */
  yield takeEvery(FETCH_SERVICE_DETAILS_REQUEST, fetchServiceDetailsSaga);
}
