/**
 * Компонент ServiceDetails: отображает детали услуги по ID
 * Использует React Router (useParams для id), Redux для state (currentService, loading, error)
 * Показывает индикатор загрузки (spinner), ошибку с кнопкой retry
 * Загружает данные при монтировании через dispatch fetchServiceDetailsRequest(id)
 * Фон приложения: #121121, spinner из src/img/progress-dark.gif
 */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store/store';
import { fetchServiceDetailsRequest, clearError, clearCurrentService } from '@/redux/actions/servicesActions';
import spinnerGif from '@/img/progress-dark.gif'; // Импорт spinner для Vite
import './ServiceDetails.css'; // Стили для компонента

/**
 * Компонент деталей услуги
 * @returns JSX.Element - Детали услуги или индикатор/ошибка
 */
const ServiceDetails: React.FC = () => {
  /** Получение ID из URL params */
  const { id } = useParams<{ id: string }>();
  const serviceId = id ? parseInt(id, 10) : 0;

  /** Получение состояния из Redux store */
  const { currentService, loading, error } = useSelector((state: RootState) => state.services);
  const dispatch = useDispatch<AppDispatch>();

  /** Загрузка деталей услуги при монтировании компонента */
  useEffect(() => {
    if (serviceId) {
      dispatch(fetchServiceDetailsRequest(serviceId)); // Диспатч request-action для Saga
    }
  }, [dispatch, serviceId]);

  /** Очистка currentService при размонтировании (опционально) */
  useEffect(() => {
    return () => {
      dispatch(clearCurrentService()); // Сброс при уходе с страницы
    };
  }, [dispatch]);

  /** Обработчик повторного запроса при ошибке */
  const handleRetry = () => {
    dispatch(clearError()); // Очистка ошибки
    if (serviceId) {
      dispatch(fetchServiceDetailsRequest(serviceId)); // Повторный запрос
    }
  };

  /** Отображение индикатора загрузки */
  if (loading) {
    return (
      <div className="details-container">
        <img src={spinnerGif} alt="Loading..." className="spinner" />
      </div>
    );
  }

  /** Отображение ошибки с кнопкой retry */
  if (error) {
    return (
      <div className="details-container">
        <p className="error-message">Ошибка: {error}</p>
        <button onClick={handleRetry} className="retry-button">Повторить запрос</button>
      </div>
    );
  }

  /** Отображение деталей услуги, если данные загружены */
  if (!currentService) {
    return (
      <div className="details-container">
        <p>Услуга не найдена</p>
      </div>
    );
  }

  /** Отображение деталей услуги */
  return (
    <div className="details-container">
      <h1>{currentService.name}</h1>
      <p className="price">Цена: {currentService.price} руб.</p>
      <p className="content">{currentService.content}</p>
      <button onClick={() => window.history.back()} className="back-button">Назад</button>
    </div>
  );
};

export default ServiceDetails;
