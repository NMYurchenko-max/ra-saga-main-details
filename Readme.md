# React Services List & Details with Redux Saga

![CI](https://github.com/NMYurchenko-max/ra-saga-main-details/actions/workflows/web.yml/badge.svg)

[🚀 deployment application](https://nmyurchenko-max.github.io/ra-saga-main-details/)

[локально:](http://localhost:5173/ra-saga-main-details/)


Тема задачи: React Redux-saga. Main details

## 📋 Описание

React-приложение для просмотра списка услуг и их деталей с использованием:
- Redux Toolkit для управления состоянием (slices, configureStore),
- Redux Saga для асинхронных операций, разделяет логику: Saga - для IO (API, ошибки), slice - для чистого state 
- React Router для навигации. 
- Данные загружаются с внешнего API. Приложение обрабатывает состояния загрузки, ошибок с возможностью повторного запроса. Фон приложения — тёмный (#121121), индикатор загрузки — анимированный GIF.

Это переработанная версия Task Manager под задачу "Список и детали" (тема: Redux Saga), применительнок к поставленной:
[Netologe.Task](https://github.com/netology-code/ra16-homeworks/blob/ra-51/saga/main-details/README.md)

## ✨ Функциональность

### Основные возможности:
- **Список услуг** — на главной странице (/): отображается список услуг (название, цена) с ссылками на детали. 
Загрузка GET /api/services.
- **Детали услуги** — по ссылке (/:id/details): отображается полная информация (название, цена, описание). 
Загрузка GET /api/services/:id.
- **Индикатор загрузки** — spinner.gif на тёмном фоне во время запросов (список и детали).
- **Обработка ошибок** — сообщение об ошибке (500/404) с кнопкой "Повторить запрос" (очищает ошибку, показывает loading, повторяет запрос).
- **Навигация** — React Router с basename для деплоя.

## 🛠 Технологии

- **React 19** — UI-библиотека.
- **TypeScript** — Типизация.
- **Redux Toolkit** — Управление состоянием (slices, configureStore).
- **Redux Saga** — Middleware для асинхронных side-effects (sagas для API, как указано в теме "Redux -saga").
- **React Router DOM 6** — Навигация (BrowserRouter, Routes, Link, useParams).
- **Axios** — HTTP-запросы.
- **Vite** — Сборка и dev-сервер.
- **CSS** — Кастомные стили (App.css, index.css).

## Установка и запуск

### Предварительные требования:
- Node.js (v16+)
- Yarn (или npm)

### Шаги установки:

1. **Клонирование репозитория:**
   ```bash
   git clone https://github.com/NMYurchenko-max/ra-saga-main-details.git
   cd ra-saga-main-details
   ```

2. **Установка зависимостей:**
   ```bash
   yarn install
   # или
   npm install
   ```

3. **Настройка API (опционально):**
  -  Для локального сервера настроена конфигурация vite.config.ts
  ```ts
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7070',
        changeOrigin: true,
      },
    },
  },
  ```
   - Для Render: .env с `VITE_API_URL=https://ra-saga-main-details-backend.onrender.com`.

4. **Запуск в режиме разработки:**
   ```bash
   yarn dev
   # или
   npm run dev
   ```
   Приложение доступно: http://localhost:5173/ra-saga-main-details/

5. **Сборка для продакшена:**
   ```bash
   yarn build
   # или
   npm run build
   ```

6. **Предпросмотр сборки:**
   ```bash
   yarn preview
   # или
   npm run preview
   ```

## 📁 Структура проекта

```
src/
├── components/           # React-компоненты
│   ├── ServicesList.tsx # Список услуг (loading, error, links)
│   └── ServiceDetails.tsx # Детали услуги (loading, error, back link)
├── redux/               # Redux логика
│   ├── actions/         # Action types/creators
│   │   └── servicesActions.ts
│   ├── sagas/           # Redux Saga
│   │   └── servicesSaga.ts
│   ├── slices/          # RTK Slices
│   │   └── servicesSlice.ts
│   └── store/           # Store конфигурация
│       └── store.ts
├── api/                 # API-клиент
│   └── api.ts
├── App.tsx              # Роутинг и основной layout
├── main.tsx             # Entry point (Provider, Router)
├── types.ts             # TypeScript interfaces
├── App.css              # Кастомные стили (loading, error, retry)
└── index.css            # Глобальные стили (тёмная тема)
```

## 🔌 API

- **Бэкенд:** Render (https://ra-saga-main-details-backend.onrender.com) или локальный (http://localhost:7070).
- **Эндпоинты:**
  - GET `/api/services` — список услуг (id, name, price). Задержка 3с, ~30% шанс 500 (для теста retry).
  - GET `/api/services/:id` — детали услуги (id, name, price, content). 404 если id не найден.
- **Сервер:** Express.js с CORS, JSON. Данные: 4 услуги (замена стекла/дисплея/аккумулятора/микрофона).

## 🧪 Тестирование

- **UI:** Загрузка списка/деталей, переходы, spinner (3с), ошибка (500/404) с retry 
(белый текст на синем фоне, hover lift).
- **Redux DevTools:** Отслеживание actions/sagas/state.
- **Build:** `yarn build` — без ошибок TS/Lint.
- **Edge-кейсы:** Invalid id (404), сетевые ошибки (retry).

Тестирование API (curl):
```bash
curl https://ra-saga-main-details-backend.onrender.com/api/services
[{"id":1,"name":"Замена стекла","price":21000},{"id":2,"name":"Замена дисплея","price":25000},{"id":3,"name":"Замена аккумулятора","price":4000},{"id":4,"name":"Замена микрофона","price":2500}]
curl https://ra-saga-main-details-backend.onrender.com/api/services/1
{"id":1,"name":"Замена стекла","price":21000,"content":"Стекло оригинал от Apple"}
```

## 📚 Дополнительная информация

- **Задача:** Netology RA-51 Redux Saga — "Список и детали".
- [Документация React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Saga](https://redux-saga.js.org/)
- [React Router](https://reactrouter.com/)

## Author

© 2025 N.Yurchenko  
[GitHub](https://github.com/NMYurchenko-max)  
[ISC License](LICENSE)
