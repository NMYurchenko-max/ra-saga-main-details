/**
 * Компонент ServicesList: отображает список услуг с ссылками на детали
 * Использует React Router для навигации, Redux для state (services, loading, error)
 * Показывает индикатор загрузки (spinner), ошибку с кнопкой retry
 * Загружает данные при монтировании через dispatch fetchServicesRequest
 * Фон приложения: #121121, spinner из src/img/progress-dark.gif
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState, AppDispatch } from '@/redux/store/store';
import { fetchServicesRequest, clearError } from '@/redux/actions/servicesActions';
import spinnerGif from '@/img/progress-dark.gif'; // Импорт spinner для Vite
import './ServicesList.css'; // Стили для компонента

/**
 * Компонент списка услуг
 * @returns JSX.Element - Список услуг или индикатор/ошибка
 */
const ServicesList: React.FC = () => {
  /** Получение состояния из Redux store */
  const { services, loading, error } = useSelector((state: RootState) => state.services);
  const dispatch = useDispatch<AppDispatch>();

  /** Загрузка списка услуг при монтировании компонента */
  useEffect(() => {
    dispatch(fetchServicesRequest()); // Диспатч request-action для Saga
  }, [dispatch]);

  /** Обработчик повторного запроса при ошибке */
  const handleRetry = () => {
    dispatch(clearError()); // Очистка ошибки
    dispatch(fetchServicesRequest()); // Повторный запрос
  };

  /** Отображение индикатора загрузки */
  if (loading) {
    return (
      <div className="services-container">
        <img src={spinnerGif} alt="Loading..." className="spinner" />
      </div>
    );
  }

  /** Отображение ошибки с кнопкой retry */
  if (error) {
    return (
      <div className="services-container">
        <p className="error-message">Ошибка: {error}</p>
        <button onClick={handleRetry} className="retry-button">Повторить запрос</button>
      </div>
    );
  }

  /** Отображение списка услуг */
  return (
    <div className="services-container">
      <h1>Список услуг</h1>
      <ul className="services-list">
        {services.map((service) => (
          <li key={service.id} className="service-item">
            <Link to={`/${service.id}/details`} className="service-link">
              {service.name} - {service.price} руб.
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;
