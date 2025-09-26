/**
 * Интерфейс для полной услуги (используется на странице деталей)
 * @property id - Уникальный идентификатор услуги (number, соответствует API)
 * @property name - Название услуги
 * @property price - Цена услуги в рублях
 * @property content - Подробное описание услуги
 */
export interface Service {
    id: number;
    name: string;
    price: number;
    content: string;
}

/**
 * Интерфейс для элемента списка услуг (используется в списке, без описания)
 * @property id - Уникальный идентификатор услуги
 * @property name - Название услуги
 * @property price - Цена услуги в рублях
 */
export interface ServiceListItem {
    id: number;
    name: string;
    price: number;
}

/**
 * Интерфейс состояния Redux-слой для модуля услуг (services slice)
 * Управляет списком услуг, текущей услугой, состоянием загрузки и ошибками
 * @property services - Массив элементов списка услуг (получен из API /api/services)
 * @property currentService - Текущая выбранная услуга для деталей (null если не загружена)
 * @property loading - Флаг активной загрузки данных (true во время API-запроса)
 * @property error - Строка с сообщением об ошибке (null если успешно)
 */
export interface ServicesState {
    services: ServiceListItem[];
    currentService: Service | null;
    loading: boolean;
    error: string | null;
}
